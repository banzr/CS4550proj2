import React from "react";
import Placeholder from "../../components/Placeholder";
import AmazonButton from "../../components/AmazonButton";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login, setToken } from "./actions";

class Login extends React.Component {
  handleLoginClick = () => {
    const { handleLogin, onLogin } = this.props;
    handleLogin(onLogin);
  }

  render() {
    return (
      <div>
        <Placeholder name="login" />
        <AmazonButton onClick={this.handleLoginClick} />
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  handleLogin: onLogin => dispatch(login(onLogin)),
  onLogin: token => dispatch(setToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
