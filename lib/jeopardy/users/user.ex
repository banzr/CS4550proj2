defmodule Jeopardy.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :amazon_uid, :integer
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:amazon_uid, :name])
    |> validate_required([:amazon_uid, :name])
  end
end
