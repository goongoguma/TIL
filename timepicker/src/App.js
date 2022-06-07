import logo from "./logo.svg";
import "./App.css";
import TimePicker from "./TimePicker";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <TimePicker />
    </div>
  );
}

export default App;
