import React, {FunctionComponent} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, Button, View} from 'react-native';

import {useRoute, useNavigation} from '@react-navigation/native';
import { genericStyles } from '../../../styles';

const BurgerMenu: FunctionComponent = () => {

    var isActive = false;

    const nav = useNavigation();

    const route = useRoute();

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
            width: "40%",
            height: "100%",
            backgroundColor: 'white',
            color: 'black'
        },
        unactive: {
            display: "none"
        },
        blur: {
            backgroundColor: 'rgba(0,0,0,0.5)',
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

    const popSidebar = () => {
        isActive = !isActive;
    }
  
    return (
        <View style={styles.cont}>
            <View style={styles.topbar}>
                <TouchableOpacity activeOpacity={1} onPress={() => nav.goBack()}>
                    <Image style={styles.tinyIcon} source={require('../../../assets/icons/return.png')}/>
                </TouchableOpacity>
                <Text style={{marginLeft: 30}}>{route.name}</Text>
                <View style={isActive ? styles.buttonActive : styles.buttonUnactive}>
                    <TouchableOpacity activeOpacity={1} onPress={() => popSidebar()}>
                        <Image style={styles.tinyIcon} source={require('../../../assets/icons/menu.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={isActive ? styles.blur : styles.unactive}>
                <View style={isActive ? styles.active : styles.unactive}>
                    <View style={genericStyles.rowBetween}>
                        <Text style={styles.text}>Home</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Home')}/>
                        <Text style={styles.text}>QR scanner</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Scan')}/>
                        <Text style={styles.text}>Coupons</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Coupons')}/>
                        <Text style={styles.text}>Historique</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Historic')}/>
                        <Text style={styles.text}>Mappe</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Map')}/>
                        <Text style={styles.text}>Profile</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('User')}/>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default BurgerMenu;
