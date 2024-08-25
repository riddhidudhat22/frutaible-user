import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { couponadd, coupondelete, couponedite, couponget } from '../../../redux/reducer/slice/coupon.slice';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Coupon(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)

    const dispatch = useDispatch()



    const coupon = useSelector(state => state.coupon)
    console.log(coupon);

    useEffect(() => {
        dispatch(couponget())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
        setupdate(false)
        formik.resetForm()
    };

    const handleClose = () => {
        setOpen(false);
    };

    let couponSchema = object({
        coupon: string().required(),
        discount: number().required(),
        expiry: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            coupon: '',
            discount: '',
            expiry: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(couponedite(values))
            } else {
                dispatch(couponadd(values))
            }
            handleClose()
            resetForm()

        },
    });
    const { handleBlur, handleSubmit, handleChange, errors, values, touched, setValues } = formik;

    const handeldelete = (id) => {
        dispatch(coupondelete(id))
    }

    const handeledite = (data) => {
        setupdate(true)
        setOpen(true);
        setValues(data)
    }

    const columns = [
        { field: 'coupon', headerName: 'Coupon name', width: 130 },
        { field: 'discount', headerName: 'discount', width: 130 },
        { field: 'expiry', headerName: 'expiry', width: 130 },
        {
            field: 'action',
            headerName: "Action",
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edite" onClick={() => handeledite(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={() => handeldelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        }
    ];

    const rows = [

    ];

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Coupon
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Coupon</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>

                        <TextField
                            margin="dense"
                            id="coupon"
                            name="coupon"
                            label="Coupon name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ''}

                        />

                        <TextField
                            margin="dense"
                            id="discount"
                            name="discount"
                            label="discount"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discount}
                            error={errors.discount && touched.discount ? true : false}
                            helperText={errors.discount && touched.discount ? errors.discount : ''}

                        />

                        <TextField
                            margin="dense"
                            id="expiry"
                            name="expiry"
                            label="expiry date"
                            type="date"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.expiry}
                            error={errors.expiry && touched.expiry ? true : false}
                            helperText={errors.expiry && touched.expiry ? errors.expiry : ''}

                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? "Update" : "Add"}</Button>
                        </DialogActions>
                    </DialogContent>

                </form>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={coupon.coupon}
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
    );
}

export default Coupon;