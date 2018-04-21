import React from "react";
import Heading from "../../components/Heading";
import PlayerLink from "../../components/PlayerLink";
import { connect } from "react-redux";
import { selectGameSessions } from "./selectors";

class Game extends React.Component {
  renderList = (list, getData = x => x) => {
    if (!list) return null;
    return <ol>{list.map((item, i) => <li key={i}>{getData(item)}</li>)}</ol>;
  };

  renderCluesField = (clues, field) =>
    this.renderList(clues, ({ [field]: data }) => data);
  renderAnswers = clues => this.renderCluesField(clues, "answer");
  renderQuestions = clues => this.renderCluesField(clues, "question");

  render() {
    const {
      props: { gameId, sessions },
      renderAnswers,
      renderList,
      renderQuestions
    } = this;

    return (
      <div>
        <Heading text={`Sessions for Game ${gameId}`} />
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
            {sessions.map(
              ({ answers, clues, player: { id: playerId }, score }, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>
                    <PlayerLink id={playerId} />
                  </td>
                  <td>{score}</td>
                  <td>{renderQuestions(clues)}</td>
                  <td>{renderAnswers(clues)}</td>
                  <td>{renderList(answers)}</td>
                </tr>
              )
            )}
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
