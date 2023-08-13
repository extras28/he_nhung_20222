/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from 'features/Auth/screens/SignUpScreen/index';
import LaunchScreen from 'features/LaunchScreen/index';
import AppLoading from 'general/components/AppLoading/index';
import ScaleToast, { ScaleToastRef } from 'general/components/AppToast/index';
import { navigationRef } from 'general/helpers/NavigationHelper';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './app/i18n';
import { persistor, store } from './app/store';
import LoginScreen from './features/Auth/screens/LoginScreen';
import DashboardHomeScreen from './features/Dashboard/screens/DashboardHomeScreen';
import AppData from './general/constants/AppData';
import PlantHomeScreen from 'features/Plant/screens/PlantHomeScreen';
import PlantDetailScreen from 'features/Plant/screens/PlantDettailScreen';
import DataCommonListener from 'general/listeners/DataCommonListener';
import { injectStore } from 'general/helpers/WebSocketHelper';

const Stack = createStackNavigator();

const sTag = '[App.js]';

function App(): JSX.Element {
    // MARK: --- Hooks ---
    useEffect(() => {
        console.log(`${sTag} did load`);
        injectStore(store);

        return () => {
            console.log(`${sTag} will dismiss`);
        };
    }, []);
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <I18nextProvider i18n={i18n}>
                        {/* navigator */}
                        <AppNavigator />
                        {/* root component */}
                        <RootComponent />
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}

/**
 * Các component cần truy cập trong cả app
 */
function RootComponent() {
    return (
        <>
            <ScaleToast toastRef={ScaleToastRef} />
            <DataCommonListener />
            <AppLoading />
            {/* <AlertDialog alertRef={alertRef} /> */}
        </>
    );
}

function AppNavigator() {
    //TODO: initialRouteName
    let initialRouteName = AppData.screens.LAUNCH_SCREEN;
    // let initialRouteName = AppData.screens.PLANT_HOME_SCREEN;
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen
                    name={AppData.screens.LAUNCH_SCREEN}
                    component={LaunchScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <Stack.Screen
                    name={AppData.screens.LOGIN_SCREEN}
                    component={LoginScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <Stack.Screen
                    name={AppData.screens.SIGN_UP_SCREEN}
                    component={SignUpScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <Stack.Screen
                    name={AppData.screens.DASHBOARD_HOME_SCREEN}
                    component={DashboardHomeScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <Stack.Screen
                    name={AppData.screens.PLANT_HOME_SCREEN}
                    component={PlantHomeScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <Stack.Screen
                    name={AppData.screens.PLANT_DETAIL_SCREEN}
                    component={PlantDetailScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
