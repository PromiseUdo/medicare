import React,{useState} from 'react';
import Modal from '../../components/Modal/index'
import { makeStyles,Paper , Button,TextField, Grid, Typography,MenuItem  } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { DoctorContext } from '../../store/doctor/DoctorStore';
import { AuthContext } from '../../store/auth/AuthStore';
import { createEncounter, getDoctors,sendEncounterTo } from '../../store/actions/DoctorActions';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
       

       },
    form: {
        width:'100%'
       },
    encounter: {
        width:'400px',
        [theme.breakpoints.down("sm")]: {
            width:'240px',

          }

       },
    sc: {
        border: '1px solid rgb(126,118,254)',
        borderRadius: '3px',
        padding: '5px'
       },
     
  
   }));

function Encounter() {
    const classes = useStyles();
    const authCtx = React.useContext(AuthContext);
    const doctorCtx = React.useContext(DoctorContext);
    const [state, setstate] = useState({
        visits: '',
        diagnosis: '',
        treatmentPlan:'',
        complaints:'',
        respiratoryRate:'',
        temperature:'',
        sendTo:'',
        bloodPressure:'',
        height:'',
        weight:'',
        time:'',
        date:'',
    })
    const [open,setOpen] = useState(false);
   
    
    React.useEffect(() => {
        if(doctorCtx?.state?.doctors?.success) setOpen(true);
      }, [doctorCtx?.state?.doctors?.success,doctorCtx.state.btnLoading])

 

 const calcBmi = Number(state?.weight) / Number(state?.height)
  
  const submit = e => {
      e.preventDefault();
      const data={
          ...state,
          bmi:calcBmi,
         
      }
      doctorCtx.dispatch(createEncounter(data,doctorCtx.dispatch)) ;
      setstate({
        visits: '',
        diagnosis: '',
        treatmentPlan:'',
        complaints:'',
        respiratoryRate:'',
        temperature:'',
        sendTo:'',
        bloodPressure:'',
        height:'',
        weight:'',
        time:'',
        date:'',
      })
  }
  const onactionHandler = () => {
    doctorCtx.dispatch(getDoctors(doctorCtx.dispatch))
   
       
}
  
      const handleChange = e => {
        const {name,value} = e.target
         setstate({
             ...state,
            [name] : value
        })
        
    }
    const sendTo = () => {
        doctorCtx.dispatch(sendEncounterTo({...state,bmi: calcBmi},doctorCtx.dispatch))
    }

   
const modalContent = <div className={classes.encounter}>
                        <TextField
                            name="sendTo"
                            select
                            fullWidth
                            label="Select Colleague"
                            onChange={handleChange}
                            helperText="Select colleague to send Encounter to"
                            variant="outlined"
                            value={state.sendTo}
                            
                            >
                                <MenuItem  disabled>
                                   --Select--
                                </MenuItem>
                                {
                                 doctorCtx?.state?.doctors?.data?.filter(option => option._id !== authCtx.state.user.id ).map((option,i) => (

                                    <MenuItem key={i} value={option._id}>
                                    {`${option.cadre} ${option.name} ${option.surname}`}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <Button variant="contained" onClick={sendTo} type='button' color="primary" disabled={doctorCtx.state.btnLoading}>
                            Send
                        </Button>

                    </div>
  
    return (
            <>
              <Typography variant="h4"  gutterBottom>
                       Patient's Encounter
              </Typography>
          
            <Paper className={classes.paper}>
            <form onSubmit={submit}>
            <Grid container spacing={3}>
          
                <Grid item xs={12} md={6}>
                    <TextField
                        name='date'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Date'
                        variant="outlined"
                        type='date'
                        value={state.date}
                         InputLabelProps={{
                            shrink: true,
                            }}
                       
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Time"
                    name="time"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    type='time'
                    value={state.time}
                    InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    name="visits"
                    select
                    fullWidth
                    label="Visits"
                    onChange={handleChange}
                    helperText="Number of Visits"
                    variant="outlined"
                    value={state.visits}
                    
                    >
                        {[
                            {
                            label:'First Time',
                            value:'firstTime'
                        },
                            {
                            label:'Repeat Visit',
                            value:'repeat'
                        },
                           
                        ]
                        .map((option,i) => (
                            <MenuItem key={i} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='weight'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Weight'
                        variant="outlined"
                        type='text'
                        value={state.weight}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='height'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Height'
                        variant="outlined"
                        type='text'
                        value={state.height}
                    />
                </Grid>
              
                <Grid item xs={12} md={6}>
                    <TextField
                        name='bloodPressure'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Blood Pressure'
                        variant="outlined"
                        type='text'
                        value={state.bloodPressure}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='temperature'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Temperature'
                        variant="outlined"
                        type='text'
                        value={state.temperature}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='respiratoryRate'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Respiratory Rate'
                        variant="outlined"
                        type='text'
                        value={state.respiratoryRate}
                    />
                </Grid>
                 <Grid item xs={12} md={6}>
                <TextField
                    name="diagnosis"
                    select
                    fullWidth
                    label="Diagnosis"
                    onChange={handleChange}
                    helperText="Diagnosis"
                    variant="outlined"
                    value={state.diagnosis}
                    
                    >
                        {[
                            {
                            label:'Hypertension',
                            value:'hypertension'
                        },
                            {
                            label:'Pneumonia',
                            value:'pneumonia'
                        },
                            {
                            label:'Malaria',
                            value:'malaria'
                        },
                            {
                            label:'Diabetes',
                            value:'diabetes'
                        },
                           
                        ]
                        .map((option,i) => (
                            <MenuItem key={i} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                </TextField>
                </Grid>
                <Grid item xs={12} md={6} >
                  {
                      calcBmi && calcBmi !== Infinity  ? (
                        <Typography variant="h4"  gutterBottom>
                            BMI :  {calcBmi}
                        </Typography>

                      ) : ''
                  }
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        name='complaints'
                        fullWidth
                        value={state.complaints}
                        onChange={handleChange}
                        label='Complaints'
                        variant="outlined"
                        type='text'
                        multiline
                        rows={5}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        name='treatmentPlan'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Treatment Plan'
                        variant="outlined"
                        type='text'
                        multiline
                        rows={5}
                        value={state.treatmentPlan}
                    />
                </Grid>
                <Grid 
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                 >
                
              
                <Button variant="contained" type='submit' color="primary" disabled={doctorCtx.state.loading} >
                    Save
                </Button>
                </Grid>
        </Grid>
    </form>
    <Grid 
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        >
        <Button endIcon={<ArrowForwardIosIcon />} variant="contained" type='button' onClick={onactionHandler} color="primary" disabled={doctorCtx.state.btnLoading} >
            Send To
        </Button>
    </Grid>
    </Paper>
    <Modal open={open} 
        maxWidth='sm'
        handleClose={() => { setOpen(false)}} actions={[{handler:() => {setOpen(false)},text:"Close",id:5}]} 
        title='Send Encounter To'>
        {modalContent}
      </Modal>
    </>  
 
    )
}

export default Encounter
