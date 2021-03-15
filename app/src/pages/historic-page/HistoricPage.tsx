import Api from "../../api/Api";
import {Coupon, HistoriqueCoupon, User, UserCoupon} from "../../entities";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {genericStyles} from "../../styles";
import {retrieveActiveUser} from "../../store/UserManager";
import { Table, Row, Rows } from 'react-native-table-component';
import moment from "moment";
import {orderBy} from 'lodash';

/**
 * The react coupons historic page.
 */

const HistoricPage: FunctionComponent = () => {

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);
  const [userCoupons, setUserCoupons] = useState<Array<UserCoupon>>(undefined);
  const [historiqueCoupons, setHistoriqueCoupons] = useState<Array<HistoriqueCoupon>>( []);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);

  // Setup our table data
  const tableHead = ['Coupon', 'Offre', 'Date'];
  const tableData = historiqueCoupons.map(hc => {
    const date = moment(hc.attributes.usedTime).locale('fr').format('L LT');
    const userCoupon = userCoupons.find(uc => uc.id === hc.relationships.userCoupon);
    const coupon = coupons.find(c => c.id === userCoupon.relationships.coupon);
    return [coupon.attributes.title, coupon.attributes.offer, date]
  });

  const getData = async () => {
    if(!activeUser){
      retrieveActiveUser().then(response => {
        setActiveUser(response);
        return response
      });
    }

    if(!activeUser || coupons){
      return;
    }
    const data = await Api.UsersApi.get(activeUser.id);
    setCoupons(data.coupons);
    setUserCoupons(data.userCoupons);
    setHistoriqueCoupons(orderBy(data.historiqueCoupons, function(u){
      return new Date(u.attributes.usedTime);
    }, "desc"));
  }

  useEffect(() => {
    getData();
  }, [activeUser]);

  const styles = StyleSheet.create({
    center: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  });

  return (
    <ScrollView>
      {( historiqueCoupons.length > 0) ? (
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6 }}/>
          <Rows data={tableData} textStyle={{ margin: 6 }}/>
        </Table>
      ) : (<Text style={{...genericStyles.subtitleText, ...styles.center}}>Vous n'avez pas encore utilisé de coupons</Text>)}
    </ScrollView>
  );
}
export default HistoricPage;
