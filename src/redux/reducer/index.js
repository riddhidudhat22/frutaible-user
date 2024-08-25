import { combineReducers } from "redux";
import { counterredux } from "./counter.reducer";
import { facilityReducer } from "./facility.reducer";
import { productReducer } from "./product.reducer";
import { shopReducer } from "./shop.reducer";
import { reviweReducer } from "./review.reducer";
import counterSlice from "./slice/couner.slice";
import addtocartSlice from "./slice/addtocart.slice";
import couponSlice from "./slice/coupon.slice";
import { categoriReducer } from "./categori.reducer";
import subcategoriSlice from "./slice/subcategori.slice";
import { variantReducer } from "./variant.reducer";
import { salespeopleReducer } from "./salespeople.reducer";
// import { authlogSlice } from "./slice/authlogin";
import authSlice from "./slice/authlogin";
import alertslice from "./slice/alert"

export const rootReducer = combineReducers({
    counter: counterredux,
    facility: facilityReducer,
    product: productReducer,
    shop: shopReducer,
    review: reviweReducer,
    counter_slice: counterSlice,
    cart: addtocartSlice,
    coupon: couponSlice,
    categories: categoriReducer,
    subcategories: subcategoriSlice,
    variants: variantReducer,
    salespeple: salespeopleReducer,
    auth:authSlice,
    alert:alertslice
})