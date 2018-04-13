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
import { selectPlaceholder } from "./selectors";

class App extends React.Component {
  constructor(props) {
    super(props);
    const { channel } = props;
    const { updateState } = this;

    console.log(channel);
    channel
      .join()
      .receive("ok", updateState)
      .receive("error", resp => {
        console.log("Unable to join", resp);
      });

    channel.on("update", updateState);
    channel.on("shout", resp => {
      console.log("Message", resp);
    });
  }

  render() {
    const { props: { placeholder } } = this;

    return (
      <div>
        <Nav />
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
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  update: payload => dispatch(update(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
