import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { editecategori, getcategori, handelAdd, handleAdd, handledelete } from '../../../redux/action/categori.action';

function Category(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState([]);
  const [update, setupdate] = useState(null)

  const dispatch = useDispatch();

  const categori = useSelector(state => state.categories)
  console.log(categori)



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setupdate(null)
  };

  // const handelAdd = async (data) => {
  //   console.log(data);
  // let localData = JSON.parse(localStorage.getItem('category'));
  // let rNo = Math.floor(Math.random() * 1000);

  // if (localData) {
  //   localData.push({ ...data, id: rNo });
  //   localStorage.setItem('category', JSON.stringify(localData));
  // } else {
  //   localStorage.setItem('category', JSON.stringify([{ ...data, id: rNo }]));
  // }
  // await fetch("http://localhost:8000/api/v1/categories/add-category", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(data)
  // }
  // )
  // getdata();
  // };

  // const getdatacat = async () => {
  //   // const localdata = JSON.parse(localStorage.getItem('category'));
  //   // if (localdata) {
  //   //   setdata(localdata);
  //   // }
  //   // const response = await fetch("http://localhost:8000/api/v1/categories/list-category");
  //   // const data = await response.json();
  //   // console.log(data);
  //   // setdata(data.data)
  //   dispatch(getcategori())
  // };

  useEffect(() => {
    // getdatacat();
    dispatch(getcategori())
  },
   []);

  // const handleediteData = async (data) => {

  //   // const localdata = JSON.parse(localStorage.getItem('category'));

  //   // const index = localdata.findIndex((v) => v.id === data.id);

  //   // localdata[index] = data;

  //   // localStorage.setItem('category', JSON.stringify(localdata));

  //   await fetch("http://localhost:8000/api/v1/categories/update-category/" + data._id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   getdata();

  // }

  let ContactSchema = object({
    name: string().required(),
    description: string().required()
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {

      if (update) {
        dispatch(editecategori(values))
      } else {
        dispatch(handleAdd(values));
      }

      resetForm()
      handleClose();
    }
  });
  const { handleSubmit, handleBlur, handleChange, touched, errors, values, setValues } = formik;


  const handledeletee = async (_id) => {
    // console.log(data);
    // const localdata = JSON.parse(localStorage.getItem('category'));
    // let fdata = localdata.filter((v) => v.id !== data.id)

    // localStorage.setItem('category', JSON.stringify(fdata));

    // try {
    //   await fetch("http://localhost:8000/api/v1/categories/delete-category/" + data._id, {
    //     method: "DELETE"
    //   })
    // } catch (error) {
    //   console.log(error);
    // }

    // getdata()
    // dispatch(handledelete())
    dispatch(handledelete(_id))
  }

  const handleedit = (data) => {
    setValues(data)
    setOpen(true);
    setupdate(data._id)

  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleedit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handledeletee(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>

      )
    },

  ];



  return (
    <>

      <div style={{ textAlign: 'start', marginRight: '50px' }}>
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Category
          </Button><br /><br />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add The Product</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="category"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={errors.name && touched.name ? true : false}
                  helperText={errors.name && errors.name ? errors.name : ''}
                />

                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="description"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={errors.description && touched.description ? true : false}
                  helperText={errors.description && errors.description ? errors.description : ''}
                />
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">{update ? 'update' : 'Add'}</Button>

                </DialogActions>
              </DialogContent>
            </form>
          </Dialog>
        </React.Fragment>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categori.categori}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          getRowId={row => row._id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default Category;
