import React from "react";
// import SocialLogin from "react-social-login";

// const LoginButton = ({ children, triggerLogin, ...props }) => (
//   <button onClick={triggerLogin} {...props}>
//     {children}
//   </button>
// );

// export default SocialLogin(LoginButton);

export default function AmazonButton({ onClick }) {
  return (<button onClick={onClick}>
      <img border="0" alt="Login with Amazon"
           src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
           width="156" height="32" />
  </button>)
}