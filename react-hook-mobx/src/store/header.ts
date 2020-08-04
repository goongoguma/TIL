import { observable, action } from 'mobx';
import butter from '../api';
import { toJS } from 'mobx';

class HeaderStore {
  @observable data: any;

  @action
  fetchData = () => {
      butter.page.retrieve('*', 'ekko').then(res => this.data = res.data.data.fields['top-header'])
  }

  get topHeader() {
    return toJS(this.data)
  }
 
}

const headerStore = new HeaderStore(); 
export default headerStore;