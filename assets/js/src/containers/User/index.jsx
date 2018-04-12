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
        <Placeholder name={`Player ${userId}`} />
        <h3>Sessions</h3>
        <ul>
          {sessions.map(({ game: { id: gameId }, score }, index) => (
            <li key={index}>
              Game {gameId}, score {score}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, { userId }) => ({
  sessions: selectUserSessions(state, userId)
});

export default connect(mapStateToProps)(User);
