import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import AppColor from 'general/constants/AppColor';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

CardPlantItem.propTypes = {
    balconyItem: PropTypes.object,
    onPress: PropTypes.func,
    onPressEdit: PropTypes.func,
    onPressDelete: PropTypes.func,
};

CardPlantItem.defaultProps = {
    balconyItem: {},
    onPress: null,
    onPressEdit: null,
    onPressDelete: null,
};
function CardPlantItem(props) {
    // --- Params: ---
    const { balconyItem, onPress, onPressEdit, onPressDelete } = props;
    const [showDropdown, setShowDropdown] = useState(false);

    // MARK --- Functions: ---
    function handlePressEdit() {
        if (onPressEdit) {
            onPressEdit();
        }
    }

    function handlePressDelete() {
        if (onPressDelete) {
            onPressDelete();
        }
    }

    function handlePress() {
        if (onPress) {
            onPress();
        }
    }
    return (
        <TouchableOpacity
            onPress={() => {
                handlePress();
            }}>
            <View
                style={{
                    borderColor: '#FFFFFF',
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.5);',
                    borderWidth: 2,
                    marginTop: 20,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderColor: '#FFFFFF',
                            borderRadius: 20,
                            borderWidth: 2,
                            marginRight: 20,
                        }}
                        source={{ uri: balconyItem?.image }}
                    />
                    <Text style={{ fontWeight: '600', color: AppColor.darkslategrey }}>
                        {balconyItem?.name}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            // position: 'absolute',
                            // top: 10,
                            // right: 10,
                            zIndex: 20,
                            backgroundColor: 'white',
                            padding: 5,
                            borderRadius: 5,
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 9,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 10,
                            elevation: 5,
                        }}
                        onPress={() => {
                            setShowDropdown(!showDropdown);
                        }}>
                        <Entypo name="dots-three-horizontal" size={15} color={AppColor.darkgrey} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        display: showDropdown ? 'flex' : 'none',
                        position: 'absolute',
                        top: 0,
                        right: 50,
                        zIndex: 100,
                        borderRadius: 3,
                        backgroundColor: 'white',
                        paddingVertical: 10,
                    }}>
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                        onPress={() => {
                            handlePressEdit();
                            setShowDropdown(false);
                        }}>
                        <MaterialCommunityIcons name="pencil" size={25} color={AppColor.blue} />
                        <Text style={{ marginLeft: 10, color: AppColor.black }}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                        onPress={() => {
                            handlePressDelete();
                            setShowDropdown(false);
                        }}>
                        <MaterialCommunityIcons
                            name="trash-can-outline"
                            size={25}
                            color={AppColor.red}
                        />
                        <Text style={{ marginLeft: 10, color: AppColor.black }}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CardPlantItem;
