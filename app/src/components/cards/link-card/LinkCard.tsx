import React, {FunctionComponent} from 'react';
import {default as BaseCard} from "../base-card/BaseCard";
import {Image, ImageProps, StyleSheet, Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {genericStyles} from "../../../styles";


export interface Props {
  icon: ImageProps;
  text: string;
  link?: string;
  onClick?: () => void;
}

/**
 * The react coupon link component.
 */

const LinkCard: FunctionComponent<Props> = ({icon, text, link, onClick}) => {

  const nav = useNavigation();

  const styles = StyleSheet.create({
    card: {
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 20,
      width: '45%',
      height: 120,
    },
    text: {

      textAlign: "center",
      fontSize: 15,
      overflow: 'hidden',
    }

  });

  const redirect = () => {
    if (link){
      nav.navigate(link);
    }else if (onClick){
      onClick();
    }
  }

  return (
    <BaseCard bgColor='#FEFEFE' style={styles.card} onClick={redirect}>
      <Image source={icon} style={genericStyles.iconLarge} />
      <Text style={styles.text}>{text}</Text>
    </BaseCard>
  );
};

export default LinkCard;
