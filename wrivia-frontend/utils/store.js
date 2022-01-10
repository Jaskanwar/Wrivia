import React from "react";
export const StoreContext = React.createContext(null);
export default ({ children }) => {
  const [lobbyID, setLobbyId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const store = {
    lobbyId: [lobbyID, setLobbyId],
    name: [name, setName],
    question: [question, setQuestion],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
