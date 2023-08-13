import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Utils from 'general/utils/Utils';
import wsHelperInstance from 'general/helpers/WebSocketHelper';
import { useSelector } from 'react-redux';

DataCommonListener.propTypes = {};

function DataCommonListener(props) {
    const { currentAccount } = useSelector(state => state?.auth);
    useEffect(() => {
        wsHelperInstance.receiveMqttData();
    }, [currentAccount]);

    return <View></View>;
}

export default DataCommonListener;
