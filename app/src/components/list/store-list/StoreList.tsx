import React, {FunctionComponent} from 'react';
import {View, Text, ScrollView} from "react-native";
import {Store} from "../../../entities";

/* Coupon List Props
*   coupons: The coupons array component
 */
export interface Props {
  stores: Array<Store>;
}

/**
 * The react coupon list component.
 */
const StoreList: FunctionComponent<Props> = ({stores}) => {

  return (
    <View>
      {stores.map(store => console.log(store))}
      {/* {stores.map(store => console.log(store.id))} */}
    </View>
  );
}

export default StoreList;