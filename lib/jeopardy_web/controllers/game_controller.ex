defmodule JeopardyWeb.GameController do
  use JeopardyWeb, :controller

  alias Jeopardy.Games
  alias Jeopardy.Games.Game
  alias Jeopardy.Games.Category
  alias Jeopary.Games.Clue

  action_fallback(JeopardyWeb.FallbackController)

  def index(conn, _params) do
    games = Games.list_games()
    render(conn, "index.json", games: games)
  end

  def alexa(conn, request) do
#    [a | _] = Map.keys(request)
    
#    { status, data} = JSON.decode(a) #request
    data = request
    IO.puts("#{Kernel.inspect(data)}")
    answer = data
    session = answer["session"]
    context = answer["context"]
    request = answer["request"]
    type = request["type"]
    intent = request["intent"]
    IO.puts("#{Kernel.inspect(intent)}")
    #    userId = session["user"]["userId"]
    #    accessToken = session["user"]["accessToken"]
    #    attributes = session["attributes"]
    #    answered_clues = attributes["clues"]
    #    game_id = attributes["game_id"]
    #    clue_list = attributes["questions"]
    #    user_input = answer["context"]
    # if new session, get user and new game
    if (type == "LaunchRequest" || (type == "IntentRequest" && request["intent"]["name"] == "newGame")) do
      create(conn, data)
    else
      parse_answer(conn, data)
    end
  end

  def create(conn, data) do
    IO.puts("AYO YO #{Kernel.inspect(data)}")
    game_params = %{name: "random"}

    with {:ok, %Game{} = game} <- Games.create_game(game_params) do
      categories = create_categories_from_api(game)
      categories_id = Enum.map(categories, fn cat -> cat.id end)
      IO.puts("HEY YO #{Kernel.inspect(categories)}")
      # new_game = Game.update_game(game, %{categories: categories})
      categories_list = Enum.map(categories, fn cat -> cat.title end)

      numbered_categories_list =
        Enum.join(
          Enum.map([1, 2, 3, 4, 5], fn n ->
            Kernel.inspect(n) <> ". " <> Enum.at(categories_list, n - 1)
          end),
          ", "
        )

      conn
      |> put_status(:ok)
      |> json(%{
        version: "1.0",
        sessionAttributes: %{
          clues: [],
          categories: categories_id,
          answer: "",
          score: 0,
          numbered: numbered_categories_list
        },
        response: %{
          outputSpeech: %{
            type: "PlainText",
            text:
              "New game with following categories " <>
                numbered_categories_list <> ". Please pick a number?"
          },
          card: %{
            type: "Simple",
            title: "Jeopary",
            content:
              "New game created with following categories " <>
                numbered_categories_list <> ". Please pick one number!"
          },
          reprompt: %{
            outputSpeech: %{
              type: "PlainText",
              text: "Can I help you with anything else?"
            }
          },
          shouldEndSession: false
        }
      })
    end
  end

  def create_categories_from_api(game) do
    offset = Kernel.inspect(:rand.uniform(100))
    url = "http://jservice.io/api/categories?count=10&offset=" <> offset
    req = Poison.decode!(HTTPoison.get!(url).body)
    IO.puts("RESULT EY #{Kernel.inspect(req)}")

    valid_categories =
      Enum.filter(Enum.map(req, fn cat_req -> transform_category(cat_req, game) end), fn c ->
        c != nil
      end)

    # valid_categories |> Enum.with_index(1) |>Enum.map(fn {k,v}->{v,k} end) |> Map.new
    valid_categories
  end

  def transform_category(cat_req, game) do
    cat_params = %{title: cat_req["title"]}
    cat_url = "http://jservice.io/api/category?id=" <> Kernel.inspect(cat_req["id"])
    cat = Poison.decode!(HTTPoison.get!(cat_url).body)

    if is_valid_category(cat) do
      with {:ok, %Category{} = category} <- Games.create_category(cat_params) do
        #        IO.puts("CAT #{Kernel.inspect(category)}")
        val = 200
        Games.create_category_item(%{game_id: game.id, category_id: category.id})

        for n <- [0, 1, 2, 3, 4] do
          [clue_req | tail] =
            Enum.filter(cat["clues"], fn clue -> clue["value"] == val * (n + 1) end)

          #          IO.puts("CLUE REQ #{Kernel.inspect(clue_req)}")
          clue_params = %{
            answer: clue_req["answer"],
            question: clue_req["question"],
            value: clue_req["value"],
            category_id: category.id
          }

          #          IO.puts("CLUE PARAMS #{Kernel.inspect(clue_params)}")
          Games.create_clue(clue_params)
        end

        category
      end
    else
      nil
    end
  end

  def is_valid_category(category) do
    clue_list = [0, 1, 2, 3, 4]

    valid_clues =
      Enum.filter(Enum.map(clue_list, fn n -> extract_clue(n, category) end), fn c -> c != nil end)

    Kernel.length(valid_clues) == 5
  end

  def extract_clue(n, category) do
    val = 200
    filtered = Enum.filter(category["clues"], fn cl -> cl["value"] == val * (n + 1) end)

    if filtered !== [] do
      [clue | tail] = filtered
      clue
    else
      nil
    end
  end

  def show(conn, %{"id" => id}) do
    game = Games.get_game!(id)
    render(conn, "show.json", game: game)
  end

  def update(conn, %{"id" => id, "game" => game_params}) do
    game = Games.get_game!(id)

    with {:ok, %Game{} = game} <- Games.update_game(game, game_params) do
      render(conn, "show.json", game: game)
    end
  end

  def delete(conn, %{"id" => id}) do
    game = Games.get_game!(id)

    with {:ok, %Game{}} <- Games.delete_game(game) do
      send_resp(conn, :no_content, "")
    end
  end

  def parse_answer(conn, data) do
    IO.puts("Parsing answer #{Kernel.inspect(data)}")
    answer = data
    session = answer["session"]
    user = session["user"]
    attributes = session["attributes"]
    categories = attributes["categories"]
    numbered_categories = attributes["numbered"]
    IO.puts("CATEGORIES #{Kernel.inspect(categories)}")
    answered_clues = attributes["clues"]
    game_id = attributes["game_id"]
    clue_list = attributes["clues"]
    context = answer["context"]
    request = answer["request"]
    intent = request["intent"]
    name = intent["name"]

    case name do
      "chooseCategory" ->
        value = String.to_integer(intent["slots"]["category_no"]["value"])
        category_id = Enum.at(categories, value - 1)
        questions = Games.get_clue_by_category_id(category_id)

        value_questions = Enum.join(
          Enum.map(Enum.filter(questions, fn k -> !Enum.member?(answered_clues, k.id) end), fn q -> Kernel.inspect(q.value) end), ", ")

        conn
        |> put_status(:ok)
        |> json(%{
          version: "1.0",
          sessionAttributes: %{
            clues: clue_list,
            categories: categories,
            category_id: category_id,
            score: attributes["score"],
            answer: "",
            numbered: numbered_categories
          },
          response: %{
            outputSpeech: %{
              type: "PlainText",
              text:
                "Current category has questions with following values " <>
                  value_questions <> ". Please choose a question by its value"
            },
            card: %{
              type: "Simple",
              title: "Jeopary",
              content:
                "Current category has questions with following valules " <>
                  value_questions <> " Please choose a question by its value"
            },
            reprompt: %{
              outputSpeech: %{
                type: "PlainText",
                text: "Can I help you with anything else?"
              }
            },
            shouldEndSession: false
          }
        })

      "chooseValue" ->
        value = String.to_integer(intent["slots"]["value"]["value"])
        category_id = attributes["category_id"]
        questions = Games.get_clue_by_category_id(category_id)
        score = attributes["score"]
        [question | _] = Enum.filter(questions, fn q -> q.value == value end)
        # TODO, make sur equestion is not asked before      
        conn
        |> put_status(:ok)
        |> json(%{
          version: "1.0",
          sessionAttributes: %{
            clues: [question.id] ++ clue_list,
            categories: categories,
            answer: question.answer,
            qValue: value,
            score: score,
            numbered: numbered_categories
          },
          response: %{
            outputSpeech: %{
              type: "PlainText",
              text:
                "The question you chose with value " <> Kernel.inspect(value) <> " is " <> question.question <> ". Please provide an answer"
            },
            card: %{
              type: "Simple",
              title: "Jeopary",
              content:
                "The question you chose is " <> question.question <> " Please provide an answer"
            },
            reprompt: %{
              outputSpeech: %{
                type: "PlainText",
                text: "Can I help you with anything else?"
              }
            },
            shouldEndSession: false
          }
        })

      "answerResponse" ->
        value = intent["slots"]["answer"]["value"]
        score = attributes["score"]
        qValue = attributes["qValue"]
        len = Kernel.length(answered_clues)

        IO.puts("categories #{Kernel.inspect(value)}")        
        if (value == attributes["answer"] || "The " <> value == attributes["answer"] || "the " <> value == attributes["answer"]) do
          new_score = Kernel.inspect(score + qValue)
          if (len == 5) do
            response_for_answer(conn, new_score, clue_list, categories, numbered_categories, 1, ". The game has ended. Your final score is " <> new_score <> ". Would you like to play another game?")
          else
            response_for_answer(conn, new_score, clue_list, categories, numbered_categories, 1, ". Your current score is " <> new_score <> " You have " <> Kernel.inspect(10 - len) <> " questions left. Category list " <> numbered_categories <> ". Please choose a category")
          end
        else
          if (len == 5) do
            response_for_answer(conn, Kernel.inspect(score), clue_list, categories, numbered_categories, 0, ". The game has ended. Your final score is " <> Kernel.inspect(score) <> ". Would you like to play another game?")
          else
            response_for_answer(
            conn,
            Kernel.inspect(score),
            clue_list,
            categories,
            numbered_categories,
            0,
            ". Your current score is " <> Kernel.inspect(score) <> " You have " <> Kernel.inspect(10 - len)  <> " questions left. Category list " <> numbered_categories <> ". Please choose a category"
          )
          end
        end

      _ ->
        conn
        |> put_status(:error)
    end
  end

  def is_my_application(app_id) do
    app_id == "abcdef"
  end

  def response_for_answer(conn, new_score, clue_list, categories, categories_list, s, response) do
    result = "correct"
    if s == 0 do
      result = "wrong"
    end
    conn
    |> put_status(:ok)
    |> json(%{
      version: "1.0",
      sessionAttributes: %{
        clues: clue_list,
        categories: categories,
        answer: "",
        qValue: 0,
        score: new_score,
        numbered: categories_list
      },
      response: %{
        outputSpeech: %{
          type: "PlainText",
          text:
            "You are " <> result <> response
        },
        card: %{
          type: "Simple",
          title: "Jeopary",
          content: "You are " <> result <> response
        },
        reprompt: %{
          outputSpeech: %{
            type: "PlainText",
            text: "Can I help you with anything else?"
          }
        },
        shouldEndSession: false
      }
    })
  end

  @doc """
  {
      "version": "1.0",
      "session": {
       "new": false,
       "sessionId": "amzn1.echo-api.session.75ad6a8a-b138-4b53-bf6b-6382cf831c94",
       "application": {
         "applicationId": "amzn1.ask.skill.7c32ae68-f8b4-46f2-9b67-14eb2d2bb9f6"
       },
       "attributes": {
         "clues": []
       },
       "user": {
         "userId": "amzn1.ask.account.AHPBQ6IQ3HL66V3VT5RORXWRB5W4XFHQR2XY2YZS5PLGLD5ARLOJFD2YFQSSGGZXRNAIAAG67LV73CXMSRG3IDLDTJKDIT4DIFPHFXXKSSD7ZWU6247JTUZCDYLPYUYNSDHDMQLPY472DBAFNO5CEWDRDLMRIINJHUD2SRKZNC5BOZSXWEHNVHUZ5VRBXAGYBH7UJIH7LQMZVXA"
       }
      },
      "context": {
       "AudioPlayer": {
         "playerActivity": "IDLE"
       },
       "Display": {
         "token": ""
       },
       "System": {
         "application": {
           "applicationId": "amzn1.ask.skill.7c32ae68-f8b4-46f2-9b67-14eb2d2bb9f6"
         },
         "user": {
           "userId": "amzn1.ask.account.AHPBQ6IQ3HL66V3VT5RORXWRB5W4XFHQR2XY2YZS5PLGLD5ARLOJFD2YFQSSGGZXRNAIAAG67LV73CXMSRG3IDLDTJKDIT4DIFPHFXXKSSD7ZWU6247JTUZCDYLPYUYNSDHDMQLPY472DBAFNO5CEWDRDLMRIINJHUD2SRKZNC5BOZSXWEHNVHUZ5VRBXAGYBH7UJIH7LQMZVXA"
         },
         "device": {
           "deviceId": "amzn1.ask.device.AHKXQYKEMF5PT65UMB32N4RDPXJ4XYZ7GCJ6LXH2YAK7ZJ64Z6SXXOURT3AND4COTPUCLUPZ62NE4ZDAFQI2EH3PZYYZGFZ76NUZWYS4SPRHVV4ZSH3AV4W6K4G3VM6D3KFAF5GVGHHFARPKR4CDNG6TVMFAJCTSWDL5EQ54M34BL6ZZCOCMK",
           "supportedInterfaces": {
             "AudioPlayer": {},
             "Display": {
               "templateVersion": "1.0",
               "markupVersion": "1.0"
             }
           }
         },
         "apiEndpoint": "https://api.amazonalexa.com",
         "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLjdjMzJhZTY4LWY4YjQtNDZmMi05YjY3LTE0ZWIyZDJiYjlmNiIsImV4cCI6MTUyMzc2MTkyMiwiaWF0IjoxNTIzNzU4MzIyLCJuYmYiOjE1MjM3NTgzMjIsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUhLWFFZS0VNRjVQVDY1VU1CMzJONFJEUFhKNFhZWjdHQ0o2TFhIMllBSzdaSjY0WjZTWFhPVVJUM0FORDRDT1RQVUNMVVBaNjJORTRaREFGUUkyRUgzUFpZWVpHRlo3Nk5VWldZUzRTUFJIVlY0WlNIM0FWNFc2SzRHM1ZNNkQzS0ZBRjVHVkdISEZBUlBLUjRDRE5HNlRWTUZBSkNUU1dETDVFUTU0TTM0Qkw2WlpDT0NNSyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFIUEJRNklRM0hMNjZWM1ZUNVJPUlhXUkI1VzRYRkhRUjJYWTJZWlM1UExHTEQ1QVJMT0pGRDJZRlFTU0dHWlhSTkFJQUFHNjdMVjczQ1hNU1JHM0lETERUSktESVQ0RElGUEhGWFhLU1NEN1pXVTYyNDdKVFVaQ0RZTFBZVVlOU0RIRE1RTFBZNDcyREJBRk5PNUNFV0RSRExNUklJTkpIVUQyU1JLWk5DNUJPWlNYV0VITlZIVVo1VlJCWEFHWUJIN1VKSUg3TFFNWlZYQSJ9fQ.EM4MH3Q9JDjyfBgTOefII1oeZar11wn5YVU9AN0KGwi4MXnPY4__SWf-PFiTrA8JV6Ez3t7zai6g2NfXg9GAM3mIF0p5k9QYh6mlXcO5jcsyhTZtmZ5_gkGe7qUgBYPmABTbuVcaXct0vrW1R5aFEfMHG4ApmCdKBBV_e2XEc_TadRfilotetRCqdIXDXQIK9pEn0LS2vQKtVqVGeF2eadQ1z3BaY_ZLZa52nmzUmAptPJPHUIIp8jgfH2DcMfbzB736Jz2-4VK_Gr7vDO8qZccUS6sN59fr1SyBMYdN9v7KspHclSfRoqx_Yad0qt_6vCKZfUr1JXTWn4YPguIcWQ"
       }
      },
      "request": {
       "type": "IntentRequest",
       "requestId": "amzn1.echo-api.request.6e395145-c7f3-4338-9963-192bcea0ad00",
       "timestamp": "2018-04-15T02:12:02Z",
       "locale": "en-US",
       "intent": {
         "name": "chooseCategory",
         "confirmationStatus": "NONE",
         "slots": {
           "category_no": {
             "name": "category_no",
             "value": "1",
             "confirmationStatus": "NONE"
           }
         }
       },
       "dialogState": "STARTED"
      }
  }


  {
    "version": "1.0",
    "session": {
      "new": true,
      "sessionId": "amzn1.echo-api.session.[unique-value-here]",
      "application": {
        "applicationId": "amzn1.ask.skill.[unique-value-here]"
      },
      "attributes": {
        "key": "string value"
      },
      "user": {
        "userId": "amzn1.ask.account.[unique-value-here]",
        "accessToken": "Atza|AAAAAAAA...",
        "permissions": {
          "consentToken": "ZZZZZZZ..."
        }
      }
    },
    "context": {
      "System": {
        "device": {
          "deviceId": "string",
          "supportedInterfaces": {
            "AudioPlayer": {}
          }
        },
        "application": {
          "applicationId": "amzn1.ask.skill.[unique-value-here]"
        },
        "user": {
          "userId": "amzn1.ask.account.[unique-value-here]",
          "accessToken": "Atza|AAAAAAAA...",
          "permissions": {
            "consentToken": "ZZZZZZZ..."
          }
        },
        "apiEndpoint": "https://api.amazonalexa.com",
        "apiAccessToken": "AxThk..."
      },
      "AudioPlayer": {
        "playerActivity": "PLAYING",
        "token": "audioplayer-token",
        "offsetInMilliseconds": 0
      }
    },
    "request": {}
  }
  """
end
