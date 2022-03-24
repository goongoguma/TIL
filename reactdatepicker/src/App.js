import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import en from 'date-fns/locale/en-US';
registerLocale('en', en);

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale="en"
      showTimeSelect
      timeIntervals={1}
      dateFormat="yyyy/MM/dd HH:mm aa"
    />
  );
}

export default App;
