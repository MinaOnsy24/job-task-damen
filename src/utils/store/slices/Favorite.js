import { createSlice } from '@reduxjs/toolkit'
const initialState = { allfavoraite: [] }
const favoraite = createSlice({
    name: 'favoraite',
    initialState: initialState,
    reducers: {
        addfavoraite: (state, action) => {
            const existingIndex = state.allfavoraite.findIndex(product => product.id === action.payload.id);
            if (existingIndex !== -1) {
                state.allfavoraite[existingIndex].count++;
            } else {
                state.allfavoraite.push({ ...action.payload, count: 1 });
            }
        },
        removfavoraite: (state, action) => {
            const productIdToRemove = action.payload;
            state.allfavoraite = state.allfavoraite.filter(product => product.id !== productIdToRemove.id);
        }
    }
})
export const { addfavoraite, removfavoraite} = favoraite.actions
export default favoraite.reducer