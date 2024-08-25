import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { date, object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deletesalepeople, editeselespeople, getselsepeople, habdleadd } from '../../../redux/action/salespeople.action';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { FormGroup } from '@mui/material';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

function Salespeople(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setupdate(null);
    };

    const dispatch = useDispatch();

    const salespeoples = useSelector(state => state.salespeple);
    console.log(salespeoples);

    let ContactSchema = object({
        SNAME: string().required(),
        CITY: string().required(),
        COMM: string().required(),
        isActive: string().required(),

    });

    const formik = useFormik({
        initialValues: {
            SNAME: '',
            CITY: '',
            COMM: '',
            isActive: 1,

        },
        validationSchema: ContactSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                dispatch(editeselespeople(values));
            } else {
                dispatch(habdleadd(values));
            }

            resetForm();
            handleClose();
        }
    });

    const columns = [
        { field: 'SNAME', headerName: 'Name', width: 130 },
        { field: 'CITY', headerName: 'CITY', width: 130 },
        { field: 'COMM', headerName: 'COMM', width: 130 },
        { field: 'COMM', headerName: 'COMM', width: 130 },
        {
            field: 'isActive', headerName: 'Status', width: 80,
            renderCell: (params) => (
                params.value === 1 ? "Active" : "Inactive"
            )
        },

        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleedit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handledeletee(params.row.SNUM)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const { handleSubmit, handleBlur, handleChange, touched, errors, values, setValues } = formik;

    useEffect(() => {
        dispatch(getselsepeople());
    }, [dispatch]);

    const handleedit = (data) => {
        setValues(data);
        setOpen(true);
        setupdate(data.SNUM);
    };

    const handledeletee = (SNUM) => {
        dispatch(deletesalepeople(SNUM));
    };


    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));


    return (
        <>
            <div style={{ textAlign: 'start', marginRight: '50px' }}>
                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Salespeople
                    </Button><br /><br />
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Salespeople</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="SNAME"
                                    name="SNAME"
                                    label="SNAME"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.SNAME}
                                    error={errors.SNAME && touched.SNAME}
                                    helperText={errors.SNAME && touched.SNAME ? errors.SNAME : ''}
                                />
                                <TextField
                                    margin="dense"
                                    id="CITY"
                                    name="CITY"
                                    label="CITY"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.CITY}
                                    error={errors.CITY && touched.CITY}
                                    helperText={errors.CITY && touched.CITY ? errors.CITY : ''}
                                />
                                <TextField
                                    margin="dense"
                                    id="COMM"
                                    name="COMM"
                                    label="COMM"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.COMM}
                                    error={errors.COMM && touched.COMM}
                                    helperText={errors.COMM && touched.COMM ? errors.COMM : ''}
                                />

                                <FormGroup>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography>Inactive</Typography>
                                        <AntSwitch defaultChecked
                                            checked={values.isActive === 1}
                                            onChange={() => formik.setFieldValue('isActive', values.isActive === 1 ? 0 : 1)}
                                            inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography>Active</Typography>
                                    </Stack>
                                </FormGroup>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </React.Fragment>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={salespeoples.salespeple}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    getRowId={row => row.SNUM}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Salespeople;
