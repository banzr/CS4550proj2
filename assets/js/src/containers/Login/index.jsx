import React from "react";
import Placeholder from "../../components/Placeholder";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login } from "./actions";
import { selectToken } from "./selectors";

class Login extends React.Component {
  render() {
    const { props: { handleLogin, token } } = this;

    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <p>Token: {token}</p>
        <Button onClick={handleLogin}>login</Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken
});

const mapDispatchToProps = dispatch => ({
  handleLogin: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
