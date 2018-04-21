defmodule JeopardyWeb.UserController do
  use JeopardyWeb, :controller

  alias Jeopardy.Users
  alias Jeopardy.Users.User

  action_fallback(JeopardyWeb.FallbackController)

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def get_profile(conn, %{"token" => token}) do
    if valid_token?(token) do
      profile_url = "https://api.amazon.com/user/profile"
      headers = [Authorization: "Bearer #{token}"]
      {:ok, response} = HTTPoison.get(profile_url, headers, ssl: [{:versions, [:"tlsv1.2"]}])

      json(conn, %{profile: Poison.decode!(response.body)})
    else
      json(conn, %{})
    end
  end

  def valid_token?(token) do
    our_app_id = "amzn1.application-oa2-client.7c7d7da492884579abc147dc6039141a"
    auth_url = "https://api.amazon.com/auth/o2/tokeninfo?access_token=" <> token
    {:ok, response} = HTTPoison.get(auth_url, [], ssl: [{:versions, [:"tlsv1.2"]}])
    %{"aud" => app_id} = Poison.decode!(response.body)
    our_app_id === app_id
  end

  def verify_user(conn, %{user_id: user_id, amazon_user_id: auid}) do
    %{amazon_uid: uuid} = Users.get_user(user_id)
    json(conn, %{verified: uuid === auid})
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
