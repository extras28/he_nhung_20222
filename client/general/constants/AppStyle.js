import DeviceConstants from "./DeviceConstants";
import GlobalStyle from "./GlobalStyle";

const AppStyle = {
    Fonts: {
        light: 'Inter-Light',
        regular: 'Inter-Regular',
        medium: 'Inter-Medium',
        semiBold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
    },
    Shadows: {
        /**
         * @type {StyleProp<ViewStyle>}
         */
        Primary: {
            shadowColor: 'rgba(97, 177, 90, 0.71)',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 1,
        },
        Negative: {
            shadowColor: 'rgba(0, 0, 0, 0.06)',
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 1,
        },
    },
    FontSizes: {
        s_5: 5,
        s_6: 6,
        s_7: 7,
        s_8: 8,
        s_9: 9,
        s_10: 10,
        s_11: 11,
        s_12: 12,
        s_13: 13,
        s_14: 14,
        s_15: 15,
        s_16: 16,
        s_17: 17,
        s_18: 18,
        s_19: 19,
        s_20: 20,
        s_21: 21,
        s_22: 22,
        s_23: 23,
        s_24: 24,
        s_25: 25,
        s_26: 26,
        s_27: 27,
        s_28: 28,
        s_29: 29,
        s_30: 30,
    },
    viewContainer: {
        flex: 1,
        ...GlobalStyle.ViewSize.fullWidth,
      },
    
      // Header
      viewHeader: {
        width: DeviceConstants.screenWidth,
        aspectRatio: 390 / 237,
        ...GlobalStyle.ViewSize.fullWidth,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
      },
};

export default AppStyle;
