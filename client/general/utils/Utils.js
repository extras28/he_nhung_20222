// Util functions
import axios from 'axios';
import { ScaleToastRef } from 'general/components/AppToast/index';
import AppData from 'general/constants/AppData';
import { sha256 } from 'js-sha256';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

// import mqtt from 'mqtt';
// const broker = 'mqtt://broker.mqttdashboard.com:1883';
moment.locale('vi');

const Utils = {
    // sha256
    sha256: text => {
        return sha256(text);
    },

    // Check object empty
    isObjectEmpty: obj => {
        return (
            Utils.isObjectNull(obj) || (Object.keys(obj).length === 0 && obj.constructor === Object)
        );
    },

    // Check is full url
    checkFullUrl: url => {
        if (url && url.startsWith('http')) {
            return true;
        }
        return false;
    },

    // Check object null|undefine
    isObjectNull: obj => {
        return obj === null || obj === undefined || obj === 'NULL';
    },

    // convert first character of string to uppercase
    convertFirstCharacterToUppercase: stringToConvert => {
        var firstCharacter = stringToConvert.substring(0, 1);
        var restString = stringToConvert.substring(1);
        return firstCharacter.toUpperCase() + restString;
    },

    // format number
    formatNumber: iNumber => {
        return new Intl.NumberFormat('de-DE').format(iNumber);
    },

    // format date time
    formatDateTime: (sDateTime, sFormat = 'DD/MM/YYYY HH:mm', utc = false) => {
        if (utc) {
            return moment(sDateTime).utc().format(sFormat);
        }
        return moment(sDateTime).local().format(sFormat);
    },

    // get time ago
    timeAgo: sDateTime => {
        const momentTime = moment.utc(sDateTime);
        return momentTime.fromNow();
    },

    // Change empty to null
    formatEmptyKey: items => {
        for (const [key, value] of Object.entries(items)) {
            if (value === '' || value === undefined) {
                items[key] = null;
            }
        }
    },

    // remove null key
    removeNullKey: items => {
        for (const [key, value] of Object.entries(items)) {
            if (_.isNull(value)) {
                delete items[key];
            }
        }
    },

    // Delete null
    formatNullKey: items => {
        for (const [key, value] of Object.entries(items)) {
            if (_.isNull(value)) {
                delete items[key];
            }
        }
    },

    // get last array item
    getLastItem: items => {
        if (items && Array.isArray(items) && items.length > 0) {
            return items[items.length - 1];
        }
        return null;
    },

    /**
     * Convert file size to MB
     * @param {number} sizeInBytes File size in bytes
     * @returns
     */
    fileSizeInMB: sizeInBytes => {
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        return sizeInMB;
    },

    blurColor: (colorCode, opacity) => {
        return `rgba(${parseInt(colorCode.slice(1, 3), 16)}, ${parseInt(
            colorCode.slice(3, 5),
            16,
        )}, ${parseInt(colorCode.slice(5, 7), 16)}, ${opacity})`;
    },

    convertStringToNumber: string => {
        let cleanedString =
            typeof string === 'string'
                ? string.includes(',')
                    ? string.replace(',', '')
                    : string
                : string;
        // return new Intl.NumberFormat('de-DE').format(parseInt(cleanedString));
        return parseInt(cleanedString);
    },

    allElementsZero: array => {
        for (let element of array) {
            if (element !== 0) {
                return false;
            }
        }
        return true;
    },

    getBaseURL: () => {
        let baseURL = 'https://api.openweathermap.org/data/2.5';
        return baseURL;
    },

    getWeatherIcon: code => {
        return `https://openweathermap.org/img/wn/${code}@2x.png`;
    },

    formatDatetimeFromTimestamp: (sTimeStamp, sFormat) => {
        return moment.unix(sTimeStamp).format(sFormat);
    },

    divideTimestampsByDate: (timestamps, specialDay) => {
        // Convert the special day to a UTC date object
        const specialDate = new Date(specialDay);

        // Initialize an object to store the grouped timestamps
        const groupedTimestamps = [];

        // Loop through each timestamp in the array
        timestamps?.forEach(timestamp => {
            // Convert the timestamp to a UTC date object
            const date = new Date(timestamp.dt * 1000);

            // If the date of the timestamp matches the special day
            if (
                date.getUTCFullYear() === specialDate.getUTCFullYear() &&
                date.getUTCMonth() === specialDate.getUTCMonth() &&
                date.getUTCDate() === specialDate.getUTCDate()
            ) {
                // Get the date string in ISO format (e.g. "2023-03-24")
                const dateString = date.toISOString().substr(0, 10);

                // If the date string has not been added to the groupedTimestamps object yet
                if (!groupedTimestamps[dateString]) {
                    // Initialize an empty array for the date
                    groupedTimestamps[dateString] = [];
                }

                // Add the timestamp to the array for the date
                groupedTimestamps.push(timestamp);
            }
        });

        // Return the grouped timestamps object
        return groupedTimestamps;
    },

    filterDatesAfterNow: dateStrings => {
        const currentDate = moment();
        const filteredDates = dateStrings.filter(dateString => {
            const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss');
            return date.isAfter(currentDate);
        });
        return filteredDates.map(date => date.format('YYYY-MM-DD HH:mm:ss'));
    },

    /**
     *
     * @param {ScaleToastParams} params
     */
    toast(params) {
        ScaleToastRef.current?.show(params);
    },
    goToLogin(navigation) {
        navigation.reset({
            routes: [{ name: AppData.screens.LOGIN_SCREEN }],
            index: 0,
        });
    },

    requestAppPermission: async permission => {
        const result = await request(permission);
        return result;
    },
    checkAppPermission: async permission => {
        const res = await check(permission);
        if (res === RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    },

    uploadCloudinary: async file => {
        try {
            // const formData = new FormData();
            // formData.append('file', {
            //     uri: file.uri,
            //     type: file.type,
            //     name: file.fileName,
            // });
            let base64Img = `data:image/png;base64,${file.base64}`;
            let data = {
                file: base64Img,
                upload_preset: 'SmartBalcony',
            };
            // formData.append('upload_preset', 'WebTechnology');
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dc7pxknio/upload',
                JSON.stringify(data),
                { headers: { 'content-type': 'application/json' } },
            );
            if (res) {
                return res.data.secure_url;
            }
        } catch (error) {
            console.error({
                result: 'failed',
                message: 'Upload file to cloudinary failed',
                reason: error,
            });
        }
    },

    // const topic = 'DUNGNA';

    // connectMQTT: topic => {
    //     try {
    //         const client = mqtt.connect(broker, options);
    //         console.log('MQTT connected!');
    //         client.on('connect', () => {
    //             client.subscribe(topic);
    //         });
    //         client.on('message', (tp, msg) => {
    //             var data = JSON.parse(msg);
    //             // var data = JSON.stringify(msg)

    //             console.log('Received MQTT msg:', data);
    //             // updateData(data)
    //             // updateData(data);
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
};

export default Utils;
