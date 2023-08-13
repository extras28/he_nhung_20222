import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../FocusAwareStatusBar/index';
// import FocusAwareStatusBar from '../FocusAwareStatusBar';
import styles from './style';

BaseScreenView.propTypes = {
    safeAreaEdges: PropTypes.arrayOf(PropTypes.string),
    tabBarVisible: PropTypes.bool,
    statusBarStyle: PropTypes.string,
    backgroundColor: PropTypes.string,
};

BaseScreenView.defaultProps = {
    safeAreaEdges: ['left', 'right', 'bottom', 'top'],
    tabBarVisible: false,
    statusBarStyle: 'dark-content',
    backgroundColor: 'white',
};

function BaseScreenView(props) {
    // Params
    const { safeAreaEdges, tabBarVisible, statusBarStyle, backgroundColor } = props;
    // const tabBarHeight = useBottomTabBarHeight();

    return (
        <SafeAreaView
            style={[
                styles.viewContainer,
                tabBarVisible &&
                    {
                        // paddingBottom: tabBarHeight,
                    },
                {
                    backgroundColor: backgroundColor,
                },
            ]}
            edges={safeAreaEdges}>
            <FocusAwareStatusBar backgroundColor={'transparent'} barStyle={statusBarStyle} />
            {props.children}
        </SafeAreaView>
    );
}

export default BaseScreenView;
