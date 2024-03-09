import { configureStore } from '@reduxjs/toolkit'
import  sideBarReducer from './redux/sidebarSlice'
import popUpReducer  from "./redux/popupSlice" 
import brandReducer from "./redux/brandSlice"
import colourReducer from "./redux/colourSlice"
import productCategoryReducer from "./redux/productcategorySlice"
import productReducer from "./redux/productSlice"
import blogCategoryReducer from "./redux/blogcategorySlice"
import blogReducer from "./redux/blogSlice"
import couponReducer from "./redux/couponSlice"
import orderReducer from "./redux/ordersSlice"
import deleteActionReducer from "./redux/deleteActionSlice"
import spinnerReducer from "./redux/spinnerSlice"
import orderItemReducer from './redux/orderItemSlice'
import enquiryReducer from './redux/enquirySlice'
import displayEquiryReducer from "./redux/displayEnquirySlice"
import oneMessageReducer from "./redux/oneMessageSlice"





export const store = configureStore({
    reducer: {
        sidebarController: sideBarReducer,
        popUpController: popUpReducer,
        brand: brandReducer,
        colour: colourReducer,
        productCategory: productCategoryReducer,
        product: productReducer,
        blogCategory: blogCategoryReducer,
        blog: blogReducer,
        deleteAction:deleteActionReducer,
        coupon: couponReducer,
        order: orderReducer,
        spinner: spinnerReducer,
        orderItem: orderItemReducer,
        enquiry: enquiryReducer,
        displayEquiry: displayEquiryReducer,
        oneMessage: oneMessageReducer
     
    }
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch