import { Box, Button, Typography } from '@mui/material';
import video from "../assets/IntroVideo.mp4"
import { Link } from 'react-router-dom';

const FootballManagerPage = () => {
    return (
        <Box style={{ textAlign: 'center', paddingTop: '16px' }}>
            <video autoPlay loop muted style={{ width: '100%', height: 'auto' }}
            >
                <source src={video}
                    type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <Typography variant="h4" style={{ marginTop: '16px' }}>
                Welcome to Football Manager
            </Typography>

            <Box style={{ margin: '16px' }}>
                <Link to="/game">
                    <Button variant="contained" color="primary" style={{ margin: '0 8px' }}>
                        Start Game
                    </Button>
                </Link>
                <Link to="/learn-more">
                    <Button variant="contained" color="secondary" style={{ margin: '0 8px' }}>
                        Learn More
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default FootballManagerPage;
