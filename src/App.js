import { useEffect, useState } from "react";
import "./styles.scss";

const defaultBox = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const valueBox = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let users = { X: [], O: [] };

export default function App() {
  let [boxes, setBoxes] = useState(defaultBox);
  let [currentUser, setCurrentUser] = useState(true);
  let [win, setWin] = useState(null);

  const toggleUser = () => setCurrentUser((p) => !p);

  const handleClick = (x, y) => {
    if (win === null) {
      let newBoxes = [[...boxes[0]], [...boxes[1]], [...boxes[2]]];
      if (newBoxes[x][y] === null) {
        newBoxes[x][y] = currentUser ? "X" : "O";
        users[currentUser ? "X" : "O"].push(valueBox[x][y]);
        setBoxes(newBoxes);
        toggleUser();
      }
    }
  };

  useEffect(() => {
    console.clear();

    Object.keys(users).map((user) => {
      let userClicks = users[user];
      if (userClicks.length >= 3) {
        let checkWin = winningPositions.findIndex((positions) => {
          return positions.every((e) => userClicks.includes(e));
        });
        if (checkWin !== -1) {
          setWin(user);
        }
      }
    });
  }, [boxes]);

  let restartGame = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      {win === null && (
        <div className="message">Current User: {currentUser ? "X" : "O"}</div>
      )}
      {win !== null && <div className="message">Winner is: {win}</div>}

      <div className="box-wrapper">
        {boxes.map((row, rowInx) => {
          return (
            <div className="row" key={"row-" + rowInx}>
              {row.map((colmun, colInx) => {
                return (
                  <div
                    className="column"
                    key={`box-${rowInx}-${colInx}`}
                    onClick={() => handleClick(rowInx, colInx)}
                  >
                    {colmun}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="btn" onClick={restartGame}>
        Restart Game
      </div>
    </div>
  );
}
