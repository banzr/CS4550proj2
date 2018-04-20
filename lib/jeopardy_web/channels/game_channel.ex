defmodule JeopardyWeb.GameChannel do
  use JeopardyWeb, :channel
  alias Jeopardy.Game

  def join("game:lobby", payload, socket) do
    if authorized?(payload) do
      send(self(), {:after_join, %{msg: "new user"}})
      {:ok,%{sessions: Game.fetch_sessions}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("game:" <> name, payload, socket) do
    if authorized?(payload) do
      socket = socket
      |> assign(:name, name)
      send(self, {:after_join, name})
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def broadcast_change() do
    payload = %{sessions: Game.fetch_sessions}
    JeopardyWeb.Endpoint.broadcast("game:lobby", "change", payload)
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:lobby).
  def handle_in("update", payload, socket) do
    broadcast socket, "update", payload
    {:noreply, socket}
  end

  def handle_info({:after_join, resp}, socket) do
    broadcast socket, "shout", resp
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
