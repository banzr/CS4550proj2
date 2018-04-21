import React from "react";
import Placeholder from "../../components/Placeholder";
import oauthAPI from "../../utils/oauthAPI";
import { connect } from "react-redux";
import { selectUserSessions } from "./selectors";
import { selectProfile } from "../App/selectors";
import { selectToken } from "../Login/selectors";
import { setVerified } from "./actions";

class User extends React.Component {
  componentDidMount = () => {
    const { props: { profile, userId, onVerify } } = this;
    if (!profile) return;

    oauthAPI.verifyUser(userId, profile.user_id, onVerify);
  };

  render() {
    const { props: { profile, userId, sessions, verified } } = this;

    if (!verified) {
      return <div>Must be logged in as this user to view their profile.</div>;
    }

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Sessions for {profile.name}</h1>
        <table
          className="table"
          style={{ width: "55em", marginLeft: "15%", marginTop: "1%" }}
        >
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
  sessions: selectUserSessions(state, userId),
  profile: selectProfile(state),
  token: selectToken(state)
});

const mapDispatchToProps = dispatch => ({
  onVerify: verified => dispatch(setVerified(verified))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
