defmodule JeopardyWeb.GameController do
  use JeopardyWeb, :controller

  alias Jeopardy.Games
  alias Jeopardy.Games.Game
  alias Jeopardy.Games.Category
  alias Jeopary.Games.Clue

  action_fallback JeopardyWeb.FallbackController

  def index(conn, _params) do
    games = Games.list_games()
    render(conn, "index.json", games: games)
  end

  def alexa(conn, data) do
    answer = Poison.decode!(data)
    session = answer["session"]
    userId = session["user"]["userId"]
    accessToken = session["user"]["accessToken"]
    attributes = session["attributes"]
    answered_clues = attributes["clues"]
    game_id = attributes["game_id"]
    clue_list = attributes["questions"]
    user_input = answer["context"]
    #if new session, get user and new game
    if (session["new"] == true) do
      user = Users.get_or_create_userId(userId)
      
        
    else
      answer
    end
  end

  def create(conn, data) do
    
    IO.puts("AYO YO #{Kernel.inspect(data)}")
    game_params = %{name: "random"}
    with {:ok, %Game{} = game} <- Games.create_game(game_params) do
      categories = create_categories_from_api(game)
      IO.puts("HEY YO #{Kernel.inspect(categories)}")
      #new_game = Game.update_game(game, %{categories: categories})
      categories_list = Enum.map(categories, fn cat -> cat.title end)
      numbered_categories_list = Enum.join(Enum.map([1,2,3,4,5], fn n -> Kernel.inspect(n) <> " " <> Enum.at(categories_list, n - 1) end), ", ")
      conn
      |> put_status(:ok)
      |> json(%{
  version: "1.0",
  sessionAttributes: %{
    clues: []
  },
  response: %{
    outputSpeech: %{
      type: "PlainText",
      text: "Tri here's, new response. New game with following categories " <> numbered_categories_list <> ". Can I help you with anything else?"
    },
    card: %{
      type: "Simple",
      title: "Horoscope",
      content: "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless."
    },
    reprompt: %{
      outputSpeech: %{
        type: "PlainText",
        text: "Can I help you with anything else?"
      }
    },
    shouldEndSession: false
  }
}
)
      #|> put_resp_header("location", game_path(conn, :show, game))
      #|> render("show.json", game: game)
    end
  end

  def create_categories_from_api(game) do
    offset = Kernel.inspect(:rand.uniform(100))
    url = "http://jservice.io/api/categories?count=10&offset=" <> offset
    req = Poison.decode!(HTTPoison.get!(url).body)
    IO.puts("RESULT EY #{Kernel.inspect(req)}")
    valid_categories = Enum.filter(Enum.map(req, fn cat_req -> transform_category(cat_req, game) end), fn c -> c != nil end)
    #valid_categories |> Enum.with_index(1) |>Enum.map(fn {k,v}->{v,k} end) |> Map.new
    valid_categories
  end

  def transform_category(cat_req, game) do
    cat_params = %{"title": cat_req["title"]}
    cat_url = "http://jservice.io/api/category?id=" <> Kernel.inspect(cat_req["id"])
    cat = Poison.decode!(HTTPoison.get!(cat_url).body)
    if (is_valid_category(cat)) do
      with {:ok, %Category{} = category} <- Games.create_category(cat_params) do
#        IO.puts("CAT #{Kernel.inspect(category)}")
        val = 200
        Games.create_category_item(%{game_id: game.id, category_id: category.id})
        for n <- [0,1,2,3,4] do
          [ clue_req | tail ] = Enum.filter(cat["clues"], fn clue -> clue["value"] == val*(n+1) end)
#          IO.puts("CLUE REQ #{Kernel.inspect(clue_req)}")
          clue_params = %{"answer": clue_req["answer"], "question": clue_req["question"], "value": clue_req["value"], "category_id": category.id}
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
    clue_list = [0,1,2,3,4]
    valid_clues = Enum.filter(Enum.map(clue_list, fn n -> extract_clue(n, category) end), fn c -> c != nil end)
    Kernel.length(valid_clues) == 5
  end
    
  def extract_clue(n, category) do
    val = 200
    filtered = Enum.filter(category["clues"], fn cl -> cl["value"] == val*(n+1) end)
    if (filtered !== []) do
      [ clue | tail ] = filtered
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

  def parse_answer(conn, %{data: data}) do
    answer = Poison.decode!(data)
    session = answer["session"]
    user = session["user"]
    attributes = session["attributes"]
    answered_clues = attributes["clues"]
    game_id = attributes["game_id"]
    clue_list = attributes["questions"]
    user_input = answer["context"]
        
  end

  def is_my_application(app_id) do
    app_id == "abcdef"
  end

@doc """
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
