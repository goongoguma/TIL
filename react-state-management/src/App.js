import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

// 상태 위로 올리기
// function Counter({ count, onIncrementClick }) {
//   return (
//     <button onClick={onIncrementClick} style={{ background: "pink" }}>
//       {count}
//     </button>
//   );
// }

// function CountDisplay({ count }) {
//   console.log("countDisplay clicked");
//   return (
//     <div style={{ background: "skyblue" }}>
//       The current counter count is {count}
//     </div>
//   );
// }

// function App() {
//   const [count, setCount] = useState(0);
//   const increment = () => setCount((c) => c + 1);
//   return (
//     <div style={{ background: "beige" }}>
//       <CountDisplay count={count} />
//       <Counter count={count} onIncrementClick={increment} />
//     </div>
//   );
// }

// 합성 컴포넌트

// function Header({ someState, onStateChange }) {
//   return <div>Header</div>;
// }
// function LeftNav({ children }) {
//   return <div>{children}</div>;
// }
// function MainContent({ children }) {
//   return <div>{children}</div>;
// }

// function App() {
//   const [someState, setSomeState] = React.useState("some state");
//   return (
//     <>
//       <Header
//         logo={<Logo someState={someState} />}
//         settings={<Settings onStateChange={setSomeState} />}
//       />
//       <LeftNav>
//         <SomeLink someState={someState} />
//         <SomeOtherLink someState={someState} />
//         <Etc someState={someState} />
//       </LeftNav>
//       <MainContent>
//         <SomeSensibleComponent someState={someState} />
//         <AndSoOn someState={someState} />
//       </MainContent>
//     </>
//   );
// }

// 컨텍스트 API

const CountContext = React.createContext();

function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error("Provider안에서 컨텍스트를 사용해주세요");
  }
  const [count, setCount] = context;
  const onIncrement = () => setCount((c) => c + 1);

  const obj = {
    count,
    setCount,
    onIncrement,
  };

  return obj;
}

function CountProvider(props) {
  const [count, setCount] = useState(0);
  const value = React.useMemo(() => [count, setCount], [count]);
  return <CountContext.Provider value={value} {...props} />;
}

function CountDisplay() {
  const { count } = useCount();
  return (
    <div style={{ background: "skyblue" }}>
      The current counter count is {count}
    </div>
  );
}

function Counter() {
  const { count, onIncrement } = useCount();

  return (
    <button onClick={onIncrement} style={{ background: "pink" }}>
      {count}
    </button>
  );
}

function App() {
  return (
    <div style={{ background: "beige" }}>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
