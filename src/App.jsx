import { useEffect, useState } from "react";
import "./App.scss";
import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [rerollAmount, setRerollAmount] = useState(0);
  const [turnOver, setTurnOver] = useState(false);

  useEffect(() => {
    setTurnOver(rerollAmount === 2);
  }, [rerollAmount]);

  function allNewDice() {
    const dice = [];
    for (let i = 0; i < 5; i++) {
      dice.push({
        id: i,
        value: getRandomDiceValue(),
        isSelected: false,
      });
    }
    return dice;
  }

  function getRandomDiceValue() {
    return Math.ceil(Math.random() * 6);
  }

  function selectDice(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isSelected: !dice.isSelected } : dice
      )
    );
  }

  function reroll() {
    if (turnOver) {
      setDice(allNewDice());
      setRerollAmount(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((dice) =>
          dice.isSelected ? dice : { ...dice, value: getRandomDiceValue() }
        )
      );
      setRerollAmount((prevRerollAmount) => prevRerollAmount + 1);
    }
  }

  const diceElements = dice.map((diceValue) => (
    <Dice
      key={diceValue.id}
      id={diceValue.id}
      value={diceValue.value}
      isSelected={diceValue.isSelected}
      selectDice={selectDice}
    />
  ));

  return (
    <div>
      <div className="dices">{diceElements}</div>
      <button onClick={reroll}>{turnOver ? "Next turn" : "Reroll"}</button>
      <Scoreboard diceValues={dice.map((diceValue) => diceValue.value)} />
    </div>
  );
}

export default App;
