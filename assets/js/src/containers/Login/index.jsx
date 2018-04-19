import React from "react";
import Placeholder from "../../components/Placeholder";
import AmazonButton from "../../components/AmazonButton";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login } from "./actions";
import { selectToken } from "./selectors";

class Login extends React.Component {
  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node;
    }
  }

  render() {
    const { props: { handleLogin, token } } = this;
    return (
      <div>
        <Placeholder name="login" />
        <AmazonButton onClick={handleLogin}/>
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
