import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

/* BaseCard Props
*   bgColor:      the background color of the card (optional, white by default)
*   rounded:      Optional, true if the card is rounded
*   style:        The component style
*   onClick       The component callback.
 */
export interface Props {
  bgColor?: string
  rounded?: boolean;
  style?: Object;
  onClick?: () => void;
}

/**
 * The react card component.
 */
const BaseCard: FunctionComponent<Props> = ({ children, style, bgColor = '#FFFFFF', rounded, onClick}) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: bgColor,
      borderRadius: rounded ? 10 : 0,
      padding: 20,
      shadowColor: 'black',
      shadowOpacity: 0.34,
      shadowRadius: 4,
      shadowOffset: {height: 3, width: 0},
      elevation: 6,
      ...style
    },
  });

  return (
    <View  style={styles.card}>
      <TouchableOpacity activeOpacity={1} onPress={onClick}>
      {children}
      </TouchableOpacity>
    </View>);
}

export default BaseCard;