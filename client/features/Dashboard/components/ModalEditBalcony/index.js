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

ModalEditBalcony.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    balconyItem: PropTypes.object,
};

ModalEditBalcony.defaultProps = {
    show: false,
    onClose: null,
    balconyItem: {},
};

const sTag = '[ModalEditBalcony]';

function ModalEditBalcony(props) {
    // MARK --- Params: ---
    const { show, onClose, balconyItem } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isEditMode = !Utils.isObjectEmpty(balconyItem);
    const refSelectedAsset = useRef(null);
    const [selectedBalconyImage, setSelectedBalconyImage] = useState(null);

    // MARK --- Functions: ---
    function handleClose() {
        if (onClose) {
            onClose();
            setSelectedBalconyImage(null);
        }
    }

    async function handlePickPhoto() {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
        });
        const { assets } = result;
        if (assets && assets.length > 0) {
            refSelectedAsset.current = assets[0];
            const uri = assets[0].uri;

            setSelectedBalconyImage(uri);
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
                    <Formik
                        initialValues={{
                            balconyId: balconyItem?.balconyId ?? '',
                            name: balconyItem?.name ?? '',
                            image: balconyItem?.image ?? '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required(t('Bắt buộc')),
                            balconyId: Yup.string().required(t('Bắt buộc')),
                        })}
                        enableReinitialize
                        onSubmit={async values => {
                            AppLoadingHelper.current.show(t('Loading...'));
                            const params = { ...values };
                            try {
                                if (selectedBalconyImage) {
                                    params.image = await Utils.uploadCloudinary(
                                        refSelectedAsset.current,
                                    );
                                }
                                if (isEditMode) {
                                    const res = await balconyApi.update(params);
                                    const { result, balcony } = res.data;
                                    console.log(res);
                                    if (result === 'success') {
                                        Utils.toast({
                                            message: t('Cập nhật vườn thành công'),
                                        });
                                        dispatch(thunkGetListBalcony({}));
                                        handleClose();
                                    }
                                } else {
                                    const res = await balconyApi.create(params);
                                    console.log(res);
                                    const { result, balcony } = res.data;
                                    if (result === 'success') {
                                        Utils.toast({
                                            message: t('Thêm vườn thành công'),
                                        });
                                        dispatch(thunkGetListBalcony({}));
                                        handleClose();
                                    }
                                }
                            } catch (error) {
                                console.error(
                                    `${sTag} edit or create balcony error: ${error.message}`,
                                );
                            }
                            AppLoadingHelper.current.hide();
                        }}>
                        {formikProps => (
                            <View>
                                {/* modal header */}
                                <View
                                    style={{
                                        padding: 20,
                                        borderBottomColor: AppColor.gray,
                                        borderBottomWidth: 0.5,
                                    }}>
                                    <Text style={{ fontWeight: '700', color: AppColor.black }}>
                                        {isEditMode ? 'Chỉnh sửa vườn' : 'Thêm vườn'}
                                    </Text>
                                    {/* <FontAwesome name="close" size={20} color={AppColor.black} /> */}
                                </View>
                                {/* modal body */}
                                <View
                                    style={{
                                        padding: 20,
                                    }}>
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={isEditMode ? 0.8 : 1}
                                            // style={{
                                            //     backgroundColor: 'white',
                                            //     ...GlobalStyle.Margin.horizontal(),
                                            //     ...GlobalStyle.ViewSize.fullHeight,
                                            //     aspectRatio: 1,
                                            //     alignSelf: 'center',
                                            //     borderRadius: 20,
                                            //     justifyContent: 'center',
                                            //     overflow: 'hidden',
                                            //     position: 'relative',
                                            // }}
                                            onPress={() => {
                                                // if (isEditMode) {
                                                handlePickPhoto();
                                                // }
                                            }}>
                                            <Image
                                                source={
                                                    isEditMode
                                                        ? {
                                                              uri:
                                                                  selectedBalconyImage ??
                                                                  balconyItem?.image,
                                                          } ?? AppResource.images.img_error_image
                                                        : selectedBalconyImage
                                                        ? { uri: selectedBalconyImage }
                                                        : AppResource.images.img_default
                                                }
                                                style={{
                                                    ...GlobalStyle.ViewSize.fullWidth,
                                                    height: 200,
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    borderColor: AppColor.feature,
                                                    resizeMode: 'cover',
                                                    marginBottom: 30,
                                                }}
                                            />
                                            {/* {isEditMode && (
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                    bottom: 0,
                                                    left: 0,
                                                    ...GlobalStyle.ViewSize.fullWidth,
                                                    ...GlobalStyle.Padding.bottom(0.8),
                                                    ...GlobalStyle.Padding.top(0.4),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontFamily: AppStyle.Fonts.medium,
                                                        fontSize: 13,
                                                        color: 'white',
                                                        textAlign: 'center',
                                                    }}>
                                                    {t('ChangeAvatar')}
                                                </Text>
                                            </View>
                                        )} */}
                                        </TouchableOpacity>

                                        {/* <Image
                                        source={
                                            { uri: balconyItem?.image } ??
                                            AppResource.images.img_error_image
                                        }
                                        style={{
                                            ...GlobalStyle.ViewSize.fullWidth,
                                            height: 300,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: AppColor.feature,
                                            resizeMode: 'cover',
                                        }}
                                    /> */}

                                        <FastField name="name">
                                            {({ field, form, meta }) => (
                                                <View
                                                    style={{
                                                        ...GlobalStyle.Margin.bottom(),
                                                    }}>
                                                    <DefaultTextInput
                                                        label="Tên vườn"
                                                        placeholder={t('Nhập tên vườn')}
                                                        value={field.value}
                                                        onChange={value => {
                                                            form.setFieldValue(field.name, value);
                                                        }}
                                                        onBlur={() => {
                                                            form.setFieldTouched(field.name, true);
                                                        }}
                                                        enableCheckValid
                                                        required
                                                        isValid={_.isEmpty(meta.error)}
                                                        isTouched={meta.touched}
                                                        feedbackText={meta.error}
                                                    />
                                                </View>
                                            )}
                                        </FastField>

                                        {/* balconyId */}
                                        {!isEditMode && (
                                            <FastField name="balconyId">
                                                {({ field, form, meta }) => (
                                                    <View
                                                        style={{
                                                            ...GlobalStyle.Margin.bottom(),
                                                        }}>
                                                        <DefaultTextInput
                                                            label="Code"
                                                            placeholder={t('Code')}
                                                            value={field.value}
                                                            onChange={value => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    value,
                                                                );
                                                            }}
                                                            onBlur={() => {
                                                                form.setFieldTouched(
                                                                    field.name,
                                                                    true,
                                                                );
                                                            }}
                                                            enableCheckValid
                                                            required
                                                            isValid={_.isEmpty(meta.error)}
                                                            isTouched={meta.touched}
                                                            feedbackText={meta.error}
                                                        />
                                                    </View>
                                                )}
                                            </FastField>
                                        )}
                                    </View>
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
                                            backgroundColor: '#28a745',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingVertical: 5,
                                            paddingHorizontal: 8,
                                            borderRadius: 5,
                                            marginRight: 10,
                                        }}
                                        onPress={() => formikProps.handleSubmit()}>
                                        <Text style={{ color: AppColor.white }}>Lưu</Text>
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
                        )}
                    </Formik>
                </View>
            }
        />
    );
}

export default ModalEditBalcony;
