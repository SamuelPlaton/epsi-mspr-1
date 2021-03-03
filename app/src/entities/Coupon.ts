export interface Coupon {
  id: string;

  attributes: {
    start: Date;
    end: Date;
    offer: string;
    icon?: string;
    description?: string;
    limit: number;
    unique: boolean;
    code: string;
  };

  relationships: {
    users: string[];
    stores: string[];
  };
}
