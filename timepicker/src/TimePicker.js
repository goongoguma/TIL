import React, { useEffect, useState } from "react";

const TimePicker = () => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
  });
  const [meridiem, setMeridiem] = useState("AM");

  useEffect(() => {
    setTime({
      hour: 2,
      minute: 30,
    });
  }, []);

  const onClickAddHour = () => {
    setTime((prevState) => ({
      ...prevState,
      hour: prevState.hour === 12 ? 0 : prevState.hour + 1,
    }));
  };

  const onClickMinusHour = () => {
    setTime((prevState) => ({
      ...prevState,
      hour: prevState.hour === 0 ? 12 : prevState.hour - 1,
    }));
  };

  const onClickAddMinute = () => {
    setTime((prevState) => ({
      ...prevState,
      minute: prevState.minute === 59 ? 0 : prevState.minute + 1,
    }));
  };

  const onClickMinusMinute = () => {
    setTime((prevState) => ({
      ...prevState,
      minute: prevState.minute === 0 ? 59 : prevState.minute - 1,
    }));
  };

  const onChangeHour = (e) => {
    if (parseInt(e.target.value) > 12 && e.target.value.length > 2) {
      return;
    }
    setTime((prevState) => ({
      ...prevState,
      hour: parseInt(e.target.value),
    }));
  };

  const onChangeMinute = (e) => {
    if (parseInt(e.target.value) > 59 && e.target.value.length > 2) {
      return;
    }
    setTime((prevState) => ({
      ...prevState,
      minute: parseInt(e.target.value),
    }));
  };

  const onChangeMeridiem = () => {
    if (meridiem === "AM") {
      setMeridiem("PM");
    } else {
      setMeridiem("AM");
    }
  };

  return (
    <div
      style={{
        background: "royalblue",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: "10px" }}>
        <button onClick={onClickAddHour}>up</button>
        <div style={{ padding: "10px" }}>
          <input
            value={
              time.hour.toString().length === 1 ? `0${time.hour}` : time.hour
            }
            onChange={onChangeHour}
          />
        </div>
        <button onClick={onClickMinusHour}>down</button>
      </div>
      <div style={{ padding: "10px" }}>
        <button onClick={onClickAddMinute}>up</button>
        <div style={{ padding: "10px" }}>
          <input
            value={
              time.minute.toString().length === 1
                ? `0${time.minute}`
                : time.minute
            }
            onChange={onChangeMinute}
          />
        </div>
        <button onClick={onClickMinusMinute}>down</button>
      </div>
      <div style={{ padding: "10px" }}>
        <button onClick={onChangeMeridiem}>up</button>
        <div style={{ padding: "10px" }}>{meridiem}</div>
        <button onClick={onChangeMeridiem}>down</button>
      </div>
    </div>
  );
};

export default TimePicker;
