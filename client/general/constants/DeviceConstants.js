import { Dimensions, Platform, StatusBar } from 'react-native';

export default DeviceConstants = {
    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height,
    minScreenSize: Math.min([Dimensions.get('screen').width, Dimensions.get('screen').height]),
    maxScreenSize: Math.max([Dimensions.get('screen').width, Dimensions.get('screen').height]),
    windowWidth: Dimensions.get('window').width,
    windowHeight:
        Platform.OS === 'ios'
            ? Dimensions.get('window').height
            : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT'),
    statusBarHeight: StatusBar.currentHeight ?? 0, // android only (The height of the status bar, which includes the notch height, if present.)
};
