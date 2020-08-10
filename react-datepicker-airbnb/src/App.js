import React, { useState  } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function Datepicker() {
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [focus, setFocus] = useState(null);

  const { startDate, endDate } = dateRange;

  const handleOnDateChange = (startDate, endDate) =>
    setdateRange(startDate, endDate);

  return (
      <DateRangePicker
        startDatePlaceholderText="Start"
        startDate={startDate}
        startDateId="startDateMookh"
        onDatesChange={handleOnDateChange}
        endDatePlaceholderText="End"
        endDate={endDate}
        endDateId="endDateMookh"
        displayFormat="MMM D"
        focusedInput={focus}
        onFocusChange={focus => setFocus(focus)}
      />
  );
}

export default Datepicker;