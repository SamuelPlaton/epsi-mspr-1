interface Coupon {
  id: string;

  attributes: {
    start: number;
    end: number;
    offre: string;
    icon?: string;
    description: string;
    limite: number;
    unique: boolean;
    code: string;
  };

  relationships: {
    user: Array<string>;
    coupon: Array<string>;
  };
}
