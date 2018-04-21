import React from "react";
import Game from "../../containers/Game/index";
import GamesList from "../../containers/GamesList/index";
import Home from "../../components/Home";
import Privacy from "../../components/Privacy";
import Login from "../../containers/Login/index";
import Nav from "../../components/Nav";
import User from "../../containers/User/index";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { update } from "./actions";
import { Route, Switch, withRouter } from "react-router-dom";
import { selectPlaceholder, selectProfile } from "./selectors";

class App extends React.Component {
  constructor(props) {
    super(props);
    const { channel } = props;
    const { updateState } = this;

    channel.on("change", updateState);

    channel
      .join()
      .receive("ok", updateState)
      .receive("error", resp => {
        console.log("Unable to join", resp);
      });
  }

  updateState = payload => this.props.update(payload);

  render() {
    const { props: { placeholder, profile } } = this;

    return (
      <div>
        <Nav profile={profile} />
        <div style={{ margin: "2em" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/games" component={GamesList} />
            <Route
              exact
              path="/users/:userId"
              render={({ match: { params: { userId } } }) => (
                <User userId={userId} />
              )}
            />
            <Route
              exact
              path="/games/:gameId"
              render={({ match: { params: { gameId } } }) => (
                <Game gameId={gameId} />
              )}
            />
            <Route exact path="/privacy" component={Privacy} />
          </Switch>
        </div>
        {/*<button id="updateSession">CLICK ME TO CREATE A NEW SESSION!</button>*/}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  update: payload => dispatch(update(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
