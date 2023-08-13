import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import { thunkLogin } from 'features/Auth/authSlice';
import { FastField, Formik } from 'formik';
import { AppLoadingHelper } from 'general/components/AppLoading/index';
import BaseScreenView from 'general/components/BaseScreenView/index';
import DefaultTextInput from 'general/components/Forms/DefaultTextInput/index';
import SubmitButton from 'general/components/SubmitButton/index';
import AppColor from 'general/constants/AppColor';
import AppData from 'general/constants/AppData';
import AppResource from 'general/constants/AppResource';
import GlobalStyle from 'general/constants/GlobalStyle';
import NavigationHelper from 'general/helpers/NavigationHelper';
import Utils from 'general/utils/Utils';
import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

LoginScreen.propTypes = {};

const sTag = '[LoginScreen]';

function LoginScreen(props) {
    // MARK --- Params: ---
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { isGettingCurrentAccount } = useSelector(state => state?.auth);
    const navigation = useNavigation();

    // MARK --- Functions: ---
    // async function handleLogin() {
    //     refActiveSimLoading.current = true;
    //     try {
    //         const res = unwrapResult(await dispatch(thunkLogin()));
    //     } catch (error) {
    //         console.log(`${sTag} login error: ${error.message}`);
    //     }
    //     refActiveSimLoading.current = false;
    // }
    function resetNavigation() {
        navigation.reset({
            routes: [{ name: AppData.screens.DASHBOARD_HOME_SCREEN }],
            index: 0,
        });
    }

    return (
        <BaseScreenView
            safeAreaEdges={['left', 'right']}
            statusBarStyle={'dark-content'}
            backgroundColor={AppColor.bg}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <KeyboardAvoidingView
                style={{ flex: 1, overflow: 'scroll' }}
                behavior={AppData.consts.os === 'ios' ? 'padding' : 'height'}>
                <ImageBackground
                    source={AppResource.images.img_login_bg}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                    }}>
                    <View
                        style={[
                            {
                                flex: 1,
                                position: 'relative',
                                paddingHorizontal: 40,
                                paddingBottom: 5,
                                marginTop: insets.top,
                                paddingTop: 80,
                            },
                        ]}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string().required(t('Email is required')),
                                password: Yup.string().required(t('Password is required')),
                            })}
                            enableReinitialize
                            onSubmit={async values => {
                                AppLoadingHelper.current.show(t('Loading...'));
                                const params = { ...values };
                                // params.password = Utils.sha256(params.password);
                                try {
                                    const res = unwrapResult(await dispatch(thunkLogin(params)));
                                    const { result, account } = res.data;
                                    if (result === 'success') {
                                        NavigationHelper.goScreen(
                                            AppData.screens.DASHBOARD_HOME_SCREEN,
                                        );
                                        // resetNavigation();
                                        Utils.toast({
                                            message: t('Welcome, ', {
                                                fullname: account?.fullname,
                                            }),
                                        });
                                    }
                                } catch (error) {
                                    console.log(`${sTag} login error: ${error.message}`);
                                    // Utils.toast({
                                    //     message: t('Log in failed'),
                                    // });
                                }
                                AppLoadingHelper.current.hide();
                            }}>
                            {formikProps => (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        ...GlobalStyle.ViewSize.fullWidth,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                    <Image
                                        source={AppResource.images.img_logo}
                                        style={{ width: 50, height: 50, marginBottom: 30 }}
                                    />
                                    <Text
                                        style={{
                                            color: AppColor.primary,
                                            fontWeight: '900',
                                            fontSize: 30,
                                            marginBottom: 10,
                                        }}>
                                        {t('Sign In')}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#A6A6A6',
                                            fontWeight: '400',
                                            fontSize: 15,
                                        }}>
                                        {t('Sign in now to access your smart balcony')}
                                    </Text>
                                    <View style={{ marginVertical: 20 }}>
                                        <FastField name="email">
                                            {({ field, form, meta }) => (
                                                <View
                                                    style={{
                                                        ...GlobalStyle.Margin.bottom(),
                                                    }}>
                                                    <DefaultTextInput
                                                        label="Email"
                                                        placeholder={t('Enter your email')}
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
                                        <FastField name="password">
                                            {({ field, form, meta }) => (
                                                <View
                                                    style={{
                                                        ...GlobalStyle.Margin.bottom(),
                                                    }}>
                                                    <DefaultTextInput
                                                        label={t('Password')}
                                                        placeholder={t('Enter your password')}
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

                                        <TouchableOpacity>
                                            <Text style={{ color: '#BEC2C2', textAlign: 'right' }}>
                                                {t('Forgot Password?')}
                                            </Text>
                                        </TouchableOpacity>

                                        <SubmitButton
                                            type="primary"
                                            text={t('Sign In')}
                                            onPress={() => {
                                                formikProps.handleSubmit();
                                            }}
                                            activeShadow
                                            style={{
                                                marginTop: 30,
                                                borderWidth: 0,
                                                borderColor: AppColor.primary,
                                            }}
                                            // isPending={isPending}
                                        />

                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                marginTop: 10,
                                                color: '#666666',
                                            }}>
                                            <Text>
                                                {t('Don’t have an account?')}
                                                {'  '}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    NavigationHelper.goScreen(
                                                        AppData.screens.SIGN_UP_SCREEN,
                                                    );
                                                }}>
                                                <Text
                                                    style={{
                                                        fontWeight: '600',
                                                        textDecorationLine: 'underline',
                                                    }}>
                                                    {t('Sign Up')}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </BaseScreenView>
    );
}

export default LoginScreen;
