import React from 'react';
import { useIsFocused } from '@react-navigation/core';
import { StatusBar } from 'react-native';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar barStyle={'dark-content'} {...props} translucent animated /> : null;
}

export default FocusAwareStatusBar;
