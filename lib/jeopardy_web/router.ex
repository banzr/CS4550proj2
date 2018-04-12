defmodule JeopardyWeb.Router do
  use JeopardyWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", JeopardyWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
    get("/games", PageController, :index)
    get("/games/:id", PageController, :index)
    get("/users/:id", PageController, :index)
    get("/login", PageController, :index)
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", JeopardyWeb do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit])
    resources("/games", GameController, except: [:new, :edit])
    resources("/sessions", SessionController, except: [:new, :edit])
  end
end
