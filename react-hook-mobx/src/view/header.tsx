import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderComponent } from '../components/headerComponent';
import '../style/share.scss';

export const Header: React.FC<any> = (props) =>  {

  React.useEffect(() => {
    props.HeaderStore.fetchData();
  }, [])
  
  const screenWidth = props.ShareStore.screenWidth;
  const time = props.HeaderStore.topHeader?.time;
  const email = props.HeaderStore.topHeader?.email;
  
  return (
    <HeaderComponent time={time} email={email} screenWidth={screenWidth} />
  )
}

export default inject('HeaderStore', 'ShareStore')(observer(Header))