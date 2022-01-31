import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FunctionsIcon from '@mui/icons-material/Functions';
import CountUp from 'react-countup';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import './index.css';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);

export default function OutlinedCard(props) {

    const selectIcon = () => {
        let icon, val, text, percent, mPer, fPer;
        if (props.totalMatches) {
            icon = <VerifiedUserIcon />;
            val = props.totalMatches;
            text = "Total Matches";
        }
        if (props.totalUsers || props.fPer || props.mPer) {
            icon = <PersonIcon />;
            val = props.totalUsers;
            text = "Total Users";
            fPer = props.fPer;
            mPer = props.mPer;
            return { icon, val, text, fPer, mPer };
        }
        if (props.totalProUsers) {
            icon = < PersonAddAltIcon />;
            val = props.totalProUsers;
            text = "Pro-Users";
            percent = props.proPercent;
            return { val, icon, text, percent };
        }
        if (props.avgAge) {
            icon = <FunctionsIcon />;
            val = props.avgAge;
            text = "Average Age"
        }
        return { val, icon, text };
    }

    const renderCard = () => {
        return (
            <Card variant="outlined" style={{ borderRadius: 16, height: 150 }}>
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 500, lineHeight: 1.25 }}>
                            <span className='userIcon'>{selectIcon().icon}</span>&nbsp;&nbsp;
                            {selectIcon().text}

                        </Typography>
                        <br />
                        <Typography sx={{ fontSize: 25, fontWeight: 600, lineHeight: 1.25 }} color="text.primary" gutterBottom>
                            <CountUp end={selectIcon().val} />
                        </Typography>
                        {selectIcon().percent ?
                            <Typography variant="body2">
                                <span className='percentSpan'>
                                    <CountUp end={selectIcon().percent} />%
                                </span>
                            </Typography> : null
                        }

                        {selectIcon().fPer ?
                            <Typography variant="body2">
                                <MaleIcon />
                                <span className='mPerSpan'>
                                    <CountUp end={selectIcon().mPer} />%
                                </span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <FemaleIcon />
                                <span className='fPerSpan'>
                                    <CountUp end={selectIcon().fPer} />%
                                </span>
                            </Typography> : null
                        }
                    </CardContent>
                </React.Fragment>
            </Card >
        )
    }

    return (
        <Box sx={{ minWidth: 100 }} className='cardBox'>
            {renderCard()}
        </Box>
    );
}
