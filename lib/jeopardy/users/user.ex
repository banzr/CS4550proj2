defmodule Jeopardy.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :amazon_uid, :string
    field :name, :string
    has_many :sessions, Jeopardy.Sessions.Session, foreign_key: :session_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:amazon_uid, :name])
    |> validate_required([:amazon_uid])
  end
end
