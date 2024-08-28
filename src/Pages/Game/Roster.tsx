import { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Grid, Paper, Typography, Button, IconButton, Divider } from '@mui/material';
import { Close as CloseIcon } from "@mui/icons-material";
import { PlayerCardRosterComponent } from '../../Components/Components.ts';
import IModule from '../../models/IModule.ts';
import { IPlayer } from '../../models/IPlayer.ts';

const Modules: IModule[] = [
    {
        id: 1,
        name: '4-4-2',
        defence: 4,
        forward: 2,
        midfielder: 4,
    },
    {
        id: 2,
        name: '4-3-3',
        defence: 4,
        forward: 3,
        midfielder: 3,
    },
    {
        id: 3,
        name: '3-5-2',
        defence: 3,
        forward: 2,
        midfielder: 5,
    },
];

const Roster: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
    const [selectedModule, setSelectedModule] = useState<IModule>(Modules[0]);
    const [showAvailablePlayers, setShowAvailablePlayers] = useState<{ show: boolean, position: string }>({ show: false, position: "" });
    const [lineup, setLineup] = useState<IPlayer[]>([]);
    const [bench, setBench] = useState<IPlayer[]>([]);
    const [players, setPlayers] = useState<IPlayer[]>([]);

    const handleModuleChange = (event: any) => {
        const moduleId = event.target.value as number;
        const module = Modules.find(mod => mod.id === moduleId);
        setSelectedModule(module || Modules[0]);
    };

    const handlePlayerClick = (player: IPlayer) => {
        if (!selectedPlayer) {
            setSelectedPlayer(player);
            setShowAvailablePlayers({show: true, position: player.position});
        } else {
            if (player.position === selectedPlayer.position) {
                const updatedLineup = [...lineup];
                const indexSelectedPlr = updatedLineup.indexOf(selectedPlayer);
                const indexPlr = updatedLineup.indexOf(player);

                updatedLineup[indexSelectedPlr] = player;
                updatedLineup[indexPlr] = selectedPlayer;

                setLineup(updatedLineup);
            }
            setSelectedPlayer(null);
            setShowAvailablePlayers({show: false, position: ""});
        }
    };

    const handleAvailablePlayerClick = (player: IPlayer) => {
        if (player.position !== showAvailablePlayers.position) return;

        const index = bench.findIndex(p => p.id === player.id);
        if (index < 0) return;

        const updatedLineup = [...lineup, player];
        const updatedBench = bench.filter(p => p.id !== player.id);

        setLineup(updatedLineup);
        setBench(updatedBench);
        setShowAvailablePlayers({ show: false, position: "" });
    };

    const renderPlayers = (position: string, count: number) => {
        const players: IPlayer[] = lineup.filter(player => player.position === position).slice(0, count);
        const updatedBench = [...bench];
        players.forEach((plr) => {
            if (plr.position === players[0].position) {
                const index = updatedBench.findIndex(p => p.id === plr.id);
                if (index >= 0) {
                    updatedBench.splice(index, 1);
                }
            }
        });
        const totalPlayers = players.length;
        const additionalPlayers = count - totalPlayers;
        return players.map((player: IPlayer) => (
            <Grid item key={player.id}>
                <PlayerCardRosterComponent playerInfo={player} onClickFn={() => handlePlayerClick(player)} isSelected={selectedPlayer && selectedPlayer.id === player.id}/>
            </Grid>
        )).concat(
            Array.from({ length: additionalPlayers > 0 ? additionalPlayers : 0 }).map((_, index) => (
                <Grid item key={`additional-${position}-${index}`}>
                    <Button variant="outlined" color='warning' onClick={() => setShowAvailablePlayers({ show: true, position: position })}>
                        Vacant
                    </Button>
                </Grid>
            ))
        );
    };

    return (
        <Grid container spacing={2} mt={5}>
            <Grid item>
                <Typography variant="h6" align="center" gutterBottom>
                    Soccer Lineup
                </Typography>
                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                    <InputLabel id="module-label">Select Module</InputLabel>
                    <Select
                        labelId="module-label"
                        value={selectedModule ? selectedModule.id : ''}
                        onChange={handleModuleChange}
                    >
                        {Modules.map(module => (
                            <MenuItem key={module.id} value={module.id}>
                                {module.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Paper>
                    <Grid container justifyContent="center" alignItems="center" direction="row">
                        <Divider color='red' sx={{ width: '100%', paddingTop: '10px'}}>Forwards</Divider>
                        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" mb={3}>
                            {renderPlayers('Forward', selectedModule.forward)}
                        </Grid>
                        <Divider color='red' sx={{ width: '100%'}} >Midfielders</Divider>
                        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center"  mb={3}>
                            {renderPlayers('Midfielder', selectedModule.midfielder)}
                        </Grid>
                        <Divider color='red' sx={{ width: '100%'}} >Defenders</Divider>
                        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center"  mb={3}>
                            {renderPlayers('Defender', selectedModule.defence)}
                        </Grid>
                        <Divider color='red' sx={{ width: '100%'}} >Goalkeeper</Divider>
                        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" mb={2}>
                            {renderPlayers('Goalkeeper', 1)}
                        </Grid>
                    </Grid>
                </Paper>
                {showAvailablePlayers.show && (
                    <Paper style={{ marginTop: '16px', paddingTop: '16px' }}>
                        <Grid container display='flex' justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography variant="h6" align="center" gutterBottom>
                                    Available Players
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton color='error' onClick={() => setShowAvailablePlayers({ show: false, position: "" })}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" spacing={3} style={{ paddingBottom: '16px' }}>
                            {bench.map(player => (
                                <Grid item key={player.id}>
                                    <PlayerCardRosterComponent playerInfo={player} onClickFn={() => handleAvailablePlayerClick(player)} isSelected={null}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                )}
            </Grid>
        </Grid>
    );
};


export default Roster;
