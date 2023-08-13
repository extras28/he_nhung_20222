import AppColor from 'general/constants/AppColor';
import AppData from 'general/constants/AppData';
import AppStyle from 'general/constants/AppStyle';
import _ from 'lodash';
import React, { createRef, useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

/**
 * @type {React.MutableRefObject<ScaleToast>}
 */
export const ScaleToastRef = createRef();

/**
 * @author hieubt
 * @description default duration 3000
 * @typedef Props
 * @property {React.MutableRefObject<ScaleToast>} toastRef
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function (props) {
    let { toastRef } = props;
    const [showing, setShowing] = useState(false);
    const [message, setMessage] = useState('');
    const defaultDuration = 3000;

    useEffect(() => {
        toastRef.current = {
            show(param) {
                _.isString(param.message) && setMessage(param.message);

                setTimeout(() => setShowing(true));

                setTimeout(
                    () => setShowing(false),
                    param?.duration ? param.duration : defaultDuration,
                );
            },
            hide() {
                setShowing(false);
            },
        };
    }, [toastRef]);

    return (
        <Modal
            animationType="fade"
            visible={showing}
            transparent
            focusable={false}
            onRequestClose={() => false}
            statusBarTranslucent
            presentationStyle={'overFullScreen'}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowing(false)}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        bottom: '10%',
                        position: 'absolute',
                        borderRadius: AppData.consts.space_20,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 1,
                        paddingVertical: AppData.consts.space_12,
                        paddingHorizontal: AppData.consts.space_16,
                        marginHorizontal: AppData.consts.space_12 * 4,
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: AppStyle.Fonts.regular,
                            fontSize: AppStyle.FontSizes.s_14,
                            lineHeight: AppData.consts.space_22,
                            color: AppColor.white,
                        }}>
                        {message}
                    </Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}
