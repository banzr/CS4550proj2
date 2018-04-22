import React from "react";
import PlayerLink from "./PlayerLink";
import GameLink from "./GameLink";

export default function GameCard({ gameId, game: { highscore, players } }) {
  const renderedPlayers = (
    <ul>
      {players.map(({ id: playerId }, index) => (
        <li key={index}>
          <PlayerLink id={playerId} />
        </li>
      ))}
    </ul>
  );

  const header = (
    <div
      className="card-header text-white text-center"
      style={{ background: "light-grey" }}
    >
      <h5 style={{ color: "black" }}>
        <GameLink id={gameId} />
      </h5>
    </div>
  );

  return (
    <div
      className="card"
      style={{
        margin: "1em",
        border: "1px solid black",
        width: "20em"
      }}
    >
      {header}
      <div className="card-body" style={{ width: "15em" }}>
        <div className="card-text">
          Players: {renderedPlayers}
          with high score {highscore}
        </div>
      </div>
    </div>
  );
}
