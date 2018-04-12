import React from "react";
import Placeholder from "../../components/Placeholder";
import { connect } from "react-redux";
import { selectGameSessions } from "./selectors";

class Game extends React.Component {
  render() {
    const { props: { gameId, sessions } } = this;
    return (
      <div>
        <Placeholder name={`Game ${gameId}`} />
        <h3>Sessions</h3>
        <ul>
          {sessions.map(({ player: { id: playerId }, score }, index) => (
            <li key={index}>
              Player {playerId}, score {score}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, { gameId }) => ({
  sessions: selectGameSessions(state, gameId)
});

export default connect(mapStateToProps)(Game);
