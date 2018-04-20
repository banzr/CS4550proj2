import { createSelector } from "reselect";
import { selectSessions } from "../App/selectors";
import { selectHighscorePlayers } from "../App/selectors";

export const selectGames = createSelector(
  selectSessions,
  // transform sessions into { [game_id]: { highscore, players }} for each game
  sessions =>{
    return sessions.reduce((games, session) => {
      const { game: { id: gameId } } = session;
      games[gameId] = getGameFromSession(games[gameId], session);
      return games;
    }, {})}
  );

  export const showHighscorePlayers = createSelector(
    selectHighscorePlayers,
    highscorePlayers => {
      var sorted;
      do {
        sorted = false;
        for (var i=0; i < highscorePlayers.length-1; i++) {
          if (highscorePlayers[i].score < highscorePlayers[i+1].score) {
            var temp = highscorePlayers[i];
            highscorePlayers[i] = highscorePlayers[i+1];
            highscorePlayers[i+1] = temp;
            sorted = true;
          }
        }
      } while (sorted);

      let len=10;
      let newHighScoreplayers =[];
      for (var i=0; i < len-1; i++) {
        if(highscorePlayers[i]!=undefined)
          newHighScoreplayers[i] = highscorePlayers[i];
      }
      return newHighScoreplayers;
    });

    const getGameFromSession = (game, session) => {
      const { game: { id: gameId }, player, score } = session;

      if (!game) {
        return { highscore: score, players: [player] };
      }

      const { highscore, players } = game;
      const { id: playerId } = player;

      return {
        highscore: score > highscore ? score : highscore,
        players: players.find(({ id }) => id === playerId)
        ? players
        : [...players, player]
      };
    };
