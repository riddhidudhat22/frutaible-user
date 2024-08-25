import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { MenuItem, Select, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { subcategoriadd, subcategoridelete, subcategoriedite, subcategoriget } from '../../../redux/reducer/slice/subcategori.slice';

function Subcategori() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(null);

    const dispatch = useDispatch();
    const subcategories = useSelector(state => state.subcategories);

  

  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    const ContactSchema = object({
        categori_id: string().required(),
        name: string().required('Name is required'),
        description: string().required('Description is required')
    });

    const formik = useFormik({
        initialValues: {
            categori_id: '',
            name: '',
            description: ''
        },
        validationSchema: ContactSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                 // updateData(values);
                dispatch(subcategoriedite(values));
            } else {
                 // addData(values);
                dispatch(subcategoriadd(values));
            }
            resetForm();
            handleClose();
        }
    });

    const { handleSubmit, handleBlur, handleChange, touched, errors, values, setValues } = formik;

    const columns = [
        {
            field: 'categori_id', headerName: 'Category', width: 130,
            renderCell: (params) => {
                const category = data.find((v) => v._id === params.row.categori_id);
                return category ? category.name : '';
            }
        },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const getCategoryData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/categories/list-category");
            const data = await response.json();
            setData(data.data);
        } catch (error) {
            console.error(error);
        }
    };

     // const getSubcategoryData = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategory");
    //         const data = await response.json();
    //         console.log(data);
    //         setSubcategories(data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }

    // };

    useEffect(() => {
        getCategoryData();
        // getSubcategoryData();
        dispatch(subcategoriget());
    }, [dispatch]);

    
    // const addData = async (data) => {
    //     try {
    //         const response = await fetch("http://localhost:8000/api/v1/subcategories/add-subcategory", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         const datares = await response.json();

    //         console.log(datares);

    //     } catch (error) {
    //         console.error("Error adding subcategory:", error);
    //     }
    //     getSubcategoryData()
    // };

    // const updateData = async (data) => {
    //     try {
    //         await fetch("http://localhost:8000/api/v1/subcategories/update-subcategory/" + data._id, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         getSubcategoryData();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleEdit = (data) => {
        setUpdate(data._id);
        setValues(data);
        handleClickOpen();
    };

    const handleDelete = (_id) => {
          // try {
        //     await fetch("http://localhost:8000/api/v1/subcategories/delete-subcategory/" + data._id, {
        //         method: "DELETE"
        //     });

        //     getSubcategoryData();
        // } catch (error) {
        //     console.error(error);
        // }
        dispatch(subcategoridelete(_id));
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    return (
        <>
            <div style={{ textAlign: 'start', marginRight: '50px' }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Subcategory
                </Button><br /><br />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{update ? 'Update' : 'Add'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="categori_id-label">--select Category--</InputLabel>
                                <Select
                                    labelId="categori_id-label"
                                    id="categori_id"
                                    name="categori_id"
                                    value={values.categori_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="select category" />}
                                    MenuProps={MenuProps}
                                >
                                    {data.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.categori_id && touched.categori_id && <span style={{ color: "red" }}>{errors.categori_id}</span>}
                            </FormControl>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Category"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name ? errors.name : ''}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description}
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={subcategories.subcategories}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    getRowId={(row) => row._id}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Subcategori;
