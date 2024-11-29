import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from 'axios';

function ResignationForm() {
    const [lastWorkingDay, setLastWorkingDay] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/resignation', {
                lastWorkingDay,
                reason,
            });
            setSuccessMessage('Resignation request submitted successfully.');
        } catch (err) {
            setError('Failed to submit resignation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Submit Resignation
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Last Working Day"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={lastWorkingDay}
                        onChange={(e) => setLastWorkingDay(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Reason"
                        variant="outlined"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        multiline
                        rows={4}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
            {successMessage && (
                <Snackbar open={Boolean(successMessage)} autoHideDuration={6000}>
                    <Alert severity="success">{successMessage}</Alert>
                </Snackbar>
            )}
            {error && (
                <Snackbar open={Boolean(error)} autoHideDuration={6000}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}
        </Paper>
    );
}

export default ResignationForm;
