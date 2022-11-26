export interface ProfileModel {
  country: string;
  dateOfBirth: string;
  firstName: string;
  identityNumber: string;
  lastName: string;
  phoneNumber: string;
  updateDate: string;
}

export interface ProfileResponseModel {
  code: number;
  message: string;
  me: ProfileModel;
}

export interface BalancesModel {
  assetCode: string;
  availableAmount: number;
  availableAmountTRYValue: number;
}

export interface BalancesResponseModel {
  code: number;
  message: string;
  balances: BalancesModel[];
}

export interface OpenOrdersModel {
  marketCode: string;
  orderSide: string;
  orderDate: string;
  price: number;
  orderAmount: number;
  fillAmount: number;
}

export interface OpenOrdersResponseModel {
  code: number;
  openOrders: OpenOrdersModel[];
  message: string;
}
