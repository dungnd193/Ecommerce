export interface IAdminLogin {
  username: string;
  password: string;
}

export interface IGetOrderInRangeTime {
  startDate: Date;
  endDate: Date;
  productId?: string;
}

export interface IImportedProductInRangeTime {
  startDate: Date;
  endDate: Date;
  productId?: string;
}

export interface IDataStatistic {
  date: string;
  quantity: number
}
export interface IImportedProductStatistic {
  date: string;
  quantity: number
}