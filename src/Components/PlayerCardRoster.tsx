import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import imageDefault from '../assets/player.svg';
import IPlayer from '../models/IPlayer';

interface Props {
    playerInfo: IPlayer;
    onClickFn: Function;
    isSelected: boolean | null;
}

const SoccerPlayerCard: React.FC<Props> = ({ playerInfo, onClickFn, isSelected }) => {
    const { name, position, overall } = playerInfo;

    return (
        <Card style={isSelected ? {border: '2px solid purple'} : {border: '2px solid green'}}>
            <CardActionArea onClick={() => onClickFn()}>
                <CardMedia
                    component="img"
                    height="220px"
                    image={imageDefault}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Position: {position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Overall: {overall}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SoccerPlayerCard;
