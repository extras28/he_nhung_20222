import { unwrapResult } from '@reduxjs/toolkit';
import balconyApi from 'api/balconyApi';
import { thunkGetListBalcony } from 'features/Dashboard/dashboardSlice';
import { FastField, Formik } from 'formik';
import { AppLoadingHelper } from 'general/components/AppLoading';
import DefaultTextInput from 'general/components/Forms/DefaultTextInput';
import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import DeviceConstants from 'general/constants/DeviceConstants';
import GlobalStyle from 'general/constants/GlobalStyle';
import Utils from 'general/utils/Utils';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

ModalDeleteBalcony.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    balconyItem: PropTypes.object,
    onDelete: PropTypes.func,
    title: PropTypes.string,
    isBalcony: PropTypes.bool,
};

ModalDeleteBalcony.defaultProps = {
    show: false,
    onClose: null,
    balconyItem: {},
    onDelete: null,
    title: '',
    isBalcony: true,
};

const sTag = '[ModalDeleteBalcony]';

function ModalDeleteBalcony(props) {
    // MARK --- Params: ---
    const { show, onClose, balconyItem, onDelete, title, isBalcony } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // MARK --- Functions: ---
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }

    async function handleDelete() {
        if (onDelete) {
            onDelete();
        }
    }

    return (
        <Modal
            isVisible={show}
            propagateSwipe={true}
            avoidKeyboard={true}
            statusBarTranslucent={true}
            onModalHide={() => {
                //   dispatch(setFlagAppLoadingHideDone({}));
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
                        borderRadius: 20,
                        width: DeviceConstants.screenWidth - 60,
                    }}>
                    <View>
                        {/* modal header */}
                        <View
                            style={{
                                padding: 20,
                                borderBottomColor: AppColor.gray,
                                borderBottomWidth: 0.5,
                            }}>
                            <Text style={{ fontWeight: '700', color: AppColor.black }}>
                                {title}
                            </Text>
                            {/* <FontAwesome name="close" size={20} color={AppColor.black} /> */}
                        </View>
                        {/* modal body */}
                        <View
                            style={{
                                padding: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: AppColor.aliceblue,
                                    padding: 20,
                                    borderRadius: 20,
                                    aspectRatio: '1/1',
                                    width: 80,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}>
                                <FontAwesome5
                                    name="trash-alt"
                                    size={35}
                                    color={AppColor.fireEngineRed}
                                />
                            </View>
                            {isBalcony ? (
                                <Text
                                    style={{
                                        color: AppColor.black,
                                        textAlign: 'center',
                                    }}>{`Bạn có chắc muốn xóa vườn ${balconyItem?.selectedBalconyItem?.name} ?`}</Text>
                            ) : (
                                <Text
                                    style={{
                                        color: AppColor.black,
                                        textAlign: 'center',
                                    }}>{`Bạn có chắc muốn xóa vòi ${balconyItem?.name} ?`}</Text>
                            )}
                        </View>

                        {/* modal footer */}
                        <View
                            style={{
                                padding: 20,
                                borderTopColor: AppColor.gray,
                                borderTopWidth: 0.5,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: AppColor.red,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                    paddingHorizontal: 8,
                                    borderRadius: 5,
                                    marginRight: 10,
                                }}
                                onPress={() => handleDelete()}>
                                <Text style={{ color: AppColor.white }}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: AppColor.silver,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                    paddingHorizontal: 8,
                                    borderRadius: 5,
                                }}
                                onPress={handleClose}>
                                <Text style={{ color: AppColor.white }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        />
    );
}

export default ModalDeleteBalcony;
