import * as React from 'react';
import Header from '../view/header';
import { inject, observer, Provider } from 'mobx-react';

const ShareStore = 'ShareStore';

const LoadingSpinner = () => (
  <div className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export const withHeader = (WrappedComponent: React.FC<any>, store: string) => inject(store, ShareStore)(observer((props: any) => {
  const { [`${store}`]: { data } } = props;

  return (
      data ? 
      <>
        <Header />
        <WrappedComponent store={props[`${store}`]} screenWidth={props.ShareStore.screenWidth} />
      </> 
      : <LoadingSpinner />
  )
}));
