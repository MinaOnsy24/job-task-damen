import { createSlice } from '@reduxjs/toolkit'

const initialState = { allProducts: [] }

const products = createSlice({
    name: 'products',
    initialState: initialState,//or just write initialState  (becouse kye and value the same name)
    reducers: { //object
        //kye => the name i am called in anywere 
        //value => function that fired (state,action)=>{}
        addProducts: (state, action) => {
            const existingIndex = state.allProducts.findIndex(product => product.id === action.payload.id);

            if (existingIndex !== -1) {
                // If the product already exists, increment the count
                state.allProducts[existingIndex].count++;
            } else {
                // If the product doesn't exist, add it with count 1
                state.allProducts.push({ ...action.payload, count: 1 });
            }
        },
        removProducts: (state, action) => {
            const productIdToRemove = action.payload;
            state.allProducts = state.allProducts.filter(product => product.id !== productIdToRemove.id);
        },
        removeSpecificItem: (state, action) => {
            const { id } = action.payload;
            const existingIndex = state.allProducts.findIndex(product => product.id === id);
            if (existingIndex !== -1) {
                const product = state.allProducts[existingIndex];
                if (product.count > 1) {
                    // Decrement the count
                    state.allProducts[existingIndex].count--;
                } else {
                    // Remove the item from the array if count is 1
                    state.allProducts.splice(existingIndex, 1);
                }
            }
        }

    }


})
export const { addProducts, removProducts, removeSpecificItem, addSpecificItem } = products.actions
export default products.reducer