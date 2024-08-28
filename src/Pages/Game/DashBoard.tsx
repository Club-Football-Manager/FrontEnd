import { AppBar, Toolbar, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Box, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ILeague, IClub, TopAssistMan, TopCleanSheet, TopScorer } from '../../models/ILeague';
import { IMatch } from '../../models/IMatch';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface LeagueStandingsProps {
    sortedStandings: IClub[] | undefined;
}
const LeagueStandings: React.FC<LeagueStandingsProps> = ({ sortedStandings }) => {
    // TODO: Fix sorting on position
    const [sortColumn, setSortColumn] = useState<string>('position');
    const [sortDirection, setSortDirection] = useState<string>('asc');

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedStandingsData = sortedStandings?.sort((a, b) => {
        if (sortColumn === 'position') {
            return sortDirection === 'asc' ? a.position - b.position : b.position - a.position;
        } else if (sortColumn === 'team') {
            return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortColumn === 'won') {
            return sortDirection === 'asc' ? a.matchesWon - b.matchesWon : b.matchesWon - a.matchesWon;
        } else if (sortColumn === 'drawn') {
            return sortDirection === 'asc' ? a.matchesDrawn - b.matchesDrawn : b.matchesDrawn - a.matchesDrawn;
        } else if (sortColumn === 'lost') {
            return sortDirection === 'asc' ? a.matchesLost - b.matchesLost : b.matchesLost - a.matchesLost;
        } else if (sortColumn === 'points') {
            const aPoints = (a.matchesWon * 3) + a.matchesDrawn;
            const bPoints = (b.matchesWon * 3) + b.matchesDrawn;
            return sortDirection === 'asc' ? aPoints - bPoints : bPoints - aPoints;
        }
        return 0;
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => handleSort('position')}>Position</TableCell>
                        <TableCell onClick={() => handleSort('team')}>Team</TableCell>
                        <TableCell onClick={() => handleSort('won')}>Won</TableCell>
                        <TableCell onClick={() => handleSort('drawn')}>Drawn</TableCell>
                        <TableCell onClick={() => handleSort('lost')}>Lost</TableCell>
                        <TableCell onClick={() => handleSort('points')}>Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedStandingsData?.map((team, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{team.name}</TableCell>
                            <TableCell>{team.matchesWon}</TableCell>
                            <TableCell>{team.matchesDrawn}</TableCell>
                            <TableCell>{team.matchesLost}</TableCell>
                            <TableCell>{(team.matchesWon * 3) + team.matchesDrawn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

interface StatsStandingsProps {
    leagueInfo: ILeague;
}
const StatsStandings: React.FC<StatsStandingsProps> = ({ leagueInfo }) => {
    const [type, setType] = useState<string>('Goal');
    const [sortedStats, setSortedStats] = useState<TopScorer[] | TopAssistMan[] | TopCleanSheet[]>();
    useEffect(() => {
        switch (type) {
            case 'Goal':
                setSortedStats(leagueInfo.topScorer);
                break;
            case 'Assist':
                setSortedStats(leagueInfo.topAssistMan);
                break;
            case 'CleanSheet':
                setSortedStats(leagueInfo.topCleanSheet);
                break;
            default:
                break;
        }
    }, [type, leagueInfo]);
    return (
        <Box sx={{ width: '100%', typography: 'body1' }} mt={.7}>
            <TabContext value={type}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(event, newValue) => setType(newValue)} aria-label="lab API tabs example">
                        <Tab label="Top Scorers" value="Goal" />
                        <Tab label="Top AssistsMen" value="Assist" />
                        <Tab label="Top CleanSheets" value="CleanSheet" />
                    </TabList>
                </Box>
                <TabPanel value="Goal">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Goals</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedStats?.map((player, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{player.name}</TableCell>
                                        <TableCell>{(player as TopScorer).goals}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="Assist"><TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Position</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Assists</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedStats?.map((player, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{(player as TopAssistMan).assists}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></TabPanel>
                <TabPanel value="CleanSheet"><TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Position</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>CleanSheets</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedStats?.map((player, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{(player as TopCleanSheet).cleanSheets}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></TabPanel>
            </TabContext>
        </Box>
    );
};

const DashboardPage = () => {
    const [sortedLeagueStandings, setSortedLeagueStandings] = useState<IClub[]>();
    const [leagueInfo, setLeagueInfo] = useState<ILeague>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/league/Serie A');
                if (response.status === 200) {
                    setLeagueInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setSortedLeagueStandings(leagueInfo?.clubs.sort((a, b) => b.matchesWon - a.matchesWon));
    }, [leagueInfo])


    return (
        <div>
            <AppBar position="static" style={{ marginTop: "16px" }}>
                <Toolbar>
                    <Typography variant="h6">FIFA Manager Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" component="h2" mt={4} mb={2}>Classifica Campionato</Typography>
                        <LeagueStandings sortedStandings={sortedLeagueStandings} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {leagueInfo && <StatsStandings leagueInfo={leagueInfo} />}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Calendar />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const Calendar = () => {
    const [calendarInfo, setCalendarInfo] = useState<IMatch[]>();
    const [matchDay, setMatchDay] = useState<number>(1);
    const myTeam = {
        name: 'AC Milan',
        city: 'Milan',
        stadium: 'San Siro',
        manager: 'Stefano Pioli',
        matchesWon: 0,
        matchesDrawn: 0,
        matchesLost: 0,
        players: []
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getCalendar');
                if (response.status === 200) {
                    setCalendarInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    let ciao = 1;
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                FIFA Calendar
            </Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {/* 
                            Fix space sizing
                        */}
                        <TableRow>
                            <TableCell colSpan={2} style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Button disabled={matchDay === 1} variant="text" style={{ color: 'white' }} onClick={() => setMatchDay(matchDay - 1)}>{'<'}</Button>
                                    Match Day {matchDay}
                                    <Button disabled={matchDay === 38} variant="text" style={{ color: 'white' }} onClick={() => setMatchDay(matchDay + 1)}>{'>'}</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        {calendarInfo?.map((item) => (
                            item.matchDay === matchDay && (
                                <TableRow style={{ borderBottom: '1px solid #ddd', width: '100%' }}>
                                    {/* <Grid container > */}
                                    {/* <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }} >
                                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                                        </Grid> */}
                                    <Grid container style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                        <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <TableCell style={{ textAlign: 'center', margin: 'auto', borderBottom: '0px' }}>{item.homeTeam.name}</TableCell>
                                        </Grid>

                                        {
                                            item.homeTeam.name === myTeam.name ?
                                                <Grid style={{ borderBottom: '0px' }}>
                                                    <TableCell style={{ textAlign: 'center', margin: 'auto', borderBottom: '0px' }}>3 - 2</TableCell>
                                                </Grid>
                                                :
                                                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <TableCell style={{ textAlign: 'center', margin: 'auto', borderBottom: '0px' }}>{new Date(item.date).toLocaleDateString(undefined, options)}</TableCell>
                                                </Grid>
                                        }
                                        <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <TableCell style={{ textAlign: 'center', margin: 'auto', borderBottom: '0px' }}>{item.awayTeam.name}</TableCell>
                                        </Grid>
                                        {/* <TableCell> - {item.awayTeam.name}</TableCell> */}
                                    </Grid>
                                    {/* </Grid> */}
                                </TableRow>
                            )
                        ))}

                        {/* {calendarInfo?.map((item, index, array) => (
                            <React.Fragment key={index}>
                                {index === 0 || item.matchDay !== array[index - 1].matchDay ? ( // Check if it's a new match day
                                    <TableRow>
                                        <TableCell colSpan={2} style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Button variant="text" style={{ color: 'white' }}>{'<'}</Button>
                                                Match Day {item.matchDay}
                                                <Button variant="text" style={{ color: 'white' }}>{'>'}</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                ) : null}
                                <TableRow>
                                    <TableCell style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{new Date(item.date).toLocaleDateString()}</TableCell>
                                    <TableCell style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{item.homeTeam.name} - {item.awayTeam.name}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default DashboardPage;
