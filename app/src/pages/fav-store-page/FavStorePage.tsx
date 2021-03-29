import Api from "../../api/Api";
import {User, Store} from "../../entities";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Images} from "../../images";
import {genericStyles} from "../../styles";
import {retrieveActiveUser} from "../../store/UserManager";
import {useNavigation, useRoute} from '@react-navigation/native';

/**
 * The react Stores page.
 */

const StoresPage: FunctionComponent = () => {
  const nav = useNavigation();
  const route = useRoute();

  const [stores, setStores] = useState<Array<Store>>(undefined);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  retrieveActiveUser().then(response => {
    setActiveUser(response);
    return response
  });

  const getData = async () => {
    if(!activeUser || stores){
      return;
    }
    const data = await Api.UsersApi.get(activeUser.id);
    const favoredStores = data.stores.filter(s => {
      const userStores = data.stores.find(us => us.relationships.store === s.id);
      const uniqueStatement = s.attributes.unique === 0 || (s.attributes.unique === 1 && userStores && parseInt(userStores.attributes.used) === 0);
      return userStores && parseInt(userStores.attributes.favored) === 1 && s.attributes.valid === 1 && uniqueStatement
    });
    setStores(data.stores);
    // console.log(data.stores);
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
      {( stores && stores.length > 0) ? (
        <View>
            <Text style={{...genericStyles.subtitleText, ...genericStyles.marginXAuto}}> Mes Stores ({stores.length})</Text>
            <View>
                <Text style={styles.center}>{}</Text>
            </View>
        </View>
      ) : (<Text style={{...genericStyles.titleText, ...styles.center}}>Vous n'avez pas encore de magasins favoris</Text>)}
    </ScrollView>
  );
}
export default StoresPage;
