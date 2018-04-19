import React from "react";
import Placeholder from "./Placeholder";

export default function Home() {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Welcome to Husky Jeopardy!</h1>
      <Placeholder name="home" />
      <p>Instructions/etc go here...</p>
    </div>
  );
}
