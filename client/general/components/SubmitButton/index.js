import _ from 'lodash';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import AppStyle from 'general/constants/AppStyle';
import AppColor from 'general/constants/AppColor';
import AppData from 'general/constants/AppData';

/**
 * @description common submit button
 *
 * @typedef Props
 * @property {'primary'|'negative'} type
 * @property {boolean} activeShadow
 * @property {StyleProp<ViewStyle>=} style
 * @property {StyleProp<TextStyle>=} textStyle
 * @property {string} text
 * @property {StyleProp<ViewStyle>=} shadow
 * @property {()=>void=} onPress
 * @property {boolean} isPending
 *
 * @param {Props} props
 */
export default function (props) {
    let { onPress, style, type, text, textStyle, shadow, activeShadow, isPending } = props;

    /**
     * @type {StyleProp<ViewStyle>}
     */
    let ButtonStyle = {
        flex: 0,
        // width: AppData.consts.deviceWidth - AppData.consts.space_16 * AppData.consts.space_2,
        borderWidth: AppData.consts.space_1,
        borderRadius: AppData.consts.space_10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 41,
        flexDirection: isPending ? 'row' : 'column',
    };
    /**
     * @type {StyleProp<ViewStyle>}
     */
    let ShadowStyle;
    /**
     * @type {StyleProp<TextStyle>}
     */
    let ContentStyle = {
        fontFamily: AppStyle.Fonts.semiBold,
        fontSize: AppStyle.FontSizes.s_14,
        lineHeight: AppData.consts.space_22,
        fontWeight: '600',
        marginRight: AppData.consts.space_5,
    };

    switch (type) {
        case 'primary':
            ButtonStyle = {
                ...ButtonStyle,
                borderColor: AppColor.primary,
                backgroundColor: AppColor.feature,
            };
            ShadowStyle = AppStyle.Shadows.Primary;
            ContentStyle = {
                ...ContentStyle,
                color: AppColor.white,
            };
            break;
        case 'negative':
            ButtonStyle = {
                ...ButtonStyle,
                borderColor: AppColor.grey40,
                backgroundColor: AppColor.white,
            };
            ShadowStyle = AppStyle.Shadows.Negative;
            ContentStyle = {
                ...ContentStyle,
                color: AppColor.grey80,
            };
            break;
    }

    return (
        <DropShadow style={activeShadow ? [ShadowStyle, shadow] : {}}>
            <TouchableOpacity
                disabled={!_.isFunction(onPress)}
                onPress={onPress}
                style={[ButtonStyle, style]}>
                <Text style={[ContentStyle, textStyle]}>{text}</Text>
                {isPending ? <ActivityIndicator size={'small'} color={AppColor.white} /> : null}
            </TouchableOpacity>
        </DropShadow>
    );
}
