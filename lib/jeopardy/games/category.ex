defmodule Jeopardy.Games.Category do
  use Ecto.Schema
  import Ecto.Changeset

    
  schema "categories" do
    field :title, :string
    has_many :clues, Jeopardy.Games.Clue, foreign_key: :clue_id

    timestamps()
  end

  @doc false
  def changeset(category, attrs) do
    category
    |> cast(attrs, [:title])
    |> validate_required([:title])
  end
end
