export interface UserCoupon {
  id: string;

  attributes: {
    used: boolean;
    favored: boolean;
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
  };

  relationships: {
    stores: string[];
    coupon: UserCoupon[];
  };
}
