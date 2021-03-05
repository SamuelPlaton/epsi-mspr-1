import { StyleSheet } from "react-native";


const genericStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    titleText:{
      fontSize: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'powderblue',
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 25,
      marginBottom: 10,
    },
    buttonText:{
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 200,
      fontSize: 20,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      marginVertical: 10,
    },
  });

  export default genericStyles;