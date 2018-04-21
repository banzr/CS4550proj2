import React from "react";
import Placeholder from "../../components/Placeholder";
import { connect } from "react-redux";
import { selectGameSessions } from "./selectors";

class Game extends React.Component {
  render() {
    const { props: { gameId, sessions } } = this;
    let answer=[];
    let questions=[];
    let correctAnswer=[];
    if(sessions.length>0){
      for(var i=0;i<sessions.length;i++){
        console.log(sessions[i].clues);

        if(sessions[i].clues!=null || sessions[i].clues!= undefined){
          if(sessions[i].clues.length>0){
            let  valueQ=[];
            let valueA=[];
            for(var k=0;k<sessions[i].clues.length;k++){
              if(sessions[i].clues[k].question!=undefined || sessions[i].clues[k].question!=null){
                valueQ[k]=<li key={k}>{sessions[i].clues[k].question}</li>
              }
              if(sessions[i].clues[k].answer!=undefined || sessions[i].clues[k].answer!=null){
                valueA[k]=<li key={k}>{sessions[i].clues[k].answer}</li>
              }}
              questions[i]=valueQ;correctAnswer[i]=valueA;
            }}
            if(sessions[i].answers==undefined ){
              answer[i]= "no answers";
              questions[i]="no questions";
              correctAnswer[i]="no answers"
            }
            else {
              let value=[];
              for(var j=0; j<sessions[i].answers.length;j++){
                value[j]= <li key={j}>{sessions[i].answers[j]}</li>
              }
              answer[i]=value;
            }}}
            return (
              <div>
                <h1 style={{ textAlign: "center" }}>Sessions for Game {gameId}</h1>
                <table
                  className="table"
                  style={{ width: "85em", marginLeft: "5%", marginTop: "1%" }}
                  >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Player</th>
                      <th scope="col">Score</th>
                      <th scope="col">Questions</th>
                      <th scope="col">Answers</th>
                      <th scope="col">Player Answers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(({ player: { id: playerId }, score }, index) => (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>Player {playerId}</td>
                        <td>{score}</td>
                        <td>{questions[index]}</td>
                        <td>{correctAnswer[index]}</td>
                        <td>{answer[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          }

          const mapStateToProps = (state, { gameId }) => ({
            sessions: selectGameSessions(state, gameId)
          });

          export default connect(mapStateToProps)(Game);
