import React from "react";
import Heading from "../../components/Heading";
import GameCard from "../../components/GameCard";
import HighscoreCard from "../../components/HighscoreCard";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectGames, selectHighscoreSessions } from "./selectors";

class GamesList extends React.Component {
  renderGames = () => {
    const { games } = this.props;
    return (
      <div className="col" style={{ width: "100em", marginLeft: "10em" }}>
        <div className="row">
          {Object.entries(games).map(([id, game], index) => (
            <GameCard key={index} gameId={id} game={game} />
          ))}
        </div>
      </div>
    );
  };

  renderHighscores = () => {
    const { highscoreSessions } = this.props;

    return (
      <div className="col" style={{ marginLeft: "10em" }}>
        <div className="card" style={{ width: "30em", height: "auto" }}>
          <div
            className="card-header text-white text-center"
            style={{ background: "grey" }}
          >
            <h5>Husky Jeopardy Board</h5>
          </div>
          <div className="card-body">
            {highscoreSessions.map((session, index) => (
              <HighscoreCard key={index} {...session} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { renderGames, renderHighscores } = this;
    return (
      <div style={{ margin: "1em" }}>
        <Heading text="Games" />
        <div className="row">
          {renderGames()}
          {renderHighscores()}
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
