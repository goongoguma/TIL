import * as React from 'react';
import '../style/main.scss';
import { inject, observer } from 'mobx-react';
import { IListMainItem, IMainStoreImpl } from '../store/interface';
import Carousel from 'react-bootstrap/Carousel';

interface IMainSubItem {
  description: string;
  image: string;
  title: string;
}

interface IMainSubItems {
  type: string;
  fields: IMainSubItem
}

export const MainComponent: React.FC<any> = (props: any) => {

  const { store: { mainData, mainSubData } } = props;
  const screenWidth = props.screenWidth
  const [subImage0, setSubImage0] = React.useState(true);
  const [subImage1, setSubImage1] = React.useState(false);
  const [subImage2, setSubImage2] = React.useState(false);

  const mainSubDataArr = mainSubData.map((item: IMainSubItems) => item.fields);

  const clickMainSubImage = (i: number) => {
    if (i === 0) {
      setSubImage0(true)
      setSubImage1(false)
      setSubImage2(false)
    } 
    if (i === 1) {
      setSubImage1(true)
      setSubImage0(false)
      setSubImage2(false)
    }
    if (i === 2) {
      setSubImage2(true)
      setSubImage0(false)
      setSubImage1(false)
    }
  }

  const setChecked = (i: number) => {
    if(i === 0) {
      return subImage0
    }
    if(i === 1) {
      return subImage1
    }
    if(i === 2) {
      return subImage2
    }
  }

  const mainSubDivider = () => {
    if (screenWidth < 1147) {
      return (
        mainSubDataArr.map((item: IMainSubItem, i: number) => (
          <div className={`main-sub-wrapper-sm-${i}`}>
            <div className={`main-sub-content-image-cover`}>
              <div className={`main-sub-content-image-sm-${i}`} style={{backgroundImage: `url(${item.image})`}} />
            </div>
              {/* <img src={item.image} className={`main-sub-content-image-sm-${i}`} /> */}
              <div className={`main-sub-content-article-${i}-sm`}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
          </div>
        ))
      )
    }

    return (
      mainSubDataArr.map((item: IMainSubItem, i: number) => (
        <React.Fragment key={item.title}>
          <input className={`slide-${i}-btn`} type="checkbox" id={`slide-${i}-btn`} checked={setChecked(i)} />
          <label htmlFor={`slide-${i}-btn`} onMouseEnter={() => clickMainSubImage(i)} className={`main-sub-article-${i}`}>
            <img src={item.image} className='main-sub-content-image'/>
          </label>
          <div className={`main-sub-content-article-${i}`}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </React.Fragment>
      ))
    )
  }

  return (
    <div className='main-picture-slide'>
      <Carousel interval={null} controls={false} indicators={false}>
        {
          mainData.map((item: IListMainItem, i: number) => (
            <Carousel.Item key={item.title}>
            <div
              className={`slide-image`}
              style={{backgroundImage: `url(${mainData[i].image})`}}
            />
            <Carousel.Caption>
              {/* <h3>{item.title}</h3>
              <p>{item.description}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          ))
        }
      </Carousel>
        <div className='main-sub-container'>
          {mainSubDivider()}
        </div>
    </div>
  )
}

