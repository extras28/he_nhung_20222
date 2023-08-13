import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import AppColor from 'general/constants/AppColor';

CardPlantAction.propTypes = {
    disabled: PropTypes.bool,
    title: PropTypes.string,
    additionalElement: PropTypes.element,
};

CardPlantAction.defaultProps = {
    disabled: false,
    title: '',
    additionalElement: null,
};

function CardPlantAction(props) {
    // MARK --- Params: ---
    const { disabled, title, additionalElement } = props;
    return (
        <View
            style={{
                width: '100%',
                backgroundColor: disabled ? '#ced4da' : '#fff',
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Text style={{ color: disabled ? AppColor.darkgray : '#333' }}>{title}</Text>
            <View>{additionalElement}</View>
        </View>
    );
}

export default CardPlantAction;
