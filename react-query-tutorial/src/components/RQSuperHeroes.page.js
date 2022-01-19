import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  // 백그라운드에서 더 fetch 할 데이터가 있는지 -> isFetching
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    // cacheTime을 사용해서 캐시 데이터 유효시간 설정 가능 (default는 5분)
    // cacheTime vs staleTime, isLoading vs isFetching
    // https://velog.io/@yrnana/React-Query%EC%97%90%EC%84%9C-staleTime%EA%B3%BC-cacheTime%EC%9D%98-%EC%B0%A8%EC%9D%B4

    {
      // cacheTime: 5000,
      staleTime: 3000,
      // polling
      refetchInterval: 2000,
      // refetchIntervalInBackground를 사용해서 백그라운드에서 데이터 polling 가능
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroes</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
