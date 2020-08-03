import React, {useEffect} from 'react'

const  ChildComponent = (props) => {

  useEffect(() => {
    props.fetchData('users')
  }, [props.fetchData]);
  
  return (
    <div>
      <h2>{props.title}</h2>
      Child Component!
    </div>
  )
}

// string, number와 같은 primitive value값의 경우 React.memo를 이용해 재렌더링 되는 문제를 해결할 수 있다
// 배열이나 객체는 useMemo로 감싸주고 props로 전달해줘야 자식 컴포넌트가 재렌더링 되지 않는다. 두번째로 부모컴포넌트 밖에 array1 변수를 선언하는 방법이 있음(권장)
// 함수를 props로 내려준다 -> 자식컴포넌트에서 계속해서 실행되는 props 함수를 멈추고 싶다 -> useCallback 사용
export default React.memo(ChildComponent);
