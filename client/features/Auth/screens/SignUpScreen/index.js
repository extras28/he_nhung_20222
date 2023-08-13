import authApi from 'api/authApi';
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
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

SignUpScreen.propTypes = {};

function SignUpScreen(props) {
    // MARK --- Params: ---
    const { t } = useTranslation();

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
                    source={AppResource.images.img_sign_up_bg}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        paddingHorizontal: 40,
                        paddingTop: 100,
                    }}>
                    {/* <ScrollView
                        style={{
                            flex: 1,
                            paddingHorizontal: 40,
                            paddingTop: 100,
                        }}> */}
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 40,
                            fontWeight: '600',
                            color: '#060606',
                        }}>
                        {t('Sign Up')}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 15,
                            color: '#A5AFA8',
                            marginBottom: 20,
                        }}>
                        {t('Create your new account')}
                    </Text>

                    <View>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                confirmPassword: '',
                                fullname: 'ADMIN',
                            }}
                            validationSchema={Yup.object({
                                fullname: Yup.string().required(t('Fullname is required')),
                                email: Yup.string().required(t('Email is required')),
                                password: Yup.string().required(t('Password is required')),
                                confirmPassword: Yup.string()
                                    .required(t('Please confirm the password!'))
                                    .oneOf(
                                        [Yup.ref('password'), null],
                                        t('Password does not match'),
                                    ),
                            })}
                            enableReinitialize
                            onSubmit={async values => {
                                AppLoadingHelper.current.show(t('Loading...'));
                                const params = { ...values };
                                // params.password = Utils.sha256(params.password);
                                delete params.confirmPassword;
                                try {
                                    const res = await authApi.signUp(params);
                                    const { result } = res.data;
                                    if (result === 'success') {
                                        NavigationHelper.goScreen(AppData.screens.LOGIN_SCREEN);
                                    }
                                } catch (error) {
                                    console.log(`${sTag} sign up error: ${error.message}`);
                                }
                                AppLoadingHelper.current.hide();
                                Utils.toast({
                                    message: t('Sign up successful'),
                                    duration: 2000,
                                });
                            }}>
                            {formikProps => (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        ...GlobalStyle.ViewSize.fullWidth,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                    <View style={{ marginVertical: 20 }}>
                                        {/* <FastField name="fullname">
                                            {({ field, form, meta }) => (
                                                <View
                                                    style={{
                                                        ...GlobalStyle.Margin.bottom(),
                                                    }}>
                                                    <DefaultTextInput
                                                        label={t('Fullname')}
                                                        placeholder={t('Enter your fullname')}
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
                                        </FastField> */}
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
                                        <FastField name="confirmPassword">
                                            {({ field, form, meta }) => (
                                                <View
                                                    style={{
                                                        ...GlobalStyle.Margin.bottom(),
                                                    }}>
                                                    <DefaultTextInput
                                                        label={t('Confirm password')}
                                                        placeholder={t('Confirm your password')}
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

                                        <View
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 20,
                                            }}>
                                            <Image
                                                source={AppResource.images.img_sign_up}
                                                style={{}}
                                            />
                                        </View>

                                        {/* <TouchableOpacity>
                                                <Text
                                                    style={{
                                                        color: '#BEC2C2',
                                                        textAlign: 'right',
                                                    }}>
                                                    {t('Forgot Password?')}
                                                </Text>
                                            </TouchableOpacity> */}

                                        <SubmitButton
                                            type="primary"
                                            text={t('Sign Up')}
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
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                marginTop: 10,
                                                color: '#666666',
                                            }}>
                                            <Text>
                                                {t('Already have an account?')}
                                                {'  '}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    NavigationHelper.goBack();
                                                }}>
                                                <Text
                                                    style={{
                                                        fontWeight: '600',
                                                        textDecorationLine: 'underline',
                                                    }}>
                                                    {t('Sign In')}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    {/* </ScrollView> */}
                </ImageBackground>
            </KeyboardAvoidingView>
        </BaseScreenView>
    );
}

export default SignUpScreen;
