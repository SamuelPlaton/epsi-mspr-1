import React, {FunctionComponent} from 'react';
import {View, Text, ScrollView} from "react-native";
import {genericStyles} from "../../../styles";
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
// console.log("stores");
  return (
    <View>

    { stores.map( store => (
      <View>
        <Text>{store.attributes.name}</Text>
      </View>
    ))}
    </View>
  );
}

export default StoreList;