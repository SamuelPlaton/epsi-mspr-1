export interface HistoriqueCoupon {
  id: string;

  attributes: {
    usedTime: string,
  };

  relationships: {
    userCoupon: string
  };
}
