import "./App.css";
import React, { useState, useEffect } from "react";
import countries from "./data.json";
import libphonenumber from 'google-libphonenumber';

const PhoneNumber = ({ onChangePhone }) => {
  const [countryIndex, setCountryIndex] = useState('0');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(0);
  const [country, setCountry] = useState({
    name: "international",
    dialCode: "",
    isoCode: "",
    flag: "",
  });
  
  const countriesEntries = Object.entries(countries);
  const PNF = libphonenumber.PhoneNumberFormat;
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();  
  
  useEffect(() => {
    if (phoneNumber.length > 2 && country.isoCode) {
      const phoneNumberProto = phoneUtil.parse(country.dialCode + phoneNumber, country.isoCode);
      onChangePhone(phoneUtil.format(phoneNumberProto, PNF.E164));
    };
  }, [phoneNumber]);

  useEffect(() => {
    if (country.name === 'international') {
      setPhoneNumber('');
      setIsValidNumber(0);
    };
  }, [country.name]);

  const onChangeCountry = (index) => {
    const _index = `${index}`;
    setCountryIndex(_index);
    setCountry(new Map(countriesEntries).get(_index));
  };

  const onChangePhoneNumber = (number) => {
    setPhoneNumber(number);
  }

  const onBlurValidation = () => {
    if (!!phoneNumber.length) {
      const phoneNumberProto = phoneUtil.parse(country.dialCode + phoneNumber, country.isoCode);
      phoneUtil.isValidNumber(phoneNumberProto) ? setIsValidNumber(0) : setIsValidNumber(1);
    } else {
      setIsValidNumber(0)
    }
  };

  return (
    <div>
      <select
        id="country_list"
        value={countryIndex}
        onChange={(e) => onChangeCountry(e.target.value)}
      >
        {countries.map((country, index) => {
          return (
            <option value={`${index}`} key={country.name}>
              {country.name}
            </option>
          );
        })}
      </select>
      <input type='tel' name='tel' value={phoneNumber} onChange={e => onChangePhoneNumber(e.target.value)} disabled={!country.isoCode} onBlur={onBlurValidation}/>
      {isValidNumber === 1 && <p>Invalid number</p>}
    </div>
  );
};

function App() {
  const [phone, setPhone] = useState('');

  const onChangePhone = (phonenumber) => {
    setPhone(phonenumber)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <PhoneNumber phone={phone} onChangePhone={onChangePhone} />
      </header>
    </div>
  );
}

export default App;
