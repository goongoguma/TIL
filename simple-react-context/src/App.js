import React, { createContext, useContext } from 'react';
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

export const useNameContext = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('No Name')
  };
  return context
};

export const useObjContext = () => {
  const context = useContext(ObjContext);
  if (!context) {
    throw new Error('No Obj')
  };
  return context
};

App.defaultProps = {
  name: 'Jay',
  obj: { foo: 1, bar: 2}
};

export default App;
