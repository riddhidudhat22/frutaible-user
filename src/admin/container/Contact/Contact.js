
import React, { useContext, useEffect, useState } from 'react';
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
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ContactContext } from '../../../context/Contactcontext';

function Contact(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)

    const contact = useContext(ContactContext)
    console.log(contact);



    const handleClickOpen = () => {
        setOpen(true);
        setupdate(false)
        formik.resetForm()
    };

    const handleClose = () => {
        setOpen(false);
    };

    let contectSchema = object({
        address: string().required(),
        email: string().email().required(),
        phone: number().required(),
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            email: '',
            phone: ''
        },
        validationSchema: contectSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                contact.editecontact(values)
            } else {
                contact.addcontact(values)
            }
            handleClose()
            resetForm()

        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, values, touched, setValues } = formik;
    useEffect(() => {
        contact.getcontact()
    }, [])
    const handeldelete = (id) => {
        contact.deletecontact(id)
    }

    const handeledite = (data) => {
        setupdate(true)
        setOpen(true);
        setValues(data)
    }

    const columns = [
        { field: 'address', headerName: 'address ', width: 130 },
        { field: 'email', headerName: 'email', width: 130 },
        { field: 'phone', headerName: 'phone', width: 130 },
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
                Contact
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Contact</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>

                        <TextField
                            margin="dense"
                            id="address"
                            name="address"
                            label="address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            error={errors.address && touched.address ? true : false}
                            helperText={errors.address && touched.address ? errors.address : ''}

                        />

                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="email"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : ''}

                        />

                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="phone"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={errors.phone && touched.phone ? true : false}
                            helperText={errors.phone && touched.phone ? errors.phone : ''}

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
                    rows={contact.contact}
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

export default Contact;