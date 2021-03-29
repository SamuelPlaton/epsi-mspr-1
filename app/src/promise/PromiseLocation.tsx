import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export async function getLocationInformation() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        location,
      });
    }, 1500);
  });
}
