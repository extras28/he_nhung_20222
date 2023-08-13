import {
    createNavigationContainerRef,
    DrawerActions,
    StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const NavigationHelper = {
    /**
     * Chuyen toi 1 man hinh
     * @param {string} screenName Ten man hinh
     * @param {object} params Tham so
     */
    goScreen: (screenName, params) => {
        if (navigationRef.isReady()) {
            navigationRef.navigate(screenName, params);
        }
    },

    /**
     * Chuyen toi 1 man hinh trong 1 tab
     * @param {string} screenName Ten man hinh
     * @param {object} params Tham so
     */
    goToScreenInTab: (tabName, screenName, params) => {
        if (navigationRef.isReady()) {
            navigationRef.navigate(tabName, { screen: screenName }, params);
        }
    },

    /**
     * Quay lai man hinh truoc do
     */
    goBack: () => {
        if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    },

    /**
     * Thay the man hinh hien tai
     * @param {string} screenName Ten man hinh
     */
    replaceScreen: screenName => {
        if (navigationRef.isReady()) {
            if (navigationRef.current.getCurrentRoute()?.name !== screenName) {
                navigationRef.dispatch(StackActions.replace(screenName));
            }
        }
    },

    openDrawer: () => {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(DrawerActions.openDrawer());
        }
    },

    closeDrawer: () => {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(DrawerActions.closeDrawer());
        }
    },
};

export default NavigationHelper;
