interface Store {
  id: string;

  attributes: {
    localization: string;
    name: string;
  };

  relationships: {
    user: Array<string>;
    coupon: Array<string>;
  };
}
