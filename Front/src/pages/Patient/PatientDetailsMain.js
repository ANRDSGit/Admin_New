import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientDetailsMain = () => {

    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    // Function to fetch all patients initially
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get(`${apiUrl}/patients`, config);
                setPatients(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error("Unauthorized access. Please log in.");
                    navigate('/login');
                } else {
                    toast.error("Failed to fetch patients");
                }
            }
        };

        fetchPatients();
    }, [navigate, apiUrl]);

    // Handle search by email
    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Fetch patients by email
            const response = await axios.get(`${apiUrl}/patients/search?email=${searchQuery}`, config);

            if (response.data.length > 0) {
                setPatients(response.data);  // Set the search results in the state
            } else {
                toast.error("No patients found with this email.");
            }
        } catch (error) {
            toast.error("Failed to fetch patient details");
        }
    };

    const handlePatientClick = async (patientEmail) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(`${apiUrl}/patients/search?email=${patientEmail}`, config);
            const patient = response.data[0];

            if (patient && patient.userId) {
                navigate(`/profile/${patient.userId}`);
            } else {
                toast.error("User ID not found for this patient.");
            }
        } catch (error) {
            toast.error("Failed to fetch patient details");
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Patient List
            </Typography>

            <TextField
                label="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                fullWidth
            />

            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '10px' }}>
                Search
            </Button>

            <List style={{ marginTop: '20px' }}>
                {patients.map((patient) => (
                    <React.Fragment key={patient._id}>
                        <ListItem button onClick={() => handlePatientClick(patient.email)}>
                            <ListItemText primary={`${patient.name}`} secondary={patient.email} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default PatientDetailsMain;
