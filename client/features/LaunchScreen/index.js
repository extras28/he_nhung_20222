import { useNavigation } from '@react-navigation/native';
import BaseScreenView from 'general/components/BaseScreenView/index';
import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import AppStyle from 'general/constants/AppStyle';
import Utils from 'general/utils/Utils';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function () {
    const [loaded, setLoaded] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 2000);
    }, []);

    useEffect(() => {
        if (loaded) {
            // navigation.replace(Screens.AUTH_LOGIN);
            Utils.goToLogin(navigation);
        }
    }, [loaded, navigation]);

    return (
        <BaseScreenView
            safeAreaEdges={['left', 'right']}
            statusBarStyle={'dark-content'}
            backgroundColor="#E3FFD1">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={AppResource.images.img_logo}
                    style={{
                        width: 120,
                        height: 120,
                    }}
                />
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: AppStyle.FontSizes.s_20,
                            color: AppColor.black,
                        }}>
                        Smart{' '}
                    </Text>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: AppStyle.FontSizes.s_20,
                            color: AppColor.feature,
                        }}>
                        Balcony
                    </Text>
                </View>
            </View>
        </BaseScreenView>
    );
}
