import "./App.css";
import { useInfiniteQuery } from "react-query";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// useInfiniteQuery를 제대로 사용하기 위해서는 page, totalPage, perPage와 같이 페이지네이션 속성이 들어있는 데이터를 사용하는것이 좋음
// https://www.youtube.com/watch?v=4jMAnIIEI3M

const getData = async ({ pageParam = 1 }) => {
  const response = await await fetch(
    `https://reqres.in/api/users?page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

const App = () => {
  const limit = 10;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const bottomRef = useRef(null);
  const [page, setPage] = useState(1);
  const intersectionLoading = useRef(false);

  const { data, isSuccess, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery("posts", getData, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    });

  // const options = {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 1.0,
  // };

  // const callbackFunction = (entries) => {
  //   intersectionLoading.current = !intersectionLoading.current;
  //   const [entry] = entries;
  //   if (entry.isIntersecting) {
  //     intersectionLoading.current = !intersectionLoading.current;
  //   }
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFunction, options);
  //   observer.observe(bottomRef.current);
  //   return () => {
  //     observer.unobserve(bottomRef.current);
  //   };
  // }, [bottomRef.current]);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-item">
          <ul>
            {isSuccess &&
              data?.pages?.map((page) =>
                page.data.map((user) => {
                  return (
                    <li key={user.id}>
                      <p>firstName: {user.first_name}</p>
                      <p>lastName: {user.last_name}</p>
                      <p>email: {user.email}</p>
                      <p>avatar: {user.avatar}</p>
                    </li>
                  );
                })
              )}
            {isFetching && <p>Loading...</p>}
            {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default App;
