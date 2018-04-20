import React from "react";
import Placeholder from "../../components/Placeholder";
import { connect } from "react-redux";
import { selectGameSessions } from "./selectors";

class Game extends React.Component {
  render() {
    const { props: { gameId, sessions } } = this;
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Sessions for Game {gameId}</h1>
        <table className="table" style={{width: '55em', marginLeft: '15%', marginTop: '1%'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(({ player: { id: playerId }, score }, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>Player {playerId}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state, { gameId }) => ({
  sessions: selectGameSessions(state, gameId)
});

export default connect(mapStateToProps)(Game);
