function Dice(props: { value: number }) {
  function getDiceImage(value: number): string {
    const writtenNumbers = ["one", "two", "three", "four", "five", "six"];
    return `dice-${writtenNumbers[value - 1]}.svg`;
  }

  return <img src={`/src/assets/${getDiceImage(props.value)}`} />;
}

export default Dice;
