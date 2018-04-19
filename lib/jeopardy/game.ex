defmodule Jeopardy.Game do
  alias Jeopardy.Sessions

  def fetch_sessions do
    Sessions.list_sessions |> list_to_sanitize
  end

  defp list_to_sanitize(list) do
    for n <- list, do: sanitize_map(n)
  end

  defp sanitize_map(struct) do
    sanitize(struct, [:score])
    |> Map.put(:game, sanitize(struct.game, [:id]))
    |> Map.put(:player, sanitize(struct.user, [:id]))
  end

  defp sanitize(struct, val) do
    Map.from_struct(struct) |> Map.take(val)
  end
end


#conversion of ecto to map : https://stackoverflow.com/questions/36512627/elixir-convert-struct-to-map,
#https://coderwall.com/p/fhsehq/fix-encoding-issue-with-ecto-and-poison
