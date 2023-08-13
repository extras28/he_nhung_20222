import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppColor from 'general/constants/AppColor';
import {
    ImageBackground,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import BaseScreenView from 'general/components/BaseScreenView';
import AppResource from 'general/constants/AppResource';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import CardPlantItem from 'features/Plant/components/CardPlantItem';
import { thunkGetListPlant, thunkGetPlantDetail } from 'features/Plant/plantSlice';
import Global from 'general/constants/Global';
import NavigationHelper, { navigationRef } from 'general/helpers/NavigationHelper';
import AppData from 'general/constants/AppData';
import ModalEditPlant from 'features/Plant/components/ModalEditPlant';
import ModalDeleteBalcony from 'features/Dashboard/components/ModalDeleteBalcony';
import { AppLoadingHelper } from 'general/components/AppLoading';
import plantApi from 'api/plantApi';
import { useTranslation } from 'react-i18next';
import Utils from 'general/utils/Utils';

PlantHomeScreen.propTypes = {};

const sTag = '[PlantHomeScreen]';

function PlantHomeScreen(props) {
    // MARK --- Params: ---
    const [showingModalEditPlant, setShowingModalEditPlant] = useState(false);
    const [showingModalDeletePlant, setShowingModalDeletePlant] = useState(false);
    const [selectedPlantItem, setSelectedPlantItem] = useState(null);
    const { plants, isGettingPlant } = useSelector(state => state?.plant);
    const [loading, setLoading] = useState(isGettingPlant);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // MARK --- Functions: ---
    async function handleDeletePlant() {
        try {
            AppLoadingHelper.current.show(t('Loading...'));
            const res = await plantApi.deletePlant({ _id: selectedPlantItem._id });
            const { result } = res.data;
            if (result === 'success') {
                Utils.toast({
                    message: t('Xóa vòi thành công'),
                });
                dispatch(
                    thunkGetListPlant({
                        balconyId: Global.balconyItem.balconyId,
                    }),
                );
                setShowingModalDeletePlant(false);
            }
            AppLoadingHelper.current.hide();
        } catch (error) {
            console.error(`${sTag} delete plant error: ${error.message}`);
        }
    }
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
                        <TouchableOpacity
                            onPress={() => {
                                navigationRef.goBack();
                            }}>
                            <Ionicons name="chevron-back-circle" size={30} color={AppColor.white} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: AppColor.black, fontWeight: '600' }}>
                            {Global.balconyItem?.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowingModalEditPlant(true);
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
                                refreshing={isGettingPlant}
                                tintColor={AppColor.white}
                                onRefresh={() => {
                                    console.log('refresh');
                                    dispatch(
                                        thunkGetListPlant({
                                            balconyId: Global.balconyItem?.balconyId,
                                        }),
                                    );
                                }}
                            />
                        }>
                        {plants?.map((item, index) => {
                            return (
                                <CardPlantItem
                                    key={index}
                                    balconyItem={item}
                                    onPress={() => {
                                        dispatch(thunkGetPlantDetail({ plantId: item.plantId }));
                                        NavigationHelper.goScreen(
                                            AppData.screens.PLANT_DETAIL_SCREEN,
                                        );
                                    }}
                                    onPressEdit={() => {
                                        setSelectedPlantItem(item);
                                        setShowingModalEditPlant(true);
                                    }}
                                    onPressDelete={() => {
                                        setSelectedPlantItem(item);
                                        setShowingModalDeletePlant(true);
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ImageBackground>

            {/* modal edit plant */}
            <ModalEditPlant
                show={showingModalEditPlant}
                onClose={() => {
                    setShowingModalEditPlant(false);
                    setSelectedPlantItem(null);
                }}
                plantItem={selectedPlantItem}
            />

            {/* modal delete */}
            <ModalDeleteBalcony
                show={showingModalDeletePlant}
                onClose={() => {
                    setShowingModalDeletePlant(false);
                    setSelectedPlantItem(null);
                }}
                balconyItem={selectedPlantItem}
                onDelete={() => {
                    handleDeletePlant();
                    setSelectedPlantItem(null);
                }}
                title="Xóa vòi"
                isBalcony={false}
            />
        </BaseScreenView>
    );
}

export default PlantHomeScreen;
