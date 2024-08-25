import React, { useContext } from 'react';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import Shopdetail from '../user/container/Shopdetail/Shopdetail';
import Cart from '../user/container/Page/Cart';
import Checkout from '../user/container/Page/Checkout';
import Testimonial from '../user/container/Page/Testimonial';
import Error from '../user/container/Page/Error';
import Contact from '../user/container/Conract/Contact';
import Footer from '../user/component/Footer/Footer';
import PrivateRoute from './PrivateRoute';
import Review from '../user/container/Review/Review';
import { ThemeContext } from '../context/Themcontext';
import Category from '../admin/container/Category/Category';
import Login from '../user/container/Login/Login'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authcheck } from '../redux/reducer/slice/authlogin';


function UserRoute(props) {
  const theme=useContext(ThemeContext)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(authcheck())
  },[])
  return (
    <>
    <div className={theme.theme}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/shop" element={<Shop />} />
          {/* <Route exact path='/shop/:id' element={<Shop />} /> */}
        </Route>
        <Route exact path="/shop/:id" element={<Shopdetail />} />
        <Route exact path="/review" element={<Review />} />
        <Route exact path="/page" />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/error" element={<Error />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/Category" element={<Category />} />
        <Route exact path="/login" element={<Login />} />

      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default UserRoute;