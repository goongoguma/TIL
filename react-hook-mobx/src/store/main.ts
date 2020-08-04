import { observable, action, runInAction } from 'mobx';
import butter from '../api';
import { toJS } from 'mobx';
import { IMainList, IMainStoreImpl } from '../store/interface';

class MainStore {
  @observable data: any;

  @action
  fetchData = () => {
      butter.page.retrieve('*', 'ekko').then(res => this.data = res.data.data.fields)
  }
  
  get mainData() {
    return toJS(this.data.main).map((item: IMainList) => item.fields)
  }

  get mainSubData() {
    return toJS(this.data['main-sub'])
  }

  get memberData() {
    return toJS(this.data.member)
  }

  get servicesData() {
    return toJS(this.data.services)
  }

  get specialty() {
    return toJS(this.data.specialty)
  }
 
}

const mainStore = new MainStore(); 
export default mainStore;