import React from "react";
import Placeholder from "../../components/Placeholder";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectGames } from "./selectors";
import { Link } from "react-router-dom";

class GamesList extends React.Component {
  render() {
    const { props: { games } } = this;

    return (
      <div>
        <Placeholder name="Games list page" />
        <h3>Games</h3>
        <ul>
          {/*TODO: break up into smaller components*/}
          {Object.entries(games).map(([id, { highscore, players }], index) => (
            <li key={index}>
              <Link to={`games/${id}`}>(Game {id})</Link> has players{" "}
              {players.map(({ id: playerId }) => (
                <Link key={playerId} to={`users/${playerId}`}>
                  (Player {playerId})
                </Link>
              ))}
              with high score {highscore}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  games: selectGames
});

export default connect(mapStateToProps)(GamesList);
