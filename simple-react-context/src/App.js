import React, { createContext } from 'react';
import './App.css';
import Child1 from './Child1';
// https://www.youtube.com/watch?v=Hu5lB21Wf5k

export const NameContext = createContext();
export const ObjContext = createContext();

function App({ name, obj }) {
  return (
    <div>
      <NameContext.Provider value={name}>
        <ObjContext.Provider value={obj}>
          <Child1 />
        </ObjContext.Provider>
      </NameContext.Provider>
    </div>
  );
};

App.defaultProps = {
  name: 'Jay',
  obj: { foo: 1, bar: 2}
}

export default App;
