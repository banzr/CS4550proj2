defmodule Jeopardy.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :amazon_uid, :integer
      add :name, :string

      timestamps()
    end

  end
end
