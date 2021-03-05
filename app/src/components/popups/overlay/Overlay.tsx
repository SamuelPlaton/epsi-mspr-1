import React, {FunctionComponent} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

/**
 * The react overlay component.
 */
const Overlay: FunctionComponent = ({children}) => {

  const screen = Dimensions.get("screen")
  const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      width: screen.width,
      height: screen.height,
      backgroundColor: 'red',
    }
  });

  return (
    <View style={styles.overlay}>
      {children}
    </View>);
}

export default Overlay;