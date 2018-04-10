defmodule Jeopardy.Repo.Migrations.CreateCategoryItems do
  use Ecto.Migration

  def change do
    create table(:category_items) do
      add :category_id, references(:categories, on_delete: :delete_all), null: false
      add :game_id, references(:games, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:category_items, [:category_id])
    create index(:category_items, [:game_id])
  end
end
