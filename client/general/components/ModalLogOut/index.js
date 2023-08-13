import { setFlagModalLogOutHideDone } from 'app/appSlice';
import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import AppStyle from 'general/constants/AppStyle';
import DeviceConstants from 'general/constants/DeviceConstants';
import GlobalStyle from 'general/constants/GlobalStyle';
import React, { createRef, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';

ModalLogOut.propTypes = {};

ModalLogOut.defaultProps = {};

export const ModalLogOutHelper = createRef();

function ModalLogOut(props) {
    // MARK: --- Params ---
    const [showing, setShowing] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    // MARK: --- Functions ---

    // MARK: --- Hooks ---
    useEffect(() => {
        ModalLogOutHelper.current = {
            show: text => {
                setMessage(text);
                setShowing(true);
            },
            hide: () => {
                setShowing(false);
            },
        };
    }, []);

    return (
        <Modal
            isVisible={showing}
            propagateSwipe={true}
            avoidKeyboard={true}
            statusBarTranslucent={true}
            onModalHide={() => {
                dispatch(setFlagModalLogOutHideDone({}));
            }}
            deviceWidth={DeviceConstants.windowWidth}
            deviceHeight={DeviceConstants.windowHeight}
            // onBackButtonPress={handleClose}
            animationIn="fadeIn"
            animationOut="fadeOut"
            // onBackdropPress={handleClose}
            hasBackdrop
            backdropTransitionOutTiming={0}
            style={{
                // marginLeft: DeviceConstants.screenWidth * 0,
                width: DeviceConstants.screenWidth,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            children={
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: AppResource.Dimensions.base * 0.5,
                        maxWidth: '50%',
                        // aspectRatio: 1,
                        overflow: 'hidden',
                        ...GlobalStyle.ViewAlignment.center,
                        ...GlobalStyle.Padding.all(1.6),
                    }}>
                    <ActivityIndicator color={AppColor.feature} size="large" />
                    <Text
                        style={{
                            fontFamily: AppStyle.Fonts.medium,
                            fontSize: 14,
                            color: AppColor.grey80,
                            ...GlobalStyle.Margin.top(0.6),
                        }}>
                        {message}
                    </Text>
                </View>
            }
        />
    );
}

export default ModalLogOut;
