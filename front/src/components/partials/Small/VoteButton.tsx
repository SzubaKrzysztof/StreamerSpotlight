import React from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { baseUrl } from '../../../const/baseUrl';

type VoteButtonProps = {
    streamerId: string;
    voteType: 'upVote' | 'downVote';
    refetch: () => void;
};

const VoteButton: React.FC<VoteButtonProps> = ({ streamerId, voteType, refetch }) => {
    const { enqueueSnackbar } = useSnackbar();

    const vote = async () => {
        try {
            debugger;
            const token = localStorage.getItem('token');
            if (!token) {
                enqueueSnackbar('You must be logged in to vote', { variant: 'warning' });
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.put(`${baseUrl}streamer/vote/${streamerId}`, { voteType }, config);
            enqueueSnackbar('Your vote has been registered', { variant: 'success' });

            refetch();
        } catch (error: any) {
            if (error.response && error.response.data === 'You have already voted for this streamer') {
                enqueueSnackbar('You can only vote once for each streamer', { variant: 'info' });
            } else {
                enqueueSnackbar('An error occurred while voting', { variant: 'error' });
            }
            console.error(error);
        }
    };

    return (
        <Button variant="outlined" size="large" onClick={vote}>
            <Typography variant="body1" mr={2}>
                {voteType === 'upVote' ? 'Upvote' : 'Downvote'}
            </Typography>
            {voteType === 'upVote' ? <ArrowUpwardIcon sx={{ color: 'green' }} /> : <ArrowDownwardIcon sx={{ color: 'red' }} />}
        </Button>
    );
};

export default VoteButton;
