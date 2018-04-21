defmodule JeopardyWeb.Router do
  use JeopardyWeb, :router
  import JeopardyWeb.Plugs

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:put_secure_browser_headers)
    plug(:fetch_user)
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug AlexaRequestVerifier
  end

  scope "/", JeopardyWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
    get("/games", PageController, :index)
    get("/games/:id", PageController, :index)
    get("/users/:id", PageController, :index)
    get("/login", PageController, :index)
    get("/privacy", PageController, :index)
    post("/sessions", SessionController, :login)
    delete("/sessions", SessionController, :logout)

    post("/alexa_post", GameController, :alexa)
    post("/new", GameController, :new)
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", JeopardyWeb do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit])
    resources("/games", GameController)
    resources("/sessions", SessionController)
    resources("/categories", CategoryController)
    resources("/category_items", CategoryItemController)
    resources("/clues", ClueController)
    post("/alexa_post", GameController, :alexa)
    post("/profile", UserController, :get_profile)
  end
end
