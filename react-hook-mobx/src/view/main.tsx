import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainComponent } from '../components/mainComponent';
import { IMainStoreImpl } from '../store/interface';
import { withHeader } from '../share/withHeader';
import '../style/share.scss';

const MainContainer: React.FC<{}> = withHeader(MainComponent, 'MainStore');

const Main: React.FC<{ MainStore: IMainStoreImpl }> = (props) =>  {

  const mainStore = props.MainStore;

  React.useEffect(() => {
    mainStore.fetchData();
  }, [])
  
  return (
    <MainContainer />
  )
}

export default inject('MainStore', 'ShareStore')(observer(Main))