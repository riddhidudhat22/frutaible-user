import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getdata, getdatapro, productdata } from '../../../redux/action/product.action';
import { decress, incress, remoeproduct } from '../../../redux/reducer/slice/addtocart.slice';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { couponget } from '../../../redux/reducer/slice/coupon.slice';
import { ThemeContext } from '../../../context/Themcontext';
import Button from '../../component/UI/Button/Button';


function Cart(props) {
  const [discount, setdiscount] = useState('');
  const [shiping, setshiping] = useState(0)

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const product = useSelector(state => state.product)
  console.log(cart, product);

  const coupon = useSelector(state => state.coupon)
  console.log(coupon);


  useEffect(() => {
    dispatch(getdatapro())
    dispatch(couponget())
  }, [])

  const habdlecoupon = (data) => {
    // console.log(data);
    let flag = 0;
    let per = 0;

    coupon.coupon.map((v) => {
      if (v.coupon === data.coupon) {
        const corentdate = new Date();
        const expirydate = new Date(v.expiry);
        if (corentdate < expirydate) {
          flag = 1;
          per = v.discount
          setdiscount(per);
        } else {
          flag = 2;
        }
      }
    });

    if (flag === 0) {
      console.log("Invalid coupon");
      formik.setFieldError('coupon', 'Invalid coupon')
    } else if (flag === 1) {
      formik.setFieldError('coupon', `coupon aplaed sucessfull.You got ${per}% disscount`)
    } else if (flag === 2) {
      formik.setFieldError('coupon', 'expiry coupon')
    }

    // if (shiping <= 150) {
    //   shipingamt = 100;
    //   setshiping(shipingamt)
    // }
  }
  let couponSchema = object({
    coupon: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      coupon: ''
    },
    validationSchema: couponSchema,
    onSubmit: values => {
      habdlecoupon(values)
    },
  });
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;
  const product_data = cart.cart.map((v) => {
    console.log(v.pid);

    const cartdata = product.product.find((v1) => v1.id === v.pid)
    console.log(cartdata);

    return { ...cartdata, qty: v.qty }
  })
  console.log(product_data);

  const handleIncrementQuantity = (id) => {
    dispatch(incress(id));
  };

  const handledecrementqty = (id) => {
    dispatch(decress(id))
  }

  const handleremove = (id) => {
    dispatch(remoeproduct(id))
  }

  const subtotal = product_data.reduce((acc, v) => acc + (v.price * v.qty), 0);
  const discount_amt = (subtotal * discount) / 100;
  const shiping1 = subtotal <= 100 ? 100 : 0
  const Total = subtotal - discount_amt + shiping1;


  const themcontext = useContext(ThemeContext)
  console.log(themcontext);

  const handletheme = () => {
    themcontext.togaleTheme(ThemeContext.theme)
  }


  return (
    <div>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Cart Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead className={`${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  product_data.map((v) => (
                    <tr>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img src={`../${v.img}`} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                        </div>
                      </th>
                      <td>
                        <p className={`mb-0 mt-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>{v.name}</p>
                      </td>
                      <td>
                        <p className={`mb-0 mt-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>{v.price} $</p>
                      </td>
                      <td>
                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handledecrementqty(v.id)} >
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                          <span className="form-control form-control-sm text-center border-0">
                            {v.qty}
                          </span>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleIncrementQuantity(v.id)}>
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className={`mb-0 mt-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>{(v.price * v.qty).toFixed(2)} $</p>
                      </td>
                      <td>
                        <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleremove(v.id)}>
                          <i className="fa fa-times text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <input type="text"
                name='coupon'
                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                placeholder="Coupon Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.coupon}
              />
              <Button
                type="submit"
                btndisabaled={true}
                btnType='primary'
                >
                Apply Coupon
              </Button>
            </form>
            {
              errors.coupon && touched.coupon ? <span style={{ color: 'red' }}>{errors.coupon}</span> : null
            }
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className={` rounded ${themcontext.theme === 'dark' ? 'colorclass' : 'bg-light'}`}>
                <div className="p-4">
                  <h1 className={`display-6 mb-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>Cart <span className="fw-normal">Total</span></h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className={`mb-0 me-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>Subtotal:</h5>
                    <p className="mb-0">${(subtotal).toFixed(2)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    {
                      discount > 0 &&
                      <>

                        <h5 className={`mb-0 me-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>Discount</h5>
                        <div className>
                          <p className="mb-0">${discount_amt}</p>
                        </div>

                      </>
                    }
                  </div><br />
                  <div className="d-flex justify-content-between">
                    <h5 className={`mb-0 me-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>Shipping</h5>
                    <div className>
                      <p className="mb-0">Flat rate: ${shiping1}</p>
                    </div>
                  </div>
                  <p className="mb-0 text-end">Shipping to Ukraine.</p>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className={`mb-0 ps-4 me-4 ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>Total</h5>
                  <p className="mb-0 pe-4">${(Total).toFixed(2)}</p>
                </div>
                <Button btnType='primary'>
                  Proceed Checkout
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Cart;