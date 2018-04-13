import React from "react";
import Placeholder from "../../components/Placeholder";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectGames, selectHighscoreSessions } from "./selectors";
import { Link } from "react-router-dom";

class GamesList extends React.Component {
  render() {
    const { props: { games, highscoreSessions } } = this;
    return (
      <div style={{ margin: "1em" }}>
        <h1 style={{ textAlign: "center", marginBottom: "0.5em" }}>Games</h1>
        <div className="row">
          <div className="col" style={{ width: "100em", marginLeft: "10em" }}>
            <div className="row">
              {Object.entries(games).map(
                ([id, { highscore, players }], index) => (
                  <div
                    className="card"
                    key={index}
                    style={{
                      margin: "1em",
                      border: "1px solid black",
                      width: "20em"
                    }}
                  >
                    <div
                      className="card-header text-white text-center"
                      style={{ background: "light-grey" }}
                    >
                      {" "}
                      <h5 style={{ color: "black" }}>
                        {" "}
                        <Link to={`games/${id}`}>Game {id}</Link>
                      </h5>
                    </div>
                    <div className="card-body" style={{ width: "15em" }}>
                      <div className="card-text">
                        Players:
                        <ul>
                          {players.map(({ id: playerId }) => (
                            <Link key={playerId} to={`users/${playerId}`}>
                              <li>Player {playerId}</li>
                            </Link>
                          ))}
                        </ul>
                        with high score {highscore}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col" style={{ marginLeft: "10em" }}>
            <div className="card" style={{ width: "30em", height: "auto" }}>
              <div
                className="card-header text-white text-center"
                style={{ background: "grey" }}
              >
                {" "}
                <h5>Husky Jeopardy Board</h5>
              </div>
              <div className="card-body">
                {highscoreSessions.map(({ game, player, score }, index) => (
                  <div key={index} className="card-body">
                    <h5 className="card-title"> Player {player.id}</h5>
                    <p style={{ float: "right" }}>Game {game.id}</p>
                    <h4>{score}</h4>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  games: selectGames,
  highscoreSessions: selectHighscoreSessions
});

export default connect(mapStateToProps)(GamesList);
