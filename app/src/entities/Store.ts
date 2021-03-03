export interface Store {
  id: string;

  attributes: {
    localization: string;
    name: string;
  };

  relationships: {
    users: string[];
    coupons: string[];
  };
}
