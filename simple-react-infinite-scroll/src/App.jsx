import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// intersection observer를 사용
// https://www.youtube.com/watch?v=QOWq3_zpOK4&t=531s
// https://heropy.blog/2019/10/27/intersection-observer/]

function App() {
  const [passengers, setPassengers] = useState([]);
  const bottomRef = useRef(null);
  const page = useRef(1);
  const isLoading = useRef(false);

  const scrollCallback = async (entries) => {
    isLoading.current = !isLoading.current;
    if (entries[0].isIntersecting) {
      isLoading.current = !isLoading.current;
      const { data } = await getMorePassengerInfo(page.current);
      setPassengers((prev) => [...prev, ...data.data]);
      page.current += 1;
    }
  };

  useEffect(() => {
    const { current } = bottomRef;
    const observer = new IntersectionObserver(scrollCallback, {
      root: null,
      threshold: 1,
    });
    observer.observe(current);
    return () => {
      observer.disconnect(current);
    };
  }, [bottomRef.current]);

  return (
    <div className="container" style={{ padding: "30px" }}>
      <div className="lists">
        {passengers.map((passenger, idx) => {
          const { airline, name, trips } = passenger;
          return (
            <div
              className="container"
              style={{ border: "1px solid black", padding: "20px" }}
              key={idx}
            >
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
          );
        })}
      </div>
      <div ref={bottomRef} />
      {isLoading.current && <div>Loading...</div>}
    </div>
  );
}

const getMorePassengerInfo = async (page) => {
  return await axios.get(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
  );
};

export default App;
