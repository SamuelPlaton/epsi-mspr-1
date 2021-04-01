import React, {FunctionComponent, useEffect, useState} from 'react';
import {Image, Text, Button, TouchableOpacity, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../../entities';

import {useRoute, useNavigation} from '@react-navigation/native';
import { genericStyles } from '../../../styles';

import { retrieveActiveUser } from '../../../store/UserManager';

export interface Props {
    title: string;
  }

const BurgerMenu: FunctionComponent<Props> = ({title}) => {
    console.log(title);

    const nav = useNavigation();
    const route = useRoute();

    const [activeUser, setActiveUser] = useState<User | undefined>(route.params ? (route.params as User) : undefined);

    const getData = async () => {
        if (!activeUser) {
            retrieveActiveUser().then((response) => {
              if (response) {
                setActiveUser(response);
              }
            });
          }
    }

    const disconnect = async () => {
        await AsyncStorage.removeItem('activeUser', () => nav.navigate('Home'));

    }

    useEffect(() => {
        getData();
      }, [activeUser]);

    const [isActive, setActive] = useState(false);

    const styles = StyleSheet.create({
        cont: {
            height: "100%",
            width: "100%"
        },
        buttonUnactive: {
            position: "absolute",
            right: "5%",
            top: 10
        },
        buttonActive: {
            position: "absolute",
            right: "55%",
            top: 10
        },
        active: {
            position: "absolute",
            right: 0,
            width: "40%",
            height: "100%",
            backgroundColor: 'white',
            color: 'black'
        },
        unactive: {
              display: "none"
        },
        blur: {
            backgroundColor: 'rgba(52,52,52,0.5)',
            width: "100%",
            height: "100%"
        },
        topbar: {
            position: "absolute",
            top : 0,
            left : 0,
            width: "100%",
            height: 50
        },
        tinyIcon: {
            marginTop: 10,
            marginLeft: 20,
            height: 30,
            width: 30
        },
        text: {
            fontSize: 15,
            color: '#AAAAAA'
        }
    });

    return (
        <View style={styles.cont}>
            <View style={styles.topbar}>
                <TouchableOpacity activeOpacity={1} onPress={() => nav.goBack()}>
                    <Image style={styles.tinyIcon} source={require('../../../assets/icons/return.png')}/>
                </TouchableOpacity>
                <Text style={{marginLeft: 30}}>{title}</Text>
                <View style={isActive ? styles.buttonActive : styles.buttonUnactive}>
                    <TouchableOpacity activeOpacity={1} onPress={() => setActive(!isActive)}>
                        <Image style={styles.tinyIcon} source={require('../../../assets/icons/menu.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={isActive ? styles.blur : styles.unactive} onPress={() => setActive(false)}>
                <View style={isActive ? styles.active : styles.unactive}>
                    <View style={genericStyles.rowBetween}>
                        <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Home')}>
                            <Text style={styles.text}>Home</Text>
                        </TouchableOpacity>
                        {activeUser ? (
                            <View>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Scan')}>
                                    <Text style={styles.text}>QR scanner</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Coupons')}>
                                    <Text style={styles.text}>Coupons</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Historic')}>    
                                    <Text style={styles.text}>Historique</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Map')}>
                                    <Text style={styles.text}>Mappe</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('User')}>    
                                    <Text style={styles.text}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor: "red", position: "absolute", bottom: 10, left: 10}} onPress={async () => disconnect()}>Déconnexion</TouchableOpacity>
                            </View>
                            ) : (
                            <View>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Login')}>    
                                    <Text style={styles.text}>Se connecter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Register')}>    
                                    <Text style={styles.text}>S'enregister</Text>
                                </TouchableOpacity> 
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default BurgerMenu;
