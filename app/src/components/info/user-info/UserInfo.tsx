import Api from "../../../api/Api";
import { Image, StyleSheet, Text, View } from "react-native";
import {Store, User} from "../../../entities";
import { BaseCard } from "../../../components";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Images} from "../../../images";
import {genericStyles} from "../../../styles";
import {retrieveActiveUser} from "../../../store/UserManager";
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from "moment";
import StoreList from "../../list/store-list/StoreList";

/**
 * The user page.
 */

const UserInfo: FunctionComponent = () => {

  const [stores, setStores] = useState<Array<Store>>(undefined);
  const [activeStores, setActiveStores] = useState<Array<Store>>(undefined);

  // Retrieve our active user
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  
  const getData = async () => {
    retrieveActiveUser().then(response => {
      setActiveUser(response);
    })

    if (!activeUser) return;

    const userData = await Api.UsersApi.get(activeUser.id);
    const storeData = await Api.StoresApi.list();

    // Stop here if -1 is returned
    if (typeof userData === 'number') {
      return;
    }

    setStores(storeData);
    setActiveStores(userData.stores);
  }

  useEffect(() => {
    getData();
  }, [activeUser]);

  const styles = StyleSheet.create({
    userpage: {
      margin: '4%',
      backgroundColor: 'white',
      borderWidth: 4,
      borderRadius: 25,
      paddingBottom: 60,
      borderColor: 'powderblue',
    },

    usertitle: {
      color: '#2b6cda',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: 8,
      marginBottom: 12,
    },
    userlabel: {
      textAlign: 'center',
      color: '#2b58da',
      fontSize: 20,
      marginLeft: 20,
      marginRight: 10
    },

    usertext: {
      color: 'black',
      fontSize: 20,
    }
  });

  const birthdayDate = moment(activeUser?.attributes.birthday).locale('fr').format('L');

  return (
    <View>
      {activeUser && (
          <View style={styles.userpage}>
            <Text style={styles.usertitle}>Mon Compte</Text>
            <Image source={Images.defaultProfilPic} style={genericStyles.iconLarge} />
            <View style={{marginBottom: 20}}>
              <View style={genericStyles.rowStart}>
                <Text style={styles.userlabel}>Nom :</Text>
                <Text style={styles.usertext}>{activeUser.attributes.firstName} {activeUser.attributes.lastName}</Text>
              </View>
              <View style={genericStyles.rowStart}>
                <Text style={styles.userlabel}>Email :</Text>
                <Text style={styles.usertext}>{activeUser.attributes.email}</Text>
              </View>
              <View style={genericStyles.rowStart}>
                <Text style={styles.userlabel}>Date d'anniversaire : </Text>
                <Text style={styles.usertext}>{birthdayDate}</Text>
              </View>
            </View>
            <View>
            <Text style={styles.usertitle}>Mes magasins</Text>
            { (stores && activeStores) && (
              <StoreList
                activeStores={activeStores}
                activeUser={activeUser}
                stores={stores.filter( s => s.id !== "1")}
              />
            )}
            </View>
          </View>
        )}
    </View>
  );
}
export default UserInfo;
