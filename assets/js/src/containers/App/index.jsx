import React from "react";
import Home from "../../components/Home";
import Nav from "../../components/Nav";
import Login from "../../containers/Login/index";
import GamesList from "../../containers/GamesList/index";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { decrement, increment } from "./actions";
// import { history } from "../../store";
import { makeSelectPlaceholder } from "./selectors";
import { Route, Switch, withRouter } from "react-router-dom";

class App extends React.Component {
  incrementBy3 = () => this.props.increment(3);
  decrementBy2 = () => this.props.decrement(2);

  render() {
    console.log("hey, rendering app", this.props.location);

    const { incrementBy3, decrementBy2, props: { placeholder } } = this;

    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/games" component={GamesList} />
        </Switch>

        {/* placeholder stuff for example of using actions/etc. */}
        <p>Placeholder value: {placeholder}</p>
        <Button onClick={incrementBy3}>increment by 3</Button>
        <Button onClick={decrementBy2}>decrement by 2</Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  placeholder: makeSelectPlaceholder()
});

const mapDispatchToProps = dispatch => ({
  increment: increase => dispatch(increment(increase)),
  decrement: decrease => dispatch(decrement(decrease))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
