import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
      ...style
    },
  });

  return (
    <View onTouchEnd={onClick} style={styles.card}>
      {children}
    </View>);
}

export default BaseCard;