function Dice(props) {
  function getDiceImage(value) {
    const writtenNumbers = ["one", "two", "three", "four", "five", "six"];
    return `dice-${writtenNumbers[value - 1]}.svg`;
  }

  const styles = { backgroundColor: props.isSelected ? "grey" : "" };

  return (
    <div style={styles} className="dice">
      <img
        src={`/src/assets/${getDiceImage(props.value)}`}
        alt=""
        onClick={() => props.selectDice(props.id)}
      />
    </div>
  );
}

export default Dice;
