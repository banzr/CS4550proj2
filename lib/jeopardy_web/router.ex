defmodule JeopardyWeb.Router do
  use JeopardyWeb, :router
  import JeopardyWeb.Plugs

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_game_session
    plug :fetch_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", JeopardyWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    
    post "/sessions", SessionController, :login
    delete "/sessions", SessionContrller, :logout

    post "/alexa_post", GameController, :create

    post "/new", GameController, :new
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", JeopardyWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/games", GameController
    resources "/categories", CategoryController
    resources "/category_items", CategoryItemController
    resources "/clues", ClueController
  end
end
