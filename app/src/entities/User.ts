export interface UserCoupon {
  id: string;

  attributes: {
    used: number;
    favored: string;
  };

  relationships: {
    user: string;
    coupon: string;
  };
}


export interface User {
  id: string;

  attributes: {
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    token?: string;
    registerDate?: string;
  };

  relationships: {
    stores: string[];
    coupons: UserCoupon[];
  };
}
