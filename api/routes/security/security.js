import { sqlInstance } from '../../index.js';

export async function checkToken(token, id) {
  return await sqlInstance.request('SELECT * FROM USER WHERE TOKEN = ? AND ID = ?', [token, id]).then(result => {
    return result.length > 0;
  });
}

export async function checkUserCoupon(idUser, idCoupon) {
  return await sqlInstance.request('SELECT * FROM USER_COUPON WHERE USER = ? AND COUPON = ?', [idUser, idCoupon]).then(result => {
    return result.length > 0;
  });
}

export async function checkUsedCoupon(idUser, idCoupon) {
  return await sqlInstance.request('SELECT * FROM USER_COUPON WHERE USER = ? AND COUPON = ? AND USED > 0', [idUser, idCoupon]).then(result => {
    return result.length > 0;
  });
}
export async function checkUniqueCoupon(idCoupon) {
  return await sqlInstance.request('SELECT * FROM COUPON C WHERE C.ID = ? AND C.UNIQUE = 1', [idCoupon]).then(result => {
    return result.length > 0;
  });
}

export async function checkMaxLimitCoupon(idCoupon) {
  return await sqlInstance.request('SELECT C.MAX_LIMIT FROM COUPON C WHERE C.ID = ?', [idCoupon]).then(result => {
    return result[0]['MAX_LIMIT'];
  });
}

export async function checkSumCoupon(idCoupon) {
  return await sqlInstance.request('SELECT SUM(USED) AS TOTAL FROM USER_COUPON WHERE COUPON = ?', [idCoupon]).then(result => {
    return result[0]['TOTAL'];
  });
}