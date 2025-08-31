import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';

// ✅ Nigeria States and LGAs (Simplified for example; full list below)
const statesAndLGAs = {
  Lagos: ['Alimosho', 'Ikeja', 'Eti-Osa', 'Surulere'],
  Kano: ['Dala', 'Nasarawa', 'Fagge', 'Gwale'],
  Rivers: ['Port Harcourt', 'Obio-Akpor'],
  FCT: ['Abuja Municipal', 'Bwari'],
  // ... add all 36 states and LGAs
};

const ambulanceFacilities = [
  'Oxygen',
  'Defibrillator',
  'Stretcher',
  'First Aid Kit',
  'Neonatal Care',
  'ECG Machine',
  'Ventilator'
];

const AmbulanceForm = ({ ambulance, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      ambulanceNumber: ambulance?.ambulanceNumber || '',
      driverName: ambulance?.driverName || '',
      driverContact: ambulance?.driverContact || '',
      vehicleType: ambulance?.vehicleType || 'Basic',
      facilities: ambulance?.facilities || [],
      status: ambulance?.status || 'Available',
      state: ambulance?.location?.state || '',
      lga: ambulance?.location?.lga || ''
    },
    validationSchema: Yup.object({
      ambulanceNumber: Yup.string().required('Required'),
      driverName: Yup.string().required('Required'),
      driverContact: Yup.string().required('Required'),
      vehicleType: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      lga: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          ...values,
          location: {
            state: values.state,
            lga: values.lga
          }
        };
        delete payload.state;
        delete payload.lga;

        if (ambulance) {
          console.log('SUBMIT PAYLOAD:', payload);
          await axios.patch(`http://localhost:5000/api/ambulances/${ambulance._id}`, payload);
          toast.success('Ambulance updated successfully');
        } else {
          await axios.post('http://localhost:5000/api/ambulances', payload);
          toast.success('Ambulance created successfully');
        }
        onSuccess();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  });

  const lgaOptions = formik.values.state ? statesAndLGAs[formik.values.state] || [] : [];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Existing fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ambulance Number"
            name="ambulanceNumber"
            value={formik.values.ambulanceNumber}
            onChange={formik.handleChange}
            error={formik.touched.ambulanceNumber && Boolean(formik.errors.ambulanceNumber)}
            helperText={formik.touched.ambulanceNumber && formik.errors.ambulanceNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              name="vehicleType"
              value={formik.values.vehicleType}
              onChange={formik.handleChange}
              label="Vehicle Type"
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
              <MenuItem value="Mobile ICU">Mobile ICU</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Driver Name"
            name="driverName"
            value={formik.values.driverName}
            onChange={formik.handleChange}
            error={formik.touched.driverName && Boolean(formik.errors.driverName)}
            helperText={formik.touched.driverName && formik.errors.driverName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Driver Contact"
            name="driverContact"
            value={formik.values.driverContact}
            onChange={formik.handleChange}
            error={formik.touched.driverContact && Boolean(formik.errors.driverContact)}
            helperText={formik.touched.driverContact && formik.errors.driverContact}
          />
        </Grid>

        {/* ✅ New Location Fields */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              label="State"
            >
              {Object.keys(statesAndLGAs).map((state) => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>LGA</InputLabel>
            <Select
              name="lga"
              value={formik.values.lga}
              onChange={formik.handleChange}
              label="LGA"
              disabled={!formik.values.state}
            >
              {lgaOptions.map((lga) => (
                <MenuItem key={lga} value={lga}>{lga}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Status and Facilities */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              label="Status"
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Dispatched">Dispatched</MenuItem>
              <MenuItem value="On Route">On Route</MenuItem>
              <MenuItem value="Arrived">Arrived</MenuItem>
              <MenuItem value="Unavailable">Unavailable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={ambulanceFacilities}
            value={formik.values.facilities}
            onChange={(event, newValue) => {
              formik.setFieldValue('facilities', newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Facilities" placeholder="Select facilities" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : ambulance ? 'Update Ambulance' : 'Create Ambulance'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AmbulanceForm;
