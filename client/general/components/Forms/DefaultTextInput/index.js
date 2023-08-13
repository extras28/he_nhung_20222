import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import GlobalStyle from 'general/constants/GlobalStyle';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';

DefaultTextInput.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    keyboardType: PropTypes.string,
    isSecure: PropTypes.bool,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    enableCheckValid: PropTypes.bool,
    showValidState: PropTypes.bool,
    isTouched: PropTypes.bool,
    isValid: PropTypes.bool,
    feedbackText: PropTypes.string,
    enableClearText: PropTypes.bool,
    appendElement: PropTypes.element,

    buttonMode: PropTypes.bool,
    onPress: PropTypes.func,
    required: PropTypes.bool,
};

DefaultTextInput.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    text: '',
    disabled: false,
    readonly: false,
    multiline: false,
    keyboardType: 'default',
    isSecure: false,
    required: false,

    onChange: null,
    onBlur: null,
    onFocus: null,
    enableCheckValid: false,
    showValidState: false,
    isValid: true,
    isTouched: false,
    feedbackText: '',
    enableClearText: true,
    appendElement: null,
    prependElement: null,

    buttonMode: false,
    onPress: null,
};

/**
 *
 * @param {{
 * label: string,
 * value: string,
 * placeholder: string,
 * text: string | element,
 * disabled: boolean,
 * readonly: boolean,
 * multiline: boolean,
 * isSecure: boolean,
 * keyboardType: string,
 * onChange: function,
 * onBlur: function,
 * onFocus: function,
 * enableCheckValid: boolean,
 * showValidState: boolean,
 * isValid: boolean,
 * isTouched: boolean,
 * feedbackText: string,
 * enableClearText: boolean,
 * appendElement: element,
 * prependElement: element,
 * buttonMode: boolean,
 * onPress: function,
 * required: boolean,
 * style: StyleProp<ViewStyle>,
 * }} props
 * @returns
 */
function DefaultTextInput(props) {
    // MARK: --- Params ---
    const {
        label,
        value,
        placeholder,
        text,
        disabled,
        readonly,
        multiline,
        keyboardType,
        isSecure,
        onChange,
        onBlur,
        onFocus,
        enableCheckValid,
        showValidState,
        isValid,
        isTouched,
        feedbackText,
        enableClearText,
        appendElement,
        prependElement,
        buttonMode,
        onPress,
        required,
        style,
    } = props;
    const [focus, setFocus] = useState(false);
    const isShowClearButton = enableClearText && focus && value?.length > 0;
    const showError = isTouched && !isValid;
    const [showSecureText, setShowSecureText] = useState(!isSecure);

    // MARK: --- Functions ---
    function handlePress() {
        if (onPress && buttonMode) {
            onPress();
        }
    }

    return (
        <View style={style}>
            {label.length > 0 && (
                <View
                    style={{
                        ...GlobalStyle.View.horizontal,
                        ...GlobalStyle.Margin.bottom(0.4),
                    }}>
                    <Text
                        style={{
                            fontFamily: AppResource.Fonts.semiBold,
                            fontSize: 14,
                            color: AppColor.grey80,
                        }}>
                        {label}
                    </Text>
                    {required && (
                        <Text
                            style={{
                                fontFamily: AppResource.Fonts.semiBold,
                                fontSize: 14,
                                color: '#C80022',
                                marginLeft: 2,
                            }}>
                            (*)
                        </Text>
                    )}
                </View>
            )}

            <View
                style={{
                    position: 'relative',
                    backgroundColor: focus ? '#fff' : '#F3F5F8',
                    height: multiline ? 80 : 46,
                    borderRadius: 10,
                    ...GlobalStyle.Padding.all(0.5),
                    ...GlobalStyle.View.horizontal,
                    alignItems: multiline ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: showError
                        ? '#E13853'
                        : isValid && focus
                        ? '#61B15A'
                        : 'transparent',
                }}>
                {prependElement && prependElement}
                <TextInput
                    style={{
                        textAlignVertical: multiline ? 'top' : 'center',
                        color: AppColor.grey80,
                        fontFamily: AppResource.Fonts.regular,
                        flex: 1,
                        ...GlobalStyle.ViewSize.fullHeight,
                        padding: 0,
                    }}
                    placeholderTextColor={AppColor.grey60}
                    multiline={multiline}
                    secureTextEntry={isSecure && !showSecureText}
                    numberOfLines={multiline ? 3 : 1}
                    editable={!disabled}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={currentText => {
                        if (onChange) {
                            onChange(currentText);
                        }
                    }}
                    onBlur={() => {
                        setFocus(false);
                        if (onBlur) {
                            onBlur();
                        }
                    }}
                    onFocus={() => {
                        setFocus(true);
                        if (onFocus) {
                            onFocus();
                        }
                    }}
                />

                {isSecure && value.length > 0 && (
                    <TouchableOpacity
                        style={[
                            {
                                backgroundColor: 'transparent',
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                ...GlobalStyle.ViewAlignment.center,
                                ...GlobalStyle.Margin.right(0.2),
                            },
                            multiline && {
                                alignSelf: 'flex-start',
                            },
                        ]}
                        onPress={() => {
                            setShowSecureText(!showSecureText);
                        }}>
                        <Image
                            source={
                                !showSecureText
                                    ? AppResource.icons.ic_eye_available
                                    : AppResource.icons.ic_eye_slash
                            }
                            style={{
                                resizeMode: 'contain',
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                )}

                {isShowClearButton && (
                    <TouchableOpacity
                        style={[
                            {
                                backgroundColor: 'transparent',
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                ...GlobalStyle.ViewAlignment.center,
                            },
                            multiline && {
                                alignSelf: 'flex-start',
                            },
                        ]}
                        onPress={() => {
                            if (onChange) {
                                onChange('');
                            }
                        }}>
                        <Image
                            source={AppResource.icons.ic_input_clear}
                            style={{
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                )}

                {appendElement && appendElement}

                {buttonMode && !disabled && (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            ...GlobalStyle.ViewSize.full,
                        }}
                        onPress={handlePress}
                    />
                )}
            </View>

            {enableCheckValid && !_.isEmpty(feedbackText) && showError && (
                <Text
                    style={{
                        fontFamily: AppResource.Fonts.regular,
                        fontSize: 14,
                        color: '#C80022',
                        ...GlobalStyle.Margin.top(0.5),
                    }}>
                    {feedbackText}
                </Text>
            )}
        </View>
    );
}

export default DefaultTextInput;
