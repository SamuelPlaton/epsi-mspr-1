export interface Coupon {
  id: string;

  attributes: {
    start: Date;
    end: Date;
    title: string;
    offer: string;
    icon?: string;
    description?: string;
    maxLimit: number;
    unique: boolean;
    code: string;
    valid: number;
  };

  relationships: {
    users: string[];
    stores: string[];
  };
}
