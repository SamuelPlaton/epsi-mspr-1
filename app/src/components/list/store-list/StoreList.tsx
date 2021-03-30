import React, { FunctionComponent, useState } from 'react';
import { View, Text, Button } from "react-native";
import {genericStyles} from "../../../styles";
import {Store, User} from "../../../entities";
import CheckBox from "@react-native-community/checkbox";
import Api from "../../../api/Api";

export interface Props {
  activeStores: Array<Store>;
  activeUser: User;
  stores: Array<Store>;
}

const StoreList: FunctionComponent<Props> = ({activeStores, activeUser, stores}) => {

  const activeIds = activeStores.map( activeStore => activeStore.id);
  const [checkedStores, setCheckedStores] = useState<Array<string>>(activeIds.concat('1'));
  const [success, setSuccess] = useState<boolean>(false);

  const handleCheck = (checked: boolean, store: Store) => {
    if (checked) {
      setCheckedStores(checkedStores.concat(store.id));
    } else {
      setCheckedStores(checkedStores.filter( s => s !== store.id));
    }
  };

  const submitStores = () => {
    Api.StoresApi.put(activeUser.id, checkedStores, activeUser.attributes.token);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <View>
    { stores.map( store => (
      <View style={genericStyles.rowStart} key={store.id}>
        <CheckBox
          onValueChange={(newValue) => handleCheck(newValue, store)}
          value={checkedStores.includes(store.id)}
        />
        <Text>{store.attributes.name}</Text>
      </View>
    ))}
    <View style={genericStyles.marginXAuto}>
      <Button
        title="Enregistrer"
        onPress={submitStores}
      />
    </View>
      { success && (
        <Text style={{ ...genericStyles.marginXAuto, color: 'green', marginTop: 10 }}>Magasins modifiés avec succès !</Text>
      )}
    </View>
  );
}

export default StoreList;