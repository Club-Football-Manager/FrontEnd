import { AppBar, Container, Grid, Typography, Toolbar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IPlayer } from '../../models/IPlayer';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
    const [playerList, setPlayerList] = useState<IPlayer[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getPlayers')
            .then(response => {
                if (response.status === 200)
                    setPlayerList(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <AppBar position="static" style={{ marginTop: "16px" }}>
                <Toolbar>
                    <Typography variant="h6">FIFA Manager Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container mt={3}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{textAlign: 'center'}}>Name</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>Position</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {playerList.map((player, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{textAlign: 'center'}}>{player.name}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}>{player.position}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}>...</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        </div>
    );
};
export default PlayerList;