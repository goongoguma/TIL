import React, { useContext } from 'react';
import { useNameContext, useObjContext } from './App';

function Child2() {
  return (
    <div>
      <h1>{useNameContext()} from  Child2</h1> 
      {console.log(useObjContext())}
      {/* Jay from Child2 */}
    </div>
  )
};

export default Child2;
