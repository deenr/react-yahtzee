import "./App.css";
import Dice from "./components/Dice";

function App() {
  return (
    <div className="App">
      <Dice value={1} />
      <Dice value={2} />
      <Dice value={3} />
      <Dice value={4} />
      <Dice value={5} />
      <Dice value={6} />
    </div>
  );
}

export default App;
