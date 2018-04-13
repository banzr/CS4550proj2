import React from "react";
import Placeholder from "../../components/Placeholder";
import api from "../../utils/oauthAPI";
import { connect } from "react-redux";
import { selectUserSessions } from "./selectors";
import { selectProfile } from "../App/selectors";
import { selectToken } from "../Login/selectors";
import { setLoaded, setProfile } from "./actions";

class User extends React.Component {
  componentDidMount = () => {
    const { onProfileLoad, token, userId } = this.props;

    if (!token) return;

    api.getProfile(userId, token, profile => {
      onProfileLoad(profile);
    });
  };

  render() {
    const { props: { profile, userId, sessions } } = this;

    if (!profile) {
      return <div>Must be logged in as this user to view their profile</div>;
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
  onProfileLoad: profile => dispatch(setProfile(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
