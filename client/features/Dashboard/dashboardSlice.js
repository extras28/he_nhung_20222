import balconyApi from 'api/balconyApi';
import weatherApi from 'api/weatherApi';

const { createSlice, createAsyncThunk, current } = require('@reduxjs/toolkit');

export const thunkGetListBalcony = createAsyncThunk('dashbard/list', async (params, thunkApi) => {
    const res = await balconyApi.getListBalcony(params);
    return res;
});

export const thunkUpdateBalcony = createAsyncThunk('dashboard/update', async (params, thunkApi) => {
    const res = await balconyApi.update(params);
    return res;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isGettingListbalcony: false,
        balconies: [],
    },
    reducers: {},
    extraReducers: {
        [thunkGetListBalcony.pending]: (state, action) => {
            state.isGettingListbalcony = true;
        },
        [thunkGetListBalcony.rejected]: (state, action) => {
            state.isGettingListbalcony = false;
        },
        [thunkGetListBalcony.fulfilled]: (state, action) => {
            state.isGettingListbalcony = false;
            const { balconies, result } = action.payload.data;
            if (result === 'success') {
                state.balconies = balconies;
            }
        },

        [thunkUpdateBalcony]: (state, action) => {
            const { balcony, result } = action.payload;
            if (result === 'success') {
                console.log(current(state.balconies[0]), balcony._id);
                for (let i = 0; i < state.balconies.length; i++) {
                    console.log(current(state.balconies[i]), balcony._id);
                    if (state.balconies[i]._id == balcony._id) {
                        console.log('oke');
                        state.balconies[i] = balcony;
                        break;
                    }
                }
            }
        },
    },
});

const { reducer, actions } = dashboardSlice;
export const {} = actions;

export default reducer;
