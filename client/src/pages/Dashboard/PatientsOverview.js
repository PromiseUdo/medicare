import React from 'react'

import { getPatient } from '../../store/actions/PatientActions';
import { makeStyles,Grid,Paper,Typography } from '@material-ui/core';

import { PatientContext } from '../../store/patient/PatientStore';

const useStyles = makeStyles( theme => ({

    paper: {
        padding: theme.spacing(4),
      
        color: theme.palette.text.secondary,
        [theme.breakpoints.down("sm")]: {
         
       
        }
       
       },
   
  
  }));
function PatientsOverview() {
    const classes = useStyles();
    const {state,dispatch} = React.useContext(PatientContext);
  // const{name,surname,age,gender,height,weight,ward,lga,bmi,image} = state?.patient?.data

     React.useEffect(() => {
        if(Object.keys(state.patient).length === 0)dispatch(getPatient(dispatch)) 
      }, [])
      if(state.loading){
        return <h1>LOADING....</h1>
      }
    return (
        <div>
             <Typography variant="h4"  gutterBottom>
                      Profile
               </Typography>
            <Paper className={classes.paper}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{marginBottom:'20px'}}
                >
                     <img src={state?.patient?.data?.image} alt='profilePics'/>
                </Grid>

            <Grid container spacing={4}>
                   
                    <Grid item xs={3}>
                      Name
                    </Grid>
                    <Grid item xs={9}>
                        {state?.patient?.data?.name}
                    </Grid>
                    <Grid item xs={3}>
                        Surname
                    </Grid>
                    <Grid item xs={9}>
                        {state?.patient?.data?.surname}
                    </Grid>
                    <Grid item xs={3}>
                       Gender
                    </Grid>
                    <Grid item xs={9}>
                        {state?.patient?.data?.gender}
                    </Grid>
                    <Grid item xs={3}>
                        Age
                    </Grid>
                    <Grid item xs={9}>
                    {state?.patient?.data?.age}
                    </Grid>
                    <Grid item xs={3}>
                        Height
                    </Grid>
                    <Grid item xs={9}>
                    {state?.patient?.data?.height}
                    </Grid>
                    <Grid item xs={3}>
                        Weight
                    </Grid>
                    <Grid item xs={9}>
                    {state?.patient?.data?.weight}
                    </Grid>
                    <Grid item xs={3}>
                        Ward
                    </Grid>
                    <Grid item xs={9}>
                        {state?.patient?.data?.ward}
                    </Grid>
                    <Grid item xs={3}>
                       LGA
                    </Grid>
                    <Grid item xs={9}>
                    {state?.patient?.data?.lga}
                    </Grid>
                    <Grid item xs={3}>
                       State
                    </Grid>
                    <Grid item xs={9}>
                    {state?.patient?.data?.state}
                    </Grid>
                    <Grid item xs={3}>
                        BMI
                    </Grid>
                    <Grid item xs={9}>
                        {state?.patient?.data?.bmi}
                    </Grid>
            
                </Grid>
                                
            </Paper>
        </div>
    )
}

export default PatientsOverview
