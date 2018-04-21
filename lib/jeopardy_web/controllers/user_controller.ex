defmodule JeopardyWeb.UserController do
  use JeopardyWeb, :controller

  alias Jeopardy.Users
  alias Jeopardy.Users.User

  action_fallback(JeopardyWeb.FallbackController)

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def get_token(conn, data) do
    send_resp(conn, 200, "")
  end

  def get_profile(conn, %{"token" => token, "user_id" => user_id}) do

    IO.puts("token: ")
    IO.puts(token)

    url_1 = "https://api.amazon.com/auth/o2/tokeninfo?access_token=" <> token
    { :ok, req1 } = HTTPoison.get(url_1, [], [ ssl: [{:versions, [:'tlsv1.2']}] ])
    %{ "aud" => aud } = Poison.decode!(req1.body)

    if (aud ==  "amzn1.application-oa2-client.fa05aae1244646cea1fe24494d3a8a04") do

      url_2 = "https://api.amazon.com/user/profile"
      headers = ["Authorization": "Bearer #{token}"]
      { :ok, req2 } = HTTPoison.get(url_2, headers, [ ssl: [{:versions, [:'tlsv1.2']}] ])
      profile = Poison.decode!(req2.body)

      IO.puts("user_id: ")
      IO.puts(user_id)

      %{ amazon_uid: uuid } = Users.get_user(user_id)
      %{ "user_id" => amzn_usr_id } = profile

      if uuid === amzn_usr_id do
        IO.puts("User ID matches")

        #Return success
        json(conn, %{profile: profile})

      else

      IO.puts("User ID does NOT match")
      IO.puts(uuid)
      IO.puts(amzn_usr_id)
        #Return failure
        json(conn, %{profile: %{}})
      end
    else
      IO.puts("Invalid Token")

      #Return failure
      json(conn, %{profile: %{}})
    end
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
