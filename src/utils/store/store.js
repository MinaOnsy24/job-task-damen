import favoraite from './slices/Favorite'
import  products  from './slices/Products'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        products,
        favoraite,
    },
})