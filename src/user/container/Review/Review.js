import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { addreviewdata, deletereviewdata, editteviewdata, reviewtdata } from '../../../redux/action/review.action';
import { ThemeContext } from '../../../context/Themcontext';

function Review(props) {

    const [update, setupdate] = useState(false)


    const dispatch = useDispatch()

    const reviews1 = useSelector(state => state.review)
    console.log(reviews1);

    let reviewSchema = object({
        name: string().required(),
        email: string().required(),
        review: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: ''
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editteviewdata(values))
            } else {
                dispatch(addreviewdata(values))
            }

            resetForm()
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setValues } = formik;

    const handelEdit = (data) => {

        setupdate(data)
        setValues(data)
    }

    const handelDelete = (id) => {
        dispatch(deletereviewdata(id))
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'review', headerName: 'Review', width: 130 },
        { field: 'rating', headerName: 'Rating', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handelEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handelDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];
    useEffect(() => {
        dispatch(reviewtdata())
    }, [])

    const themcontext = useContext(ThemeContext)
    console.log(themcontext);

    const handletheme = () => {
        themcontext.togaleTheme(ThemeContext.theme)
    }
    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className='row g-4'>
                            <form action="#" onSubmit={handleSubmit}>
                                <h4 className={`mb-5 fw-bold ${themcontext.theme === 'dark' ? 'colorclass' : ''}`}>Leave a Reply</h4>
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input
                                                name='name'
                                                type="text"
                                                id='name'
                                                className="form-control border-0 me-4"
                                                placeholder="Yur Name *"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            <span style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input
                                                name='email'
                                                type="email"
                                                id='email'
                                                className="form-control border-0"
                                                placeholder="Your Email *"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            <span style={{ color: 'red' }}>{errors.email && touched.email ? errors.email : ''}</span>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="border-bottom rounded my-4">
                                            <textarea className="form-control border-0"
                                                cols={30}
                                                rows={8}
                                                placeholder="Your Review *"
                                                spellCheck="false"
                                                defaultValue={""}
                                                name='review'
                                                id='review'
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.review}
                                            />
                                            <span style={{ color: 'red' }}>{errors.review && touched.review ? errors.review : ''}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between py-3 mb-5">
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 me-3">Please rate:</p>
                                                <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                                    <i className="fa fa-star text-muted" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                </div>
                                            </div>
                                            <button href="#" className="btn border border-secondary text-primary rounded-pill px-4 py-3">{update ? "Update" : "Post Comment"}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div style={{ height: 400, width: '100%' }} >
                                <DataGrid
                                    rows={reviews1.review}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;