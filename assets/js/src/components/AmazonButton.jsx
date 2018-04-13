import React from "react";
import SocialLogin from "react-social-login";

const LoginButton = ({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    {children}
  </button>
);

export default SocialLogin(LoginButton);
