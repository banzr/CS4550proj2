import React from "react";
import Placeholder from "../../components/Placeholder";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login } from "./actions";
import { makeSelectToken } from "./selectors";

class Login extends React.Component {
  render() {
    const { props: { handleLogin, token } } = this;

    return (
      <div>
        <Placeholder name="login" />
        <p>Token: {token}</p>
        <Button onClick={handleLogin}>login</Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken()
});

const mapDispatchToProps = dispatch => ({
  handleLogin: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
