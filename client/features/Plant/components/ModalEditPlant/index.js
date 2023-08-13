import plantApi from 'api/plantApi';
import { thunkGetListPlant } from 'features/Plant/plantSlice';
import { FastField, Formik } from 'formik';
import { AppLoadingHelper } from 'general/components/AppLoading';
import DefaultTextInput from 'general/components/Forms/DefaultTextInput';
import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import DeviceConstants from 'general/constants/DeviceConstants';
import Global from 'general/constants/Global';
import GlobalStyle from 'general/constants/GlobalStyle';
import Utils from 'general/utils/Utils';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

ModalEditPlant.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    plantItem: PropTypes.object,
};

ModalEditPlant.defaultProps = {
    show: false,
    onClose: null,
    plantItem: {},
};

const sTag = '[ModalEditPlant]';

function ModalEditPlant(props) {
    // MARK --- Params: ---
    const { show, onClose, plantItem } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isEditMode = !Utils.isObjectEmpty(plantItem);
    const refSelectedAsset = useRef(null);
    const [selectedPlantImage, setSelectedPlantImage] = useState(null);
    const actionSheetRef = useRef(null);
    const { plants } = useSelector(state => state?.plant);
    console.log(Global.balconyItem);
    // MARK --- Functions: ---
    function handleClose() {
        if (onClose) {
            onClose();
            setSelectedPlantImage(null);
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

            setSelectedPlantImage(uri);
        }
    }
    return (
        <Modal
            isVisible={show}
            propagateSwipe={true}
            avoidKeyboard={true}
            statusBarTranslucent={true}
            onModalHide={() => {}}
            deviceWidth={DeviceConstants.windowWidth}
            deviceHeight={DeviceConstants.windowHeight}
            animationIn="fadeIn"
            animationOut="fadeOut"
            hasBackdrop
            backdropTransitionOutTiming={0}
            style={{
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
                            plantId: plantItem?.plantId ?? '',
                            name: plantItem?.name ?? '',
                            plantOrder: parseInt(plantItem?.plantId?.slice(17, 19)) ?? '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required(t('Bắt buộc')),
                            plantOrder: Yup.string().required(t('Bắt buộc')),
                        })}
                        enableReinitialize
                        onSubmit={async values => {
                            AppLoadingHelper.current.show(t('Loading...'));
                            const params = { ...values };
                            try {
                                if (selectedPlantImage) {
                                    params.image = await Utils.uploadCloudinary(
                                        refSelectedAsset.current,
                                    );
                                }
                                if (isEditMode) {
                                    const res = await plantApi.updatePlant(params);
                                    const { result, plant } = res.data;
                                    console.log(res);
                                    if (result === 'success') {
                                        Utils.toast({
                                            message: t('Cập nhật thông tin vòi thành công'),
                                        });
                                        dispatch(
                                            thunkGetListPlant({
                                                balconyId: Global.balconyItem.balconyId,
                                            }),
                                        );
                                        handleClose();
                                    }
                                } else {
                                    params.balconyId = Global.balconyItem.balconyId;
                                    const res = await plantApi.createPlant(params);
                                    console.log(res);
                                    const { result, plant } = res.data;
                                    if (result === 'success') {
                                        Utils.toast({
                                            message: t('Thêm vòi thành công'),
                                        });
                                        dispatch(
                                            thunkGetListPlant({
                                                balconyId: Global.balconyItem.balconyId,
                                            }),
                                        );
                                        handleClose();
                                    }
                                }
                            } catch (error) {
                                console.error(
                                    `${sTag} edit or create plant error: ${error.message}`,
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
                                        {isEditMode ? 'Chỉnh sửa vòi' : 'Thêm vòi'}
                                    </Text>
                                </View>
                                {/* modal body */}
                                <View
                                    style={{
                                        padding: 20,
                                    }}>
                                    <View>
                                        {isEditMode && (
                                            <TouchableOpacity
                                                activeOpacity={isEditMode ? 0.8 : 1}
                                                onPress={() => {
                                                    handlePickPhoto();
                                                }}>
                                                <Image
                                                    source={
                                                        isEditMode
                                                            ? {
                                                                  uri:
                                                                      selectedPlantImage ??
                                                                      plantItem?.image,
                                                              } ??
                                                              AppResource.images.img_error_image
                                                            : selectedPlantImage
                                                            ? { uri: selectedPlantImage }
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
                                            </TouchableOpacity>
                                        )}

                                        <FastField name="name">
                                            {({ field, form, meta }) => (
                                                <View
                                                    style={{
                                                        ...GlobalStyle.Margin.bottom(),
                                                    }}>
                                                    <DefaultTextInput
                                                        label="Tên vòi"
                                                        placeholder={t('Nhập tên vòi')}
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

                                        {/* plant order */}

                                        {!isEditMode && (
                                            <FastField name="plantOrder">
                                                {({ field, form, meta }) => (
                                                    <View
                                                        style={{
                                                            ...GlobalStyle.Margin.bottom(),
                                                        }}>
                                                        <View>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    marginBottom: 6,
                                                                }}>
                                                                <Text
                                                                    style={{
                                                                        fontFamily:
                                                                            AppResource.Fonts
                                                                                .semiBold,
                                                                        fontSize: 14,
                                                                        color: AppColor.grey80,
                                                                    }}>
                                                                    Chân tưới{' '}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontFamily:
                                                                            AppResource.Fonts
                                                                                .semiBold,
                                                                        fontSize: 14,
                                                                        color: AppColor.red,
                                                                    }}>{`(*)`}</Text>
                                                            </View>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    actionSheetRef.current?.show();
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent:
                                                                            'space-between',
                                                                        backgroundColor: '#F3F5F8',
                                                                        paddingHorizontal: 10,
                                                                        paddingVertical: 13,
                                                                        borderRadius: 10,
                                                                    }}>
                                                                    <Text
                                                                        style={{
                                                                            color: AppColor.grey80,
                                                                        }}>
                                                                        {formikProps.getFieldProps(
                                                                            'plantOrder',
                                                                        ).value
                                                                            ? formikProps.getFieldProps(
                                                                                  'plantOrder',
                                                                              ).value
                                                                            : 'chọn chân tưới'}
                                                                    </Text>
                                                                    <Entypo
                                                                        name="chevron-down"
                                                                        size={20}
                                                                        color="#00b4d8"
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )}
                                            </FastField>
                                        )}

                                        {/* plantId */}
                                        {/* {!isEditMode && (
                                            <FastField name="plantId">
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
                                        )} */}
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
                                <ActionSheet
                                    ref={actionSheetRef}
                                    containerStyle={{ height: '30%' }}>
                                    <ScrollView>
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                                            (item, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            flexDirection: 'column',
                                                            padding: 8,
                                                            borderBottomColor:
                                                                AppColor.lightslategrey,
                                                            borderBottomWidth: 0.5,
                                                        }}
                                                        onPress={() => {
                                                            formikProps.setFieldValue(
                                                                'plantOrder',
                                                                item,
                                                            );
                                                            actionSheetRef.current?.hide();
                                                        }}>
                                                        <Text style={{ color: AppColor.black }}>
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            },
                                        )}
                                    </ScrollView>
                                </ActionSheet>
                            </View>
                        )}
                    </Formik>
                </View>
            }
        />
    );
}

export default ModalEditPlant;
