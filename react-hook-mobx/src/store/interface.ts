export interface IListMainItem {
  title: string;
  description: string;
  image?: string;
};

export interface IListMemberItem {
  name: string;
  intro: string;
  url: string;
  position: string;
};

export interface IListServiceItem {
  title: string;
  description: string;
  image: string;
  url: string;
};

export interface IMainList {
  type: string;
  fields: IListMainItem[];
};

export interface IMapMainList {
  fields: IListMainItem[];
}

export interface IMainSubList {
  type: string;
  fields: IListMainItem[];
};

export interface IMemberList {
  type: string;
  fields: IListMemberItem[];
};

export interface IServicesList {
  type: string;
  fields: IListServiceItem[];
};

export interface ISpecialtyList {
  type: string;
  fields: IListMainItem[];
};

export interface IMainStoreImpl {
  fetchData: () => void;
  // unknow은 타입체크를 한번 더 해줘야함
  data: unknown;
  topHeader: any;
  mainData: IListMainItem[];
  mainSubData: IMainSubList;
  memberData: IMemberList;
  servicesData: IServicesList;
  specialty: ISpecialtyList;
}
