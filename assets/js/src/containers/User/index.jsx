import React from "react";
import Placeholder from "../../components/Placeholder";
import api from "../../utils/api";
import { connect } from "react-redux";
import { selectUserSessions, selectLoaded, selectProfile } from "./selectors";
import { selectToken } from "../Login/selectors";
import { setLoaded, setProfile } from "./actions";

class User extends React.Component {
  componentDidMount = () => {
    const { onProfileLoad, token, userId, onLoad } = this.props;
    if (!token) {
      onLoad(true);
      return;
    }

    api.getProfile(userId, token, profile => {
      onProfileLoad(profile);
      onLoad(true);
    });
  };

  render() {
    const { props: { profile, userId, sessions, loaded } } = this;

    if (!profile) {
      return (
        <div>
          {loaded
            ? "Must be logged in as this user to view their profile"
            : "Loading..."}
        </div>
      );
    }

    const { name } = profile;

    return (
      <div>
        <Placeholder name={`Player: ${name}`} />
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
  loaded: selectLoaded(state),
  sessions: selectUserSessions(state, userId),
  profile: selectProfile(state),
  token: selectToken(state)
});

const mapDispatchToProps = dispatch => ({
  onProfileLoad: profile => dispatch(setProfile(profile)),
  onLoad: loaded => dispatch(setLoaded(loaded))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
