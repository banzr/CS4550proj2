// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".
import {Socket} from "phoenix"


import render from "./src/index";

function successFunction(){
  console.log('success');
}

$(function() {
  var root = document.getElementById('root');
  let socket = new Socket("/socket", {params: {token: window.userToken}})
  socket.connect()
  let channel = socket.channel("game:lobby",window.gameName,{})
  if (!root) return;

  render(root,channel);
// start :- This code block should be removed: 
// used only to create session from UI to check channel functionality
  $("#updateSession").on("click", function(){
    console.log("clicked !!!!!");
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ session:{ score: 500 , game_id: 1, user_id:1}}),
      success: (resp) => {
        console.log("success");
      },
    });
  })
  //end
});
