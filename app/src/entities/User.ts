interface User {
  id: string;

  attributes: {
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
    birthDate: string;
    phone?: number;
  };

  relationships: {
    store: Array<string>;
    coupon: Array<string>;
    usercoupon: Array<UserCoupon>;
  };
}

interface UserCoupon {
  id: string;

  attributes: {
    used: boolean;
    favored: boolean;
  };

  relationships: {
    user: Array<string>;
    coupon: Array<string>;
  };
}
