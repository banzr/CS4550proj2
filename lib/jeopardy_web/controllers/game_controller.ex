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

  def create(conn, %{"game" => game_params}) do
    game_params = %{name: "random"}
    with {:ok, %Game{} = game} <- Games.create_game(game_params) do
      categories = create_categories_from_api(game)
      IO.puts("HEY YO #{Kernel.inspect(categories)}")
      conn
      |> put_status(:created)
      |> put_resp_header("location", game_path(conn, :show, game))
      |> render("show.json", game: game)
    end
  end

  def create_categories_from_api(game) do
    offset = Kernel.inspect(:rand.uniform(100))
    url = "http://jservice.io/api/categories?count=5&offset=" <> offset
    req = Poison.decode!(HTTPoison.get!(url).body)
    IO.puts("RESULT EY #{Kernel.inspect(req)}")
    categories = Map.new()
    for cat_req <- req do
      cat_params = %{"title": cat_req["title"]}
      with {:ok, %Category{} = category} <- Games.create_category(cat_params) do        
        cat_url = "http://jservice.io/api/category?id=" <> Kernel.inspect(cat_req["id"])
        IO.puts("CAT #{Kernel.inspect(category)}")
        cat = Poison.decode!(HTTPoison.get!(cat_url).body)
        val = 200
        Games.create_category_item(%{game_id: game.id, category_id: category.id})
        for n <- [0,1,2,3,4] do
          categories = Map.put(categories, n, category)
          [ clue_req | tail ] = Enum.filter(cat["clues"], fn clue -> clue["value"] == val*(n+1) end)
          IO.puts("CLUE REQ #{Kernel.inspect(clue_req)}")
          clue_params = %{"answer": clue_req["answer"], "question": clue_req["question"], "value": clue_req["value"], "category_id": category.id}
          IO.puts("CLUE PARAMS #{Kernel.inspect(clue_params)}")
          Games.create_clue(clue_params)
        end
      end
    end
    categories
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
end
