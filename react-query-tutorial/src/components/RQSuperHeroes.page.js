import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perfome side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  // 백그라운드에서 더 fetch 할 데이터가 있는지 -> isFetching
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    // cacheTime을 사용해서 캐시 데이터 유효시간 설정 가능 (default는 5분)
    // cacheTime vs staleTime, isLoading vs isFetching
    // https://velog.io/@yrnana/React-Query%EC%97%90%EC%84%9C-staleTime%EA%B3%BC-cacheTime%EC%9D%98-%EC%B0%A8%EC%9D%B4

    {
      // cacheTime: 5000,
      // staleTime: 3000,
      // polling
      // refetchInterval: 2000,
      // refetchIntervalInBackground를 사용해서 백그라운드에서 데이터 polling 가능
      // refetchIntervalInBackground: true,
      enabled: false,
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroes</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data?.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
