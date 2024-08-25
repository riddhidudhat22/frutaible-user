import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addfacility, deletefacility, editeffacility } from '../../../redux/action/facility.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { HashLoader } from 'react-spinners';




function Facility(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)

    const dispatch = useDispatch();

    const facility = useSelector(state => state.facility);
    console.log(facility);

    const handleClickOpen = () => {
        setOpen(true);
        setupdate(false)
        formik.resetForm()
    };

    const handleClose = () => {
        setOpen(false);
    };

    let facilitySchema = object({
        name: string().required(),
        description: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: facilitySchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                dispatch(editeffacility(values))
            } else {
                const rNo = Math.floor(Math.random() * 1000)
                dispatch(addfacility({ ...values, id: rNo }))
            }

            resetForm();
            handleClose()



        },
    });
    const { handleBlur, handleChange, handleSubmit, errors, touched, values, setValues } = formik

    const handeldelete = (id) => {
        // console.log(id);
        facility.isLoading ? <HashLoader color="#2874ca" /> : dispatch(deletefacility(id))

    }
    const handeledite = (data) => {
        facility.isLoading ? <p>loading</p> :
            // console.log(data);
            setupdate(true)
        setOpen(true);
        setValues(data)
    }
    const columns = [
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'description', headerName: 'Description', width: 200 },
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



    return (
        <>
            {
                facility.isLoading ? <HashLoader color="#2874ca" /> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Facility
                        </Button><br /><br />
                        <Dialog
                            open={open}
                            onClose={handleClose}

                        >
                            <DialogTitle>Facility</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>

                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Facility name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        error={errors.name && errors.name ? true : false}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="description name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        error={errors.description && errors.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
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
                                rows={facility.facility}
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
                    </>
            }
        </>
    );
}

export default Facility;