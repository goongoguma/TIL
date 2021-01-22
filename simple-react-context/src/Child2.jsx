import React, { useContext } from 'react';
import { NameContext, ObjContext } from './App';

function Child2() {
  const name = useContext(NameContext);
  const obj = useContext(ObjContext);
  return (
    <div>
      <h1>{name} from  Child2</h1> 
      {console.log(obj)}
      {/* Jay from Child2 */}
    </div>
  )
};

export default Child2;
