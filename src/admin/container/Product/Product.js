import React, { useEffect, useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, IconButton,
  InputLabel, MenuItem, OutlinedInput, Select
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { HashLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as yup from 'yup';
import { addproductdata, deleteproductdata, editproductdata, getdata, getdatapro } from '../../../redux/action/product.action';

function Product(props) {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [categoridata, setCategoridata] = useState([]);
  const [subcategoridata, setsubCategoridata] = useState([]);
  const [selectsub, setselectsub] = useState([])
  const dispatch = useDispatch();


  const product = useSelector(state => state.product);
  console.log(product);

  const getCategoryData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/categories/list-category");
      const data = await response.json();
      setCategoridata(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubcategoryData = async (categoryId) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategory");
      const data = await response.json();
      setsubCategoridata(data.data);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    dispatch(getdatapro());
    getCategoryData();
    getSubcategoryData();
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdate(false);
    formik.resetForm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const productSchema = yup.object({
    categori_id: yup.string().required("Category is required"),
    subcategori_id: yup.string().required("Subcategory is required"),
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    image: yup.mixed()
      .required("Please select an image")
      .test("fileSize", "The file is too large", (value) => {
        if (value.size) {
          return value && value.size <= 2 * 1024 * 1024; // 2MB
        }
        return true
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (value.type) {
          return (
            value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        }
        return true
      }),
    price: yup.string().required("Price is required"),
    stock: yup.number().required("Stock is required").positive().integer()
  });

  const formik = useFormik({
    initialValues: {
      categori_id: '',
      subcategori_id: '',
      name: '',
      description: '',
      image: '',
      price: '',
      stock: ''
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editproductdata(values));
      } else {
        dispatch(addproductdata(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleBlur, handleChange, handleSubmit, touched, errors, values, setValues, setFieldValue } = formik;


  const handlecategorichange = async (categori_id) => {
    // handleChange(event.target.value)
    // console.log(event.target.value);
    const response = await fetch(`http://localhost:8000/api/v1/subcategories/getsubcategoridata-by-categorydata/${categori_id}`)
    const data = await response.json();
    console.log(data);
    setselectsub(data.data)
  }

  const selectchange = (event) => {
    setFieldValue("categori_id", event.target.value)
    handlecategorichange(event.target.value)
    setFieldValue("subcatagori_id", "")

  }
  const handleDelete = (_id) => {
    dispatch(deleteproductdata(_id));
  };

  const handleEdit = async(data) => {
    setUpdate(data._id);
    setOpen(true);
    setValues(data);
    await handlecategorichange(data.categori_id);
  };

  const columns = [
    {
      field: 'categori_id', headerName: 'Category', width: 180,
      renderCell: (params) => {
        const category = categoridata.find((v) => v._id === params.row.categori_id);
        return category ? category.name : '';
      }
    },

    {
      field: 'subcategori_id', headerName: 'Subcategory', width: 180,
      renderCell: (params) => {
        const subcategory = subcategoridata.find((v) => v._id === params.row.subcategori_id);
        return subcategory ? subcategory.name : '';
      }
    },
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'description', headerName: 'Description', width: 120 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        console.log(params.row.image);
        if (params.row.image && params.row.image.url) {
          return <img src={params.row.image.url
          } alt={params.row.name} width={50} />;
        } else {
          return null;
        }
      },
    },
    { field: 'price', headerName: 'Price', width: 90 },
    { field: 'stock', headerName: 'Stock', width: 90 },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
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

  console.log("value++++++", values.image.url);

  return (
    <>
      {product.isloading ? (
        <HashLoader color="#2874ca" />
      ) : product.error ? (
        <p>{product.error}</p>
      ) : (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Product
          </Button>
          <br /><br />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Product</DialogTitle>
            <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
              <DialogContent>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="categori_id-label">--select Category--</InputLabel>
                  <Select
                    labelId="categori_id-label"
                    id="categori_id"
                    name="categori_id"
                    value={values.categori_id}
                    onChange={selectchange}
                    input={<OutlinedInput label="select category" />}
                    MenuProps={MenuProps}
                  >
                    {/* {categoridata.map((v) => (
                      <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                    ))} */}
                     {(categoridata || []).map((v) => (
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
                    onChange={handleChange}
                    input={<OutlinedInput label="select subcategory" />}
                    MenuProps={MenuProps}
                  >
                    {/* {selectsub.map((v) => (
                      <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                    ))} */}

{(selectsub || []).map((v) => (
      <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
    ))}
                  </Select>
                  {errors.subcategori_id && touched.subcategori_id ? errors.subcategori_id : ''}
                </FormControl>

                <input
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
                />
                {
                  values.image &&
                  <img src={values.image.url ? values.image.url : URL.createObjectURL(values.image)} width={50} />
                }
                
                {/* {
                  values.image &&
                  <img src={typeof values.image.url === 'string' ? values.image.url : URL.createObjectURL(values.image)} width={50} alt="Product" />
                } */}

                {errors.image && touched.image ? <span style={{ color: "red" }}>{errors.image}</span> : null}

                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Product Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.description && touched.description}
                  helperText={errors.description && touched.description ? errors.description : ''}
                />
                <TextField
                  margin="dense"
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.price && touched.price}
                  helperText={errors.price && touched.price ? errors.price : ''}
                />

                <TextField
                  margin="dense"
                  id="stock"
                  name="stock"
                  label="Stock"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.stock && touched.stock}
                  helperText={errors.stock && touched.stock ? errors.stock : ''}
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{update ? "Update" : "Add"}</Button>
              </DialogActions>
            </form>
          </Dialog>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={product.product}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              getRowId={row => row._id}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </>
      )}
    </>
  );
}

export default Product;
