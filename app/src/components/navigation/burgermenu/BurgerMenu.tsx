import React, {FunctionComponent} from 'react';
import {Image, StyleSheet, Button, View} from 'react-native';

import { useNavigation} from '@react-navigation/native';

const BurgerMenu: FunctionComponent = () => {

    var isActive = false;

    const nav = useNavigation();
    
    const right_unactive_button_percentage = '5%';
    const right_active_button_percentage = '55%';
    const width_side_percentage = '40%';
    const height_side_percentage = '100%';

    const styles = StyleSheet.create({
        buttonUnactive: {
            position: "absolute",
            right: right_unactive_button_percentage,
            top: 10
        },
        buttonActive: {
            position: "absolute",
            right: right_active_button_percentage,
            top: 10
        },
        active: {
            position: "absolute",
            width: width_side_percentage,
            height: height_side_percentage,
            backgroundColor: 'white',
            color: 'black'
        },
        unactive: {
            display: "none"
        }
    });

    const popSidebar = () => {
        isActive = !isActive;
    }
  
    return (
        <View>
            <View style={isActive ? styles.buttonActive : styles.buttonUnactive}>
                <Button title={'X'} onPress={popSidebar} />
            </View>
            <View style={isActive ? styles.active : styles.unactive}>
                <Button title='Home' onPress={() => nav.navigate('Home')}/>
                <Button title='QR scanner' onPress={() => nav.navigate('Scan')}/>
                <Button title='Coupons' onPress={() => nav.navigate('Coupons')}/>
                <Button title='Coupon' onPress={() => nav.navigate('Coupon')}/>
                <Button title='Historique' onPress={() => nav.navigate('Historic')}/>
                <Button title='Mappe' onPress={() => nav.navigate('Map')}/>
                <Button title='Profile' onPress={() => nav.navigate('User')}/>
            </View>
        </View>
    );
};
export default BurgerMenu;
