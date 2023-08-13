import { createSlice } from '@reduxjs/toolkit';
import i18n from './i18n';

export const initialState = {
    language: i18n.language,
    flagAppLoadingHideDone: null,
};

// MARK: --- Thunks ---

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        /**
         *
         * @param state
         * @param {{payload:'vi'|'en'}} action
         */
        setLanguage(state, { payload }) {
            if (_.isString(payload) && !_.isEmpty(payload)) {
                state.language = payload;
            } else {
                if (state.language == 'vi') {
                    state.language = 'en';
                } else {
                    state.language = 'vi';
                }
            }
        },
        setFlagAppLoadingHideDone: (state, action) => {
            state.flagAppLoadingHideDone = action.payload;
        },
    },
    extraReducers: {},
});

export const { setLanguage, setFlagAppLoadingHideDone } = AppSlice.actions;
export default AppSlice.reducer;
