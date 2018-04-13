import React from "react";
import Placeholder from "../../components/Placeholder";
import AmazonButton from "../../components/AmazonButton";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login } from "./actions";
import { selectToken } from "./selectors";

const handleSocialLogin = user => {
  console.log(user);
};

const handleSocialLoginFailure = err => {
  console.error(err);
};

class Login extends React.Component {
  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node;
    }
  }

  render() {
    const { props: { handleLogin, token } } = this;
    console.log(window.location.protocol);
    return (
      <div>
        <Placeholder name="login" />
        <div>
          <AmazonButton
            provider="amazon"
            appId="amzn1.application.159bb31fe8f84dd685cd6ae4e930b5e9"
            getInstance={this.setNodeRef.bind(this, "amazon")}
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            key={"amazon"}
          >
            Login with Amazon
          </AmazonButton>
        </div>
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
