defmodule JeopardyWeb.UserView do
  use JeopardyWeb, :view
  alias JeopardyWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      amazon_uid: user.amazon_uid,
      name: user.name}
  end
end
