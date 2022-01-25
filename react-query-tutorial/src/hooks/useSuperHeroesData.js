import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
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
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name);
      //   return superHeroNames;
      // },
    }
  );
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes")
    //   // post 요청이후에 받아오는 response를 이용해 데이터를 업데이트 시킴으로써 invalidateQueries를 사용한 네트워크 요청을 하지 않아도 된다
    //   queryClient.setQueriesData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    // optimistic update란 에러가 발생하지 않는다는 전제하에 mutuate가 발생하기전 상태를 업데이트하는것을 말한다. 앱의 속도를 향상시킨다
    // onMutate는 mutate 함수가 실행되기 전에 실행되며 mutate 함수에서 받는 변수들을 받을 수 있다
    onMutate: async (newHero) => {
      // super-heroes refetch를 cancel
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueriesData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    // optimistic update에서 에러가 발생시
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    // mutation이 성공적인지 에러인지 알면 refetch
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
