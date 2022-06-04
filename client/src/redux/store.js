import { configureStore } from '@reduxjs/toolkit';
import userData from "../redux/user-slice"
import imageData from "../redux/data"



export default configureStore({
    reducer:{
        userData,
        imageData:imageData, 
    }
});