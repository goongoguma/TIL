import React, { useCallback, useState } from 'react';
import './style/common.css';
import './style/findstay.css';

const useNumberHook = (number = 0) => {
  const [num, setNum] = useState(number);
  const increment = () => setNum(num + 1);
  const decrement = () => setNum(num === 0 ? 0 : num - 1);
  return [num, increment, decrement];
}

function App() {
  const [boxState, setBoxState] = useState({
    numberOpen: "",
    priceOpen: "",
    typeOpen: "",
    themeOpen: ""
  });

  // const [adultCount, increment, decrement] = useNumberHook(0)
  // const [childCount, increment, decrement] = useNumberHook(0)
  // const [babyCount, increment, decrement] = useNumberHook(0)

  const [numberState, setNumberState] = useState({
    adultCount: 0,
    childCount: 0,
    babyCount: 0
  });
  const [priceState, setPriceState] = useState(0);
  const [typeState, setTypeState] = useState('');
  const [themeState,setThemeState] = useState('')

  const handleBoxState = useCallback((state) => {
    switch (state) {
      case "number" :
        return setBoxState({numberOpen: "open", priceOpen: "", typeOpen: "", themeOpen: ""})
      case "price" : 
        return setBoxState({numberOpen: "", priceOpen: "open", typeOpen: "", themeOpen: ""})
      case "type" : 
        return setBoxState({numberOpen: "", priceOpen: "", typeOpen: "open", themeOpen: ""})
      case "theme" :
        return setBoxState({numberOpen: "", priceOpen: "", typeOpen: "", themeOpen: "open"})
      default:
        return setBoxState({numberOpen: "", priceOpen: "", typeOpen: "", themeOpen: ""})
    }  
  })

    const handleNumberState = useCallback((gen, state) => {
      if (gen === "adult" && state === "minus" && numberState.adultCount > 0) {
        setNumberState(prevState => {
          return {
            adultCount: prevState.adultCount - 1,
            childCount: prevState.childCount,
            babyCount: prevState.babyCount
          }
        }) 
      }
      if (gen === "adult" && state === "plus") {
        setNumberState(prevState => {
          return {
            adultCount: prevState.adultCount + 1,
            childCount: prevState.childCount,
            babyCount: prevState.babyCount
          }
        }) 
      }
      if (gen === "child" && state === "minus" && numberState.childCount > 0) {
        setNumberState(prevState => {
          return {
            adultCount: prevState.adultCount,
            childCount: prevState.childCount - 1,
            babyCount: prevState.babyCount
          }
        }) 
      }
      if (gen === "child" && state === "plus") {
        setNumberState(prevState => {
          return {
            adultCount: prevState.adultCount,
            childCount: prevState.childCount + 1,
            babyCount: prevState.babyCount
          }
        }) 
      }
      if (gen === "baby" && state === "minus" && numberState.babyCount > 0) {
        setNumberState(prevState => {
          return {
            adultCount: prevState.adultCount,
            childCount: prevState.childCount,
            babyCount: prevState.babyCount - 1
          }
        }) 
      }
      if (gen === "baby" && state === "plus") {
        setNumberState(prevState => {
          return {
            adultCount: prevState.adultCount,
            childCount: prevState.childCount,
            babyCount: prevState.babyCount + 1
          }
        }) 
      }
    })

  const { numberOpen, priceOpen, typeOpen, themeOpen } = boxState;
  const { adultCount, childCount, babyCount } = numberState;

  return (
    <div id="contents">
      <div className="container sub_title">
        <div className="tit">FIND STAY</div>
        <div className="txt">머무는 것 자체로 여행이 되는 공간</div>
      </div>

      <div className="container findstay_filter">
		<div className="flist_sorting">
			<div className="row">
				<div className="sel_stay">
					<div className="cate_stay">
						<div className="tit">국내</div>
						<ul>
							<li><a href="" className="active">전체</a></li>
							<li><a href="">제주</a></li>
							<li><a href="">서울</a></li>
							<li><a href="">경기</a></li>
							<li><a href="">강원</a></li>
							<li><a href="">충청</a></li>
							<li><a href="">부산</a></li>
							<li><a href="">경상</a></li>
							<li><a href="">전라</a></li>
							<li><a href="">대전</a></li>
							<li><a href="">대구</a></li>
						</ul>
					</div>
					<div className="cate_stay">
						<div className="tit">해외</div>
						<ul>
							<li><a href="" className="active">전체</a></li>
							<li><a href="">호치민</a></li>
							<li><a href="">나트랑</a></li>
							<li><a href="">다낭</a></li>
							<li><a href="">방콕</a></li>
							<li><a href="">타이페이시티</a></li>
						</ul>
					</div>
				</div>

				<div className="sel_map">
					<div className="switch-box">
						<label className="switch"><input type="checkbox" /><span className="slider"><em className="txt">지도로 보기</em></span></label>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="btn_layer">
					<button type="button" className="btn_select open" onClick={() => handleBoxState("number")}>
            인원
          </button>
				</div>
				<div className="btn_layer">
					<button type="button" className="btn_select" onClick={() => handleBoxState("price")}>가격 범위</button>
				</div>
				<div className="btn_layer">
					<button type="button" className="btn_select" onClick={() => handleBoxState("type")}>스테이 유형</button>
				</div>
				<div className="btn_layer">
					<button type="button" className="btn_select" onClick={() => handleBoxState("theme")}>디자인 투어 외 2건</button>
				</div>
			</div>

			<div className="layer_wrap">
				<div id="selectNumber" className={`layer_select number ${numberOpen}`}>
					<button type="button" className="btn_close" onClick={handleBoxState}>닫기</button>
					<div className="tit">Number</div>
					<dl>
						<dt><span>Adult</span></dt>
						<dd>
							<div className="number_count">
								<button type="button" className="btn_minus" onClick={() => handleNumberState("adult", "minus")}>minus</button>
								<span className="input-num"><input type="number" value={adultCount} /></span>
								<button type="button" className="btn_plus" onClick={() => handleNumberState("adult", "plus")}>plus</button>
							</div>
						</dd>
						<dt><span>Child<small>24개월~12세</small></span></dt>
						<dd>
							<div className="number_count">
								<button type="button" className="btn_minus" onClick={() => handleNumberState("child", "minus")}>minus</button>
								<span className="input-num"><input type="number" value={childCount} /></span>
								<button type="button" className="btn_plus" onClick={() => handleNumberState("child", "plus")}>plus</button>
							</div>
						</dd>
						<dt><span>Baby<small>24개월 미만</small></span></dt>
						<dd>
							<div className="number_count">
								<button type="button" className="btn_minus" onClick={() => handleNumberState("baby", "minus")}>minus</button>
								<span className="input-num"><input type="number" value={babyCount} /></span>
								<button type="button" className="btn_plus" onClick={() => handleNumberState("baby", "plus")}>plus</button>
							</div>
						</dd>
					</dl>
				</div>

				<div id="selectPrice" className={`layer_select price ${priceOpen}`}>
					<button type="button" className="btn_close" onClick={handleBoxState}>닫기</button>
					<div className="tit">가격 범위</div>
					<div className="price_wrap pc_only">
						<div className="price_slid">
							<div className="slid_rail"></div>
							<div className="slid_track" style={{left: '10%', width: '50%'}}></div>
							<div className="slid_handle" style={{left: '10%'}}></div>
							<div className="slid_handle" style={{left: '60%'}}></div>
						</div>
						<div className="price_input">
							<div className="input">
								<small>최저요금</small>
								<span><input type="number" value="" />원</span>
							</div>
							<div className="input">
								<small>최고요금</small>
								<span><input type="number" value="" />원</span>
							</div>
						</div>
					</div>
					<div className="price_wrap mo_only">
						<ul className="check_list">
							<li>
								<label className="check_skin"><input type="checkbox" /><span>~50,000원</span></label>
							</li>
							<li>
								<label className="check_skin"><input type="checkbox" /><span>100,000원</span></label>
							</li>
							<li>
								<label className="check_skin"><input type="checkbox" /><span>150,000원</span></label>
							</li>
							<li>
								<label className="check_skin"><input type="checkbox" /><span>200,000원</span></label>
							</li>
							<li>
								<label className="check_skin"><input type="checkbox" /><span>250,000원</span></label>
							</li>
							<li>
								<label className="check_skin"><input type="checkbox" /><span>300,000원~</span></label>
							</li>
						</ul>
						<div className="price_minmax">
							<div className="min">
								<small>최저요금</small>
								<div className="number_count">
									<button type="button" className="btn_minus">빼기</button>
									<span className="input-num"><input type="text" value="15만원" /></span>
									<button type="button" className="btn_plus">더하기</button>
								</div>
							</div>
							<div className="max">
								<small>최고요금</small>
								<div className="number_count">
									<button type="button" className="btn_minus">빼기</button>
									<span className="input-num"><input type="text" value="20만원" /></span>
									<button type="button" className="btn_plus">더하기</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="selectType" className={`layer_select type ${typeOpen}`}>
					<button type="button" className="btn_close" onClick={handleBoxState}>닫기</button>
					<div className="tit">스테이 유형</div>
					<ul className="check_list">
						<li>
							<label className="check_skin"><input type="checkbox" /><span>전체</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>게스트하우스</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>렌탈 하우스</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>디자인 펜션</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>한옥 스테이</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>부티크 호텔</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>돌집 스테이</span></label>
						</li>
					</ul>
				</div>

				<div id="selectTheme" className={`layer_select theme ${themeOpen}`}>
					<button type="button" className="btn_close" onClick={handleBoxState}>닫기</button>
					<div className="tit">테마</div>
					<ul className="check_list">
						<li>
							<label className="check_skin"><input type="checkbox" /><span>전체</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>디자인투어</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>사색</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>가족여행</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>도심 속 휴식</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>정적인 휴식</span></label>
						</li>
						<li>
							<label className="check_skin"><input type="checkbox" /><span>커플 여행</span></label>
						</li>
					</ul>
				</div>
			</div>
			<button type="button" className="btn_reset">초기화</button>
		</div>
	</div>
    

     </div>
  );
}

export default App;
