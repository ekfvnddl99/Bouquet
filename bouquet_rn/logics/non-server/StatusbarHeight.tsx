import { Dimensions, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets, } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    // ios: isIPhoneX() ? 44 : 20,
    ios : Constants.statusBarHeight,
    android: StatusBar.currentHeight,
    default: 0
})