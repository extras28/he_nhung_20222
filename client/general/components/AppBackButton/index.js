import React from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { View, TouchableOpacity } from 'react-native';
import AppColor from 'general/constants/AppColor';

AppBackButton.propTypes = {
    additionnalStyle: PropTypes.object,
};

AppBackButton.defaultProps = {
    additionnalStyle: {},
};

function AppBackButton(props) {
    const { additionnalStyle } = props;
    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 6,
                borderRadius: 14,
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 5,
                ...additionnalStyle,
            }}>
            <IonIcon name="chevron-back" size={28} color={AppColor.black} />
        </TouchableOpacity>
    );
}

export default AppBackButton;
