import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data:{},
    submitted: false,
    token:{}
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateField: (state, action) => {
            console.log(action.payload);
            const { field, value } = action.payload;
            state.data[field] = value;
        },
        submitForm: (state) => {
            state.submitted = true;
        },
        resetForm: (state) => {
            state.data = {};
            state.submitted = false;
            state.token = {};
        },
    }
});

export const { updateField, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
