import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// addEventListener 사용
// https://medium.com/@ghur2002/react%EC%97%90%EC%84%9C-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-128d64ea24b5

function App() {
  const [passengers, setPassengers] = useState([]);
  const bottomRef = useRef(null);
  const page = useRef(1);
  const isLoading = useRef(false);

  const getData = async () => {
    isLoading.current = !isLoading.current;
    const { data } = await getMorePassengerInfo(page.current);
    setPassengers(prev => [...prev, ...data.data]);
      page.current += 1;
  };

  const infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement .scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      isLoading.current = !isLoading.current;
      getData();
    };
  };

  useEffect(() => {
    getData();
    window.addEventListener("scroll", infiniteScroll, true);
  }, []);

  return (
    <div className="container" style={{padding: "30px"}}>
      <div className="lists">
        {
          passengers.map((passenger, idx) => {
            const { airline, name, trips } = passenger;
              return (
                <div className="container" style={{border: "1px solid black", padding: "20px"}} key={idx}>
                  <div className="list">
                    <h4>User Info</h4>
                    <p>name: {name}</p>
                    <p>trips: {trips}</p>
                    <h4>Airline Info</h4>
                    <p>name: {airline.name}</p>
                    <p>country: {airline.country}</p>
                    <p>established: {airline.established}</p>
                    <p>head quarter: {airline.head_quarters}</p>
                    <p>website: {airline.website}</p>
                  </div>
                </div>
              )
            })
        }
      </div>
      <div ref={bottomRef} />
      {isLoading.current && <div>Loading...</div>}
    </div>
  );
};

const getMorePassengerInfo = async (page) => {
  return await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
};

export default App;
