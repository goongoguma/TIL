import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectDate from './SelectDate';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
import moment from 'moment';
import './../App.css';

function Graph() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');
  const [noShow, setNoShow] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const formatStartDate = moment(dateRange.startDate).format('YYYY-MM-DD');
  const formatEndDate = moment(dateRange.endDate).format('YYYY-MM-DD');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (country) {
        const res = await axios.get(`https://api.covid19api.com/total/country/${country}/status/confirmed?from=${formatStartDate}&to=${formatEndDate}`);
        setData(res.data);
        setNoShow(false)
      } else {
        alert('No blank')
      }
    } catch (error) {
      alert('no data')
    }
  };

  const handleReset = () => {
    setCountry('');
    setDateRange({startDate: null, endDate: null});
    setNoShow(true);
  };

  return (
    <div id='container'>
      {/* <h1>Covid-19 Graph</h1> */}
      <div className='wrapper'>
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
            <button type='submit'>Search</button>
            <button onClick={handleReset}>RESET</button>
          </form>
        </div>
        <SelectDate dateRange={dateRange} setDateRange={setDateRange} />
      </div>
        <div className={noShow ? 'hide-graph-container' : 'show-graph-container'}>
          <BarChart width={1180} height={400} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey="Date" tickFormatter={timeStr => moment(timeStr).format('YYYY-MM-DD')} stroke='#f2f4f5'/>
            <YAxis stroke='#f2f4f5' />
            <Tooltip tickFormatter={timeStr => moment(timeStr).format('YYYY-MM-DD')}/>
            <Legend />
            <Bar dataKey='Cases' fill='#494949' />
          </BarChart>
        </div>
    </div>
  )
}

export default Graph;
