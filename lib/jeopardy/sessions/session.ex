defmodule Jeopardy.Sessions.Session do
  use Ecto.Schema
  import Ecto.Changeset


  schema "sessions" do
    field :score, :integer
    belongs_to :game, Jeopardy.Games.Game
    belongs_to :user, Jeopardy.Users.User

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:score, :game_id, :user_id])
    |> validate_required([:score, :game_id, :user_id])
  end
end
