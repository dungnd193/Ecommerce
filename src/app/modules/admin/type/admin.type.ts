export interface IAdminLogin {
  username: string;
  password: string;
}

export interface IGetOrderInRangeTime {
  startDate: Date;
  endDate: Date;
  productId?: string;
}

export interface IDataStatistic {
  date: string;
  quantity: number
}