import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';
import Layout from '../admin/component/Layout/Layout';
import Review from '../admin/container/Review/Review'
import Category from'../admin/container/Category/Category'
import Counter from '../admin/container/Counter/Counter';
import Facility from '../admin/container/Facility/Facility';
import Coupon from '../admin/container/Coupon/Coupon';
import Contact from '../admin/container/Contact/Contact';
import Subcategori from '../admin/container/Subcategory/Subcategori';
import Variant from '../admin/container/Variant/Variant';
import Salespeople from '../admin/container/Salespeople/Salespeople';




function AdminRoute(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route exact path='/product' element={<Product />} />
                    <Route exact path='/review' element={<Review />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/counter' element={<Counter />} />
                    <Route exact path='/facility' element={<Facility />} />
                    <Route exact path='/coupon' element={<Coupon />} />
                    <Route exact path='/contect' element={<Contact/>} />
                    <Route exact path='/subcategori' element={<Subcategori/>} />
                    <Route exact path='/variant' element={<Variant/>} />
                  <Route exact path='/salspeople' element={<Salespeople/>}/>
                </Routes>
            </Layout>
        </>

    );
}

export default AdminRoute;