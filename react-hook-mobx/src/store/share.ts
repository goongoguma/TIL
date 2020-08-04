import { observable, action } from 'mobx';
import { toJS } from 'mobx';

class ShareStore {
  @observable
  menuOpen: boolean = false;
  @observable
  screenWidth!: number;

  @action
  setMenuFalse = () => {
    return this.menuOpen = false;
  }

  @action
  setMenuStatus = () => {
    return this.menuOpen = !this.menuOpen
  }

  // resizeObserver를 이용하면 @action은 사용안해도 브라우저가 사이즈 변경을 읽는다.
  setWindowSize = () => {
    const div = document.getElementById('root') as Element

    const resize = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        this.screenWidth = entry.contentRect.width;
      })
    });
  
    resize.observe(div)
  }

  get menuStatus() {
    return this.menuOpen
  }

  get windowWidth() {
    return this.screenWidth
  }
}

const shareStore = new ShareStore(); 
export default shareStore;