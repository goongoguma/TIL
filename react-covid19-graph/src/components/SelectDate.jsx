import React, { useState } from 'react';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";

function SelectDate({ dateRange, setDateRange }) {
  const [focus, setFocus] = useState(null);
  const { startDate, endDate } = dateRange;

  const handleChangeDate = date => {
    setDateRange(date);
  };

  return (
    <div className='date-container'>
      <DateRangePicker 
        startDatePlaceholderText={'Start Date'}
        startDate={startDate}
        startDateId="startDate"
        onDatesChange={(date) => handleChangeDate(date)}
        endDatePlaceholderText={'End Date'}
        endDateId="endDate"
        endDate={endDate}
        weekDayFormat="ddd"
        focusedInput={focus}
        transitionDuration={0}
        isOutsideRange={() => false}
        displayFormat='YYYY.MM.DD'
        hideKeyboardShortcutsPanel
        isOutsideRange={day => isInclusivelyAfterDay(day, moment().add(1, 'days'))}
        onFocusChange={focusedInput => {
          setFocus(focusedInput);
        }}
      />
    </div>
  )
}

export default SelectDate
