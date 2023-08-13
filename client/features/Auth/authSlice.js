import authApi from 'api/authApi';
import variable from 'general/constants/variable';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const thunkLogin = createAsyncThunk('auth/login', async (params, thunkApi) => {
    const res = await authApi.login(params);
    return res;
});

export const thunkLogOut = createAsyncThunk('auth/log-out', async (params, thunkApi) => {
    const res = await authApi.logOut(params);
    return res;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isGettingCurrentAccount: false,
        currentAccount: {},
    },
    reducers: {},
    extraReducers: {
        [thunkLogin.pending]: (state, action) => {
            state.isGettingCurrentAccount = true;
        },
        [thunkLogin.rejected]: (state, action) => {
            state.isGettingCurrentAccount = false;
        },
        [thunkLogin.fulfilled]: (state, action) => {
            state.isGettingCurrentAccount = false;
            const { result, account } = action.payload.data;
            if (result === 'success') {
                state.currentAccount = account;
                variable.accessToken = account.accessToken;
                state.isLoggedIn = true;
            }
        },

        [thunkLogOut.fulfilled]: (state, action) => {
            const { result } = action.payload.data;
            if (result === 'success') {
                state.currentAccount = {};
                variable.accessToken = '';
            }
        },
    },
});

const { reducer, actions } = authSlice;
export const {} = actions;

export default reducer;
