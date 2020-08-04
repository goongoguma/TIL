import * as React from 'react';
import { inject, observer } from 'mobx-react';

const useOutsideClick = (ref: any, setMenuFalse: () => void) => {
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setMenuFalse()
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const OutSideClick: React.FC<any> = (props) => {
  const wrapperRef = React.useRef(null);
  const setMenuFalse = props.ShareStore.setMenuFalse;
  useOutsideClick(wrapperRef, setMenuFalse);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default inject('ShareStore')(observer(OutSideClick))