import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addvariant, deletevariant, editevariant, getVariant } from '../../../redux/action/variant.action';
import * as yup from 'yup';

function Variant() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);

    const dispatch = useDispatch();
    const variants = useSelector((state) => state?.variants?.variants || []);

    const getCategoryData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/categories/list-category");
            const data = await response.json();
            setCategoryData(data.data);

        } catch (error) {
            console.error(error);
        }
    };

    const getSubCategoryData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategory");
            const data = await response.json();
            setSubCategoryData(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getProductData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/products/list-product");
            const data = await response.json();
            setProductData(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        const response = await fetch(`http://localhost:8000/api/v1/subcategories/getsubcategoridata-by-categorydata/${categoryId}`);
        const data = await response.json();
        setSelectedSubCategories(data.data);
    };

    const handleSubCategoryChange = async (subCategoryId) => {
        const response = await fetch(`http://localhost:8000/api/v1/products/getroductdata-by-subcategorydata/${subCategoryId}`);
        const data = await response.json();
        setSelectedProducts(data.data);
    };

    useEffect(() => {
        getCategoryData();
        getSubCategoryData();
        getProductData();
        dispatch(getVariant())
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setDynamicFields([]);
        formik.setFieldValue('additionalFields', []);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
        setDynamicFields([]);
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.atributes).map(([key, value]) => ({ key, value })),
        });


        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.atributes).map(([key, value]) => ({ key, value })));

        handleCategoryChange(data.categori_id);

        handleSubCategoryChange(data.subcategori_id);
    };

    const ContactSchema = Yup.object().shape({
        isActive: Yup.boolean(),
        categori_id: Yup.string().required("Category is required"),
        subcategori_id: Yup.string().required("Subcategory is required"),
        product_id: Yup.string().required("Product is required"),
        // stock: Yup.string(),
        // price: Yup.string(),
        // discount: Yup.string(),
        // additionalFields: Yup.array().of(
        //     Yup.object().shape({
        //         key: Yup.string().required('Key is required'),
        //         value: Yup.string().required('Value is required')
        //     })
        // )
        // image: yup.mixed()
        //     .required("Please select an image")
        //     .test("fileSize", "The file is too large", (value) => {
        //         if (value.size) {
        //             return value && value.size <= 2 * 1024 * 1024; // 2MB
        //         }
        //         return true
        //     })
        //     .test("fileType", "Unsupported File Format", (value) => {
        //         if (value.type) {
        //             return (
        //                 value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        //             );
        //         }
        //         return true
        //     }),
    });

    const formik = useFormik({
        initialValues: {
            isActive: true,
            categori_id: '',
            subcategori_id: '',
            product_id: '',
            stock: '',
            price: '',
            discount: '',
            additionalFields: [],
            // image: '',
        },
        validationSchema: ContactSchema,
        onSubmit: (values, { resetForm }) => {
            const atributes = values.additionalFields.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {
                // price: values.price,
                // discount: values.discount,
                // stock: values.stock
            });

            const variantData = {
                ...values,
                atributes,
            };

            if (update) {
                dispatch(editevariant(variantData))
            } else {
                dispatch(addvariant(variantData))
            }
            handleClose();
            resetForm();
        }
    });

    const { handleSubmit, handleBlur, handleChange, touched, errors, values, setFieldValue } = formik;

    const handleDelete = (id) => {
        dispatch(deletevariant(id))
    };

    const columns = [
        {
            field: 'categori_id', headerName: 'Category', width: 180,
            renderCell: (params) => {
                const category = categoryData.find((v) => v._id === params.row.categori_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategori_id', headerName: 'Subcategory', width: 180,
            renderCell: (params) => {
                const subcategory = subCategoryData.find((v) => v._id === params.row.subcategori_id);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'product_id', headerName: 'Product', width: 180,
            renderCell: (params) => {
                const product = productData.find((v) => v._id === params.row.product_id);
                return product ? product.name : '';
            }
        },
        {
            field: 'atributes', headerName: 'Attributes', width: 300,
            renderCell: (params) => {
                const atributes = params.row.atributes;
                return atributes ? Object.entries(atributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        { field: 'stock', headerName: 'Stock', width: 90 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'discount', headerName: 'Discount', width: 90 },
        // {
        //     field: "image",
        //     headerName: "Image",
        //     width: 150,
        //     renderCell: (params) => {
        //         console.log(params.row.image);
        //         if (params.row.image && params.row.image.url) {
        //             return <img src={params.row.image.url
        //             } alt={params.row.name} width={50} />;
        //         } else {
        //             return null;
        //         }
        //     },
        // },
        {
            field: 'Action', headerName: 'Action', width: 130,
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

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    return (
        <>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Variant
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Variant</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="categori_id-label">--select Category--</InputLabel>
                                <Select
                                    labelId="categori_id-label"
                                    id="categori_id"
                                    name="categori_id"
                                    value={values.categori_id}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleCategoryChange(e.target.value);
                                    }}
                                    input={<OutlinedInput label="select category" />}
                                    MenuProps={MenuProps}
                                >
                                    {categoryData.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.categori_id && touched.categori_id ? errors.categori_id : ''}
                            </FormControl>

                            <FormControl fullWidth margin="dense">
                                <InputLabel id="subcategori_id-label">--select Subcategory--</InputLabel>
                                <Select
                                    labelId="subcategori_id-label"
                                    id="subcategori_id"
                                    name="subcategori_id"
                                    value={values.subcategori_id}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleSubCategoryChange(e.target.value);
                                    }}
                                    input={<OutlinedInput label="select subcategory" />}
                                    MenuProps={MenuProps}
                                >
                                    {selectedSubCategories.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.subcategori_id && touched.subcategori_id ? errors.subcategori_id : ''}
                            </FormControl>

                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product_id-label">--select Product--</InputLabel>
                                <Select
                                    labelId="product_id-label"
                                    id="product_id"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="select product" />}
                                    MenuProps={MenuProps}
                                >
                                    {selectedProducts.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.product_id && touched.product_id ? errors.product_id : ''}
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="dense"
                                id="stock"
                                name="stock"
                                label="Stock"
                                value={values.stock}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.stock && Boolean(errors.stock)}
                                helperText={touched.stock && errors.stock}

                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                id="price"
                                name="price"
                                label="Price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="Discount"
                                value={values.discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.discount && Boolean(errors.discount)}
                                helperText={touched.discount && errors.discount}
                            />
                            {/* <input
                                id="image"
                                name="image"
                                label="image"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                                onBlur={handleBlur}

                                sx={{ marginBottom: 2 }}
                            /> */}
                            {/* {
                                values.image &&
                                <img src={values.image.url ? values.image.url : URL.createObjectURL(values.image)} width={50} />
                            } */}

                            {/* {errors.image && touched.image ? <span style={{ color: "red" }}>{errors.image}</span> : null} */}
                            {dynamicFields.map((field, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <TextField
                                        label="Key"
                                        id={`additionalFields[${index}].key`}
                                        name={`additionalFields[${index}].key`}
                                        value={field.key}
                                        onChange={handleDynamicFieldChange(index, 'key')}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <TextField
                                        label="Value"
                                        value={field.value}
                                        id={`additionalFields[${index}].values`}
                                        name={`additionalFields[${index}].values`}
                                        onChange={handleDynamicFieldChange(index, 'value')}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <IconButton onClick={() => removeField(index)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </div>
                            ))}
                            <Button variant="outlined" onClick={addField} startIcon={<AddIcon />}>
                                Add Field
                            </Button>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={variants}
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
            </div>
        </>
    );
}

export default Variant;
