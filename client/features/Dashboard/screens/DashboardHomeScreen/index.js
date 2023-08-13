import { unwrapResult } from '@reduxjs/toolkit';
import balconyApi from 'api/balconyApi';
import CardBalconyItem from 'features/Dashboard/components/CardBalconyItem';
import ModalDeleteBalcony from 'features/Dashboard/components/ModalDeleteBalcony';
import ModalEditBalcony from 'features/Dashboard/components/ModalEditBalcony';
import { thunkGetListBalcony } from 'features/Dashboard/dashboardSlice';
import { thunkGetListPlant } from 'features/Plant/plantSlice';
import { AppLoadingHelper } from 'general/components/AppLoading';
import BaseScreenView from 'general/components/BaseScreenView/index';
import AppColor from 'general/constants/AppColor';
import AppData from 'general/constants/AppData';
import AppResource from 'general/constants/AppResource';
import Global from 'general/constants/Global';
import NavigationHelper from 'general/helpers/NavigationHelper';
import Utils from 'general/utils/Utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ImageBackground,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

DashboardHomeScreen.propTypes = {};

const sTag = '[DashboardHomeScreen]';

function DashboardHomeScreen(props) {
    // MARK --- Params: ---
    const [loading, setLoading] = useState(false);
    const [showingModalEditBalcony, setShowingModalEditBalcony] = useState(false);
    const [showingModalDeletebalcony, setShowingModalDeleteBalcony] = useState(false);
    const [selectedBalconyItem, setSelectedBalconyItem] = useState(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { balconies, isGettingListbalcony } = useSelector(state => state?.dashboard);

    // MARK --- Functions: ---
    async function getListBalcony() {
        try {
            const res = unwrapResult(await dispatch(thunkGetListBalcony({})));
        } catch (error) {
            console.error(`${sTag} get list balcony error: ${error.message}`);
        }
    }

    async function handleDeleteBalcony() {
        try {
            AppLoadingHelper.current.show(t('Loading...'));
            const res = await balconyApi.delete({ balconyId: selectedBalconyItem.balconyId });
            const { result } = res.data;
            if (result === 'success') {
                Utils.toast({
                    message: t('Xóa vườn thành công'),
                });
                dispatch(thunkGetListBalcony({}));
                setShowingModalDeleteBalcony(false);
            }
            AppLoadingHelper.current.hide();
        } catch (error) {
            console.error(`${sTag} delete balcony error: ${error.message}`);
        }
    }

    // MARK --- Hooks: ---
    useEffect(() => {
        getListBalcony();
    }, []);

    return (
        <BaseScreenView
            safeAreaEdges={['left', 'right']}
            statusBarStyle={'dark-content'}
            backgroundColor={AppColor.bg}>
            <ImageBackground
                source={AppResource.images.img_bg}
                resizeMode="cover"
                style={{
                    flex: 1,
                }}
                blurRadius={5}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        elevation: 12,
                        shadowColor: 'rgba(0, 0, 0, 0.15)',
                        shadowOffset: { width: 0, height: 12 },
                        shadowRadius: 50,
                        // paddingHorizontal: 30,
                    }}>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 40,
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                        }}>
                        {/* <TouchableOpacity
                            onPress={() => {
                                console.log('user');
                            }}>
                            <FontAwesome5Icon
                                name="user-alt"
                                size={20}
                                color={AppColor.slategray}
                            />
                        </TouchableOpacity> */}
                        <Text style={{ fontSize: 20, color: AppColor.black, fontWeight: '600' }}>
                            Vườn
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowingModalEditBalcony(true);
                            }}>
                            <AntDesignIcon
                                name="pluscircleo"
                                size={20}
                                color={AppColor.slategray}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={{ paddingHorizontal: 20 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={isGettingListbalcony}
                                tintColor={AppColor.white}
                                onRefresh={() => {
                                    console.log('refresh');
                                    getListBalcony();
                                    // dispatch(thunkGetProfile());
                                    // dispatch(thunkGetDashboardSummaryData());
                                    // dispatch(thunkGetDashboardRecentlyContracts());
                                }}
                            />
                        }>
                        {balconies?.map((item, index) => {
                            return (
                                <CardBalconyItem
                                    onPress={() => {
                                        Global.balconyItem = item;
                                        dispatch(thunkGetListPlant({ balconyId: item.balconyId }));
                                        NavigationHelper.goScreen(
                                            AppData.screens.PLANT_HOME_SCREEN,
                                        );
                                    }}
                                    key={index}
                                    image={item?.image}
                                    name={item?.name}
                                    humidity={parseInt(item?.humidity ?? 0)}
                                    temperature={parseInt(item?.temperature ?? 0)}
                                    onPressEdit={() => {
                                        setSelectedBalconyItem(item);
                                        setShowingModalEditBalcony(true);
                                    }}
                                    onPressDelete={() => {
                                        setSelectedBalconyItem(item);
                                        setShowingModalDeleteBalcony(true);
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ImageBackground>

            {/* modal edit */}
            <ModalEditBalcony
                show={showingModalEditBalcony}
                onClose={() => {
                    setShowingModalEditBalcony(false);
                    setSelectedBalconyItem(null);
                }}
                balconyItem={selectedBalconyItem}
            />

            {/* modal delete */}
            <ModalDeleteBalcony
                show={showingModalDeletebalcony}
                onClose={() => {
                    setShowingModalDeleteBalcony(false);
                    setSelectedBalconyItem(null);
                }}
                balconyItem={{ selectedBalconyItem }}
                onDelete={() => {
                    handleDeleteBalcony();
                    setSelectedBalconyItem(null);
                }}
                title="Xóa vườn"
            />
        </BaseScreenView>
    );
}

export default DashboardHomeScreen;
