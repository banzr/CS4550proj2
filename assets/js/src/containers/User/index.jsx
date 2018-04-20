import React from "react";
import Placeholder from "../../components/Placeholder";
import { connect } from "react-redux";
import { selectUserSessions } from "./selectors";

class User extends React.Component {
  // TODO: maybe load user data via JSON?
  // because can have user with no sessions, possibly?

  render() {
    const { props: { userId, sessions } } = this;
    return (
      <div>
        <h1 style={{textAlign : 'center'}}>Sessions for Player {userId}</h1>
        <table className="table" style={{width: '55em', marginLeft: '15%', marginTop: '1%'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(({ game: { id: gameId }, score }, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>Game {gameId}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, { userId }) => ({
  sessions: selectUserSessions(state, userId)
});

export default connect(mapStateToProps)(User);
