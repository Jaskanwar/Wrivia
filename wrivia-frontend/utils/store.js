import React from "react";
export const StoreContext = React.createContext(null);
export default ({ children }) => {
  const [lobbyID, setLobbyId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [isHost, setIsHost] = React.useState(false);
  const [playerList, setPlayerList] = React.useState([]);
  const [startRound, setStartRound] = React.useState(false);
  const [displayQuestion, setdisplayQuestion] = React.useState();
  const [playerQuestion, setPlayerQuestion] = React.useState([]);
  const [answer, setAnswer] = React.useState("");

  const store = {
    lobbyId: [lobbyID, setLobbyId],
    name: [name, setName],
    question: [question, setQuestion],
    isHost: [isHost, setIsHost],
    playerList: [playerList, setPlayerList],
    startRound: [startRound, setStartRound],
    displayQuestion: [displayQuestion, setdisplayQuestion],
    playerQuestion: [playerQuestion, setPlayerQuestion],
    answer: [answer, setAnswer],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
