import Api from "../../../api/Api";
import {Store, User} from "../../../entities";
import {LinkCard} from "../../../components";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Images} from "../../../images";
import {genericStyles} from "../../../styles";
import {retrieveActiveUser} from "../../../store/UserManager";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
import setStore from "../../../api/stores/StoresApi";
=======
import {setStore} from "../../../api/stores/StoresApi";
>>>>>>> ebdaf0f33ba51a9b6ae889e4a7f3c07a263d1d85
import moment from "moment";
import StoreList from "../../list/store-list/StoreList";

/**
 * The user page.
 */

const UserInfo: FunctionComponent = () => {
  const nav = useNavigation();
  const route = useRoute();

  const [stores, setStores] = useState<Array<Store>>(undefined);
  const [activeStores, setActiveStores] = useState<Array<Store>>(undefined);

  // Retrieve our active user
  const [activeUser, setActiveUser] = useState<User | undefined>(route.params ? route.params as User : undefined);
  
  const getData = async () => {

    retrieveActiveUser().then(response => {
      setActiveUser(response);
      
    })

    if (!activeUser) return;

    const userData = await Api.UsersApi.get(activeUser.id);
    const storeData = await Api.StoresApi.list();
    console.log('---------');
    console.log(userData.stores);
    // console.log('-----|----');
    // console.log(storeData);

    setStores(storeData);
    setActiveStores(userData.stores);
  }

  useEffect(() => {
    getData();
  }, []);

  // const dateAnniv = moment(activeUser.attributes.birthday).locale('FR')
  // console.log(dateAnniv);
  // const styles = StyleSheet.create({
  //   center: {
  //     width: '85%',
  //     marginLeft: 'auto',
  //     marginRight: 'auto'
  //   },
  //   greetings: {
  //     width: '80%',
  //     marginTop: 10,
  //     marginBottom: 10,
  //     fontSize: 20
  //   }
  // });


  return (
    <ScrollView>
      {activeUser ? (
          <View style={{...genericStyles.userpage}}>
            
            <Text style={{...genericStyles.usertitle}}>Mon Compte</Text>
            <LinkCard text='' icon={Images.defaultProfilPic} link=''/>

            <View>
              <Text style={{...genericStyles.userlabel}}>Nom : <Text style={{...genericStyles.usertext}}>{activeUser.attributes.lastName} {activeUser.attributes.firstName}</Text></Text>
              <Text style={{...genericStyles.userlabel}}>Email : <Text style={{...genericStyles.usertext}}>{activeUser.attributes.email}</Text></Text>
              <Text style={{...genericStyles.userlabel}}>Date d'anniversaire : <Text style={{...genericStyles.usertext}}>{moment(activeUser.attributes.birthday).locale('fr').format('L')}</Text></Text>
            </View>

            <View>
            <Text style={{...genericStyles.usertitle}}>Mes magasins</Text>
            {/* <Text style={{...genericStyles.usertext}}>{}</Text> */}
            {/* <Text style={{...genericStyles.usertext}}>{activeStores}</Text> */}

            {( stores ) && (

            <StoreList stores={stores}/>
            
            )}

            </View>
          </View>
        )
        :
        (
          <View>
            <View style={{width: '50%', ...genericStyles.marginXAuto, marginTop: 15}}>
              
            </View>
            <Text style={{marginTop: 5, marginBottom: 5, textAlign: 'center'}}>Ou</Text>
            <View style={{width: '50%', ...genericStyles.marginXAuto}}>
            <Button title="S'inscrire" onPress={() => nav.navigate('Register')}/>
            </View>
          </View>
        )
      }

    </ScrollView>
  );
}
export default UserInfo;
