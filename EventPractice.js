import React, {Component} from 'react';
import './ValidationSample.css';

class EventPractice extends Component {
//   state= {
//     message: '' //1
//   }
//   handleChange= (e) => {
//     this.setState({
//       message: e.target.value //2
//     })
//   }
//   handleClick= () => { //3 
//     alert(this.state.message);
//     this.setState({
//       message: ''
//     });
//   }
//  render() {
//    return (
//      <div>
//      <h1>이벤트 연습</h1>
//      <input type='text' name='message' placeholder='입력하세요' value={this.state.message} onChange={this.handleChange} />
//      <button onClick={this.handleClick}>확인</button>
//      </div>
//    )
//  }
      // state = {
      //   saltwater: '',
      //   speed1: '',
      //   speed2:''
      // }
            
      // inputType1 = (e) => {
      //   this.setState({
      //     saltwater:e.target.value,
      //   });
      // }
      // inputType2 = (e) => {
      //   this.setState({
      //     speed1:e.target.value,
      //   });
      // }
      // inputType3 = (e) => {
      //   this.setState({
      //     speed2:e.target.value,
      //   });
      // }
      // clickVerify = () => {
      //   this.state.saltwater === '100g' ? alert('정답입니다.')  : this.setState({saltwater: ''})
      // }
      // clickVerify1 = () => {
      //   this.state.speed1 === '15km' ? alert('정답입니다.') : this.setState({speed1: ''})
      // }
      // clickVerify2 = () => {
      //   this.state.speed2 === '1km' ? alert('정답입니다.') :  this.setState({speed2: ''})  
      // }

      // render() {
      //   return(
      //     <div>
      //     <h1>수학문제</h1>
      //     <h3>알맞은 답을 빈칸에 입력하시오</h3>
      //     <p>9% 소금물 200 g에 6% 소금물을 넣어 8% 소금물을 만들려고 한다.<br/> 6%의 소금물을 몇 g 넣어야 할까?</p>
      //     <input type='text' name='saltwater' value={this.state.saltwater} onChange={this.inputType1} />
      //     <button onClick={this.clickVerify}>답변제출</button>

      //     <p>현진이는 버스 정류장에서 16 km 떨어진 학교에 가는 데 처음에는 시속50 km로 일정하게 달리는 버스를 타고 가다가 버스에서 내려 시속 5 km로 걸어 갔더니 총 30분이 걸렸다. 
      //     현진이가 버스를 타고 간 거리와 걸어간거리를 각각 구하여라.<br/>(단, 버스에서 내리는데 걸린 시간은 무시한다.)</p>
      //     <input type='text' name='speed1' value={this.state.speed1} onChange={this.inputType2} placeholder='버스 거리'/>
      //     <button onClick={this.clickVerify1}>답변제출</button>
        
      //     <input type='text' name='speed2' value={this.state.speed2} onChange={this.inputType3} placeholder='걸어간 거리'/>
      //     <button onClick={this.clickVerify2}>답변제출</button>
      //     </div>
      //   )
      // }
      state = {
        saltwater: '',
        speed1: '',
        speed2:'',
        varify1: false,
        varify2: false,
        varify3: false
      }
            
      inputType = (e) => {
        this.setState({
          [e.target.name]:e.target.value,
        });
      }
      
      clickVerify = () => {
        this.state.saltwater === '100g' ? alert('정답입니다.')  : this.setState({saltwater: ''})
        this.setState({
          varify1: true
        })
      }
      clickVerify1 = () => {
        this.state.speed1 === '15km' ? alert('정답입니다.') : this.setState({speed1: ''})
        this.setState({
          varify2: true
        })
      }
      clickVerify2 = () => {
        this.state.speed2 === '1km' ? alert('정답입니다.') :  this.setState({speed2: ''})  
        this.setState({
          varify3: true
        })
      }

      handleKeyPress = (e) => {
        if(e.key === 'Enter') {
          this.clickVerify();
         }
      }
      handleKeyPress1 = (e) => {
        if(e.key === 'Enter') {
          this.clickVerify1();
          }
      }
      handleKeyPress2 = (e) => {
        if(e.key === 'Enter') {
          this.clickVerify2();
         }
      }

      render() {
        return(
          <div>
          <h1>수학문제</h1>
          <h3>알맞은 답을 빈칸에 입력하시오</h3>
          <p>9% 소금물 200 g에 6% 소금물을 넣어 8% 소금물을 만들려고 한다.<br/> 6%의 소금물을 몇 g 넣어야 할까?</p>
          <input type='text' name='saltwater' value={this.state.saltwater} onChange={this.inputType} onKeyPress={this.handleKeyPress} 
          className={this.state.varify1 ? (this.state.saltwater ? 'success' : 'failure') : ''}/>
          <button onClick={this.clickVerify}>답변제출</button>

          <p>현진이는 버스 정류장에서 16 km 떨어진 학교에 가는 데 처음에는 시속50 km로 일정하게 달리는 버스를 타고 가다가 버스에서 내려 시속 5 km로 걸어 갔더니 총 30분이 걸렸다. 
          현진이가 버스를 타고 간 거리와 걸어간거리를 각각 구하여라.<br/>(단, 버스에서 내리는데 걸린 시간은 무시한다.)</p>
          <input type='text' name='speed1' value={this.state.speed1} onChange={this.inputType} onKeyPress={this.handleKeyPress1} placeholder='버스 거리'
          className={this.state.varify2 ? (this.state.speed1 ? 'success' : 'failure') : ''}/>
          <button onClick={this.clickVerify1}>답변제출</button>
        
          <input type='text' name='speed2' value={this.state.speed2} onChange={this.inputType} onKeyPress={this.handleKeyPress2} placeholder='걸어간 거리'
          className={this.state.varify3 ? (this.state.speed2 ? 'success' : 'failure') : ''}/>
          <button onClick={this.clickVerify2}>답변제출</button>
          </div>
        )
      }
}

export default EventPractice