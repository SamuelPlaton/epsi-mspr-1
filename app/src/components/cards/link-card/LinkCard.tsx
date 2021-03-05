import React, {FunctionComponent} from 'react';
import {BaseCard} from "../index";
import {Image, ImageProps, StyleSheet, Text} from "react-native";
import {Icon} from "react-native-elements";
import {Images} from "../../../images";

export interface Props {
  icon: ImageProps,
  text: string,
  link: string,
}

/**
 * The react coupon link component.
 */
const LinkCard: FunctionComponent<Props> = ({icon, text, link}) => {
  const styles = StyleSheet.create({
    card: {
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 20,
      width: '45%',
      height: 120
    },
    iconLarge: {
      width: 70,
      height: 70,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    textLarge: {
      textAlign: "center",
      fontSize: 20
    }
  });

  const redirect = () => {
    console.log(link);

  }
  return (
    <BaseCard bgColor='#FEFEFE' style={styles.card} onClick={redirect}>
      <Image source={icon} style={styles.iconLarge}/>
      <Text style={styles.textLarge}>{text}</Text>
    </BaseCard>);
}

export default LinkCard;