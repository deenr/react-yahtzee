import { useState } from "react";

function Scoreboard(props) {
  const [scores, setScores] = useState([
    { id: "ones", value: -1, name: "Ones" },
    { id: "twos", value: -1, name: "Twos" },
    { id: "threes", value: -1, name: "Threes" },
    { id: "fours", value: -1, name: "Fours" },
    { id: "fives", value: -1, name: "Fives" },
    { id: "sixes", value: -1, name: "Sixes" },
    { id: "three-of-a-kind", value: -1, name: "Three of a kind" },
    { id: "four-of-a-kind", value: -1, name: "Four of a kind" },
    { id: "full-house", value: -1, name: "Full house" },
    { id: "small-straight", value: -1, name: "Small straight" },
    { id: "large-straight", value: -1, name: "Large straight" },
    { id: "chance", value: -1, name: "Chance" },
    { id: "yahtzee", value: -1, name: "Yahtzee" },
    { id: "total-score", value: -1, name: "Total" },
  ]);

  function scoreSumOfNumber(number) {
    const arrayWithNumbers = props.diceValues.filter(
      (value) => value === number
    );
    return arrayWithNumbers.length > 0
      ? arrayWithNumbers.reduce((prev, acc) => prev + acc)
      : 0;
  }

  function scoreOfAKind(kindNumber) {
    let score = 0;
    for (let i = 1; i <= 6; i++) {
      const count = props.diceValues.filter((die) => die === i).length;
      if (count >= kindNumber) {
        score = props.diceValues.reduce((total, die) => total + die);
        break;
      }
    }
    return score;
  }

  function scoreFullHouse() {
    let score = 0;
    const counts = new Array(7).fill(0);
    props.diceValues.forEach((die) => counts[die]++);
    if (counts.includes(3) && counts.includes(2)) {
      score = 25;
    }
    return score;
  }

  function scoreSmallStraight() {
    let score = 0;
    const uniqueValues = [...new Set(props.diceValues)];
    uniqueValues.sort();
    let consecutiveCount = 0;
    for (let i = 0; i < uniqueValues.length; i++) {
      if (uniqueValues[i + 1] === uniqueValues[i] + 1) {
        consecutiveCount++;
        if (consecutiveCount >= 3) {
          score = 30;
          break;
        }
      } else {
        consecutiveCount = 0;
      }
    }
    return score;
  }

  function scoreLargeStraight() {
    let score = 0;
    const uniqueValues = [...new Set(props.diceValues)];
    uniqueValues.sort();
    if (uniqueValues.length === 5 && uniqueValues[4] - uniqueValues[0] === 4) {
      score = 40;
    }
    return score;
  }

  function scoreChance() {
    const score = props.diceValues.reduce((total, currentValue) => {
      return total + currentValue;
    }, 0);
    return score;
  }

  function scoreYahtzee() {
    let score = 0;
    const uniqueValues = [...new Set(props.diceValues)];
    if (uniqueValues.length === 1) {
      score = 50;
    }
    return score;
  }

  function calculateScore(id) {
    switch (id) {
      case "ones":
        return scoreSumOfNumber(1);
      case "twos":
        return scoreSumOfNumber(2);
      case "threes":
        return scoreSumOfNumber(3);
      case "fours":
        return scoreSumOfNumber(4);
      case "fives":
        return scoreSumOfNumber(5);
      case "sixes":
        return scoreSumOfNumber(6);
      case "three-of-a-kind":
        return scoreOfAKind(3);
      case "four-of-a-kind":
        return scoreOfAKind(4);
      case "full-house":
        return scoreFullHouse();
      case "small-straight":
        return scoreSmallStraight();
      case "large-straight":
        return scoreLargeStraight();
      case "chance":
        return scoreChance();
      case "yahtzee":
        return scoreYahtzee();
    }
  }

  function setScore(id) {
    console.log(calculateScore(id));
  }

  const tableRows = scores.map((score) => (
    <tr key={score.id}>
      <td>{score.name}</td>
      <td
        style={{ backgroundColor: "blue" }}
        onClick={() => setScore(score.id)}
      >
        {score.value !== -1 && score.value}
      </td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Me</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default Scoreboard;
