import React from "react";

export default function AmazonButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ margin: "0 auto" }}>
      <img
        border="0"
        alt="Login with Amazon"
        src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
        width="156"
        height="32"
      />
    </button>
  );
}
