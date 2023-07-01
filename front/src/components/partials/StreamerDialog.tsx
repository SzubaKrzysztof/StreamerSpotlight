import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { baseUrl } from '../../const/baseUrl';
import SocialMediaIcon from './Small/SocialMediaIcon';
import { Streamer } from '../types';
import { SelectChangeEvent } from '@mui/material';

type StreamerDialogProps = {
    open: boolean;
    onClose: () => void;
    setStreamers: React.Dispatch<React.SetStateAction<Streamer[]>>;
};

const url: string = baseUrl;

const StreamerDialog: React.FC<StreamerDialogProps> = ({ open, onClose, setStreamers }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [platform, setPlatform] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [platformError, setPlatformError] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const socialMediaStyle = { display: 'flex', alignItems: 'center' };
    const socialMediaIconStyle = { marginLeft: '10px' };

    const handleSubmit = async () => {
        if (validateFields()) {
            setSubmitting(true);
            try {
                const response = await axios.post(`${url}streamers`, { name, description, platform });
                setSubmitting(false);
                enqueueSnackbar('Streamer added successfully', { variant: 'success' });
                if (response && response.data) {
                    // Dodatkowe sprawdzenie
                    const newStreamer: Streamer = response.data;
                    setStreamers(prevStreamers => [...prevStreamers, newStreamer]);
                } else {
                    throw new Error('Invalid response format from server.');
                }
            } catch (error: any) {
                setSubmitting(false);
                enqueueSnackbar('Error adding streamer', { variant: 'error' });
            } finally {
                onClose();
            }
        }
    };

    const validateFields = (): boolean => {
        let isValid = true;
        if (name.length < 3) {
            setNameError('Name must be at least 3 characters long');
            isValid = false;
        } else {
            setNameError('');
        }
        if (description.length < 3) {
            setDescriptionError('Description must be at least 3 characters long');
            isValid = false;
        } else {
            setDescriptionError('');
        }
        if (!platform) {
            setPlatformError('Please select a platform');
            isValid = false;
        } else {
            setPlatformError('');
        }
        return isValid;
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handlePlatformChange = (event: SelectChangeEvent<string>) => {
        setPlatform(event.target.value);
    };

    return (
        <Box>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Add a new streamer</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '35px',
                            p: { xs: 2, md: 8 },
                        }}
                    >
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                            color="primary"
                            fullWidth
                            error={!!nameError}
                            helperText={nameError}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={handleDescriptionChange}
                            color="primary"
                            fullWidth
                            error={!!descriptionError}
                            helperText={descriptionError}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="platform-select-label">Platform</InputLabel>
                            <Select
                                labelId="platform-select-label"
                                id="platform-select"
                                value={platform}
                                label="Platform"
                                onChange={handlePlatformChange}
                                error={!!platformError}
                            >
                                <MenuItem value="TikTok">
                                    <Box style={socialMediaStyle}>
                                        <SocialMediaIcon service="TikTok" />
                                        <span style={socialMediaIconStyle}>TikTok</span>
                                    </Box>
                                </MenuItem>

                                <MenuItem value="YouTube">
                                    <Box style={socialMediaStyle}>
                                        <SocialMediaIcon service="YouTube" />
                                        <span style={socialMediaIconStyle}>YouTube</span>
                                    </Box>
                                </MenuItem>

                                <MenuItem value="Twitter">
                                    <Box style={socialMediaStyle}>
                                        <SocialMediaIcon service="Twitter" />
                                        <span style={socialMediaIconStyle}>Twitter</span>
                                    </Box>
                                </MenuItem>

                                <MenuItem value="Twitch">
                                    <Box style={socialMediaStyle}>
                                        <SocialMediaIcon service="Twitch" />
                                        <span style={socialMediaIconStyle}>Twitch</span>
                                    </Box>
                                </MenuItem>
                            </Select>
                            {platformError && <div style={{ color: 'red' }}>{platformError}</div>}
                        </FormControl>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Button variant="contained" size="large" color="primary" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? <CircularProgress size={24} /> : 'Submit'}
                            </Button>
                            <Button variant="outlined" size="large" color="primary" onClick={onClose}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default StreamerDialog;
