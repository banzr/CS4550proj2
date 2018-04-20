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
import { decrement, increment ,update } from "./actions";
import { Route, Switch, withRouter } from "react-router-dom";
import { selectPlaceholder, selectProfile } from "./selectors";

class App extends React.Component {
  constructor(props) {
    super(props);
    const { channel } = props;
    const {updateState } = this;
    console.log(channel);
    channel.join()
    .receive("ok", updateState )
    .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("update", updateState)
    channel.on("shout", resp => { console.log("Message", resp) })
    channel.on("change", updateState)

  }
  // TODO: websocket stuff here (in constructor/etc)
  // to load all session data and update on pushes

  // TODO: remove placeholder/example stuff
  updateState = payload => this.props.update(payload);
  incrementBy3 = () => this.props.increment(3);
  decrementBy2 = () => this.props.decrement(2);

  render() {
    const { incrementBy3, decrementBy2, props: { placeholder , profile } } = this;

    return (
      <div>
        <Nav profile={profile}/>
        <div style={{margin: '2em'}}>
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

          {/* placeholder stuff for example of using actions/etc. */}
          {/*<p>Placeholder value: {placeholder}</p>
        <Button onClick={incrementBy3}>increment by 3</Button>
        <Button onClick={decrementBy2}>decrement by 2</Button>*/}
      </div>
      {/*start: dummy code block*/}
      <button id="updateSession">CLICK ME TO CREATE A NEW SESSION!</button>
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  placeholder: selectPlaceholder,
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  increment: increase => dispatch(increment(increase)),
  decrement: decrease => dispatch(decrement(decrease)),
  update: payload => dispatch(update(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
