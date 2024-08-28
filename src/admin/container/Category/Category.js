import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { editecategori, getcategori, handleAdd, handledelete } from '../../../redux/action/categori.action';

function Category() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(null);

  const dispatch = useDispatch();
  const categori = useSelector(state => state.categories);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUpdate(null);
  };

  useEffect(() => {
    dispatch(getcategori());
  }, [dispatch]);

  const ContactSchema = object({
    name: string().required(),
    description: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editecategori({ ...values, _id: update }));
      } else {
        dispatch(handleAdd(values));
      }

      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleBlur, handleChange, touched, errors, values, setValues } = formik;

  const handleDelete = (_id) => {
    dispatch(handledelete(_id));
  };

  const handleEdit = (data) => {
    setValues(data); // Set form values to the selected row data
    setOpen(true);
    setUpdate(data._id); // Set the current category ID being updated
  };

  const columns = [
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
      ),
    },
  ];

  return (
    <>
      <div style={{ textAlign: 'start', marginRight: '50px' }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Category
        </Button><br /><br />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{update ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Category Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name}
                helperText={errors.name && errors.name}
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
                helperText={errors.description && errors.description}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{update ? 'Update' : 'Add'}</Button>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categori.categori}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default Category;
