import logo from "./logo.svg";
import "./App.css";
import PhoneInput from "react-phone-number-input";
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState('');

  console.log(value)
  console.log(country)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <PhoneInput
          className="hello"
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          onCountryChange={setCountry}
        />
      </header>
    </div>
  );
}

export default App;
