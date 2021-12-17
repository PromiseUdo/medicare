import React from 'react'
import PatientsTable from '../../components/table/patientsTable/PatientsTable'
import { DoctorContext } from '../../store/doctor/DoctorStore';
import { getPatients } from '../../store/actions/DoctorActions';
import { makeStyles,IconButton,MenuItem,TextField,Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles( theme => ({

  filterContainer : {
    margin : '10px 0',
    padding: 10,
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    [theme.breakpoints.down("sm")]: {
      flexDirection : 'column',
      width:'50%',
    }

  },
  filter : {
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'center',
    width:'50%',
    [theme.breakpoints.down("sm")]: {
      
      width:'100%',
      
    }
   
    

  },
 

}));
function Patients() {
  const classes = useStyles();
    const doctorCtx = React.useContext(DoctorContext);
    const [state, setstate] = React.useState({})

    const handleChange = e => {
      const {name,value} = e.target
       setstate({
           ...state,
          [name] : value
      })
      
  }
 
    const filter=(event) => {
      event.preventDefault()
      
      //changing state objects to useable query strings
      const qs = Object.keys(state).map(key => { 
        let str 
        if(key === 'age'){
          str = `${key}${state[key]}`
        }else{
          str = `${key}=${state[key]}`
        }
        return str
       
      }).join('&');
      doctorCtx.dispatch(getPatients(doctorCtx.dispatch,qs)) 
  
    }
   
    React.useEffect(() => {
        if(!doctorCtx.state.patients)doctorCtx.dispatch(getPatients(doctorCtx.dispatch)) 
      }, [])
      let table;
      if(doctorCtx.state.loading){
        table= <h1>LOADING....</h1>
      }else{
        table=<PatientsTable data={doctorCtx.state.patients.data}  />
      }
    return (
        <div>
            <div className={classes.filterContainer}>
              <Typography variant="h4"  gutterBottom>
                  List of Patients
                </Typography>
              <div className={classes.filter}>
                <TextField
                  name="gender"
                  select
                  label="Gender"
                  value={state.gender || ''}
                  onChange={handleChange}
                  helperText="Filter by Gender"
                  variant="outlined"
                  style={{marginRight:'10px'}}
                >
                  {[
                    {
                    label:'Male',
                    value:'male'
                  },
                    {
                    label:'Female',
                    value:'female'
                  },
                    {
                    label:'Other',
                    value:'other'
                  },
                  ]
                  .map((option,i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name="age"
                  select
                  label="Age"
                  value={state.age || ''}
                  onChange={handleChange}
                  helperText="Filter by Age"
                  variant="outlined"
                  style={{marginRight:'10px'}}
                >
                  {[
                    {
                    label:'Less Than or equals 20',
                    value:'[lte]=20'
                  },
                    {
                    label:'greater than 20',
                    value:'[gt]=20'
                  },
                    {
                    label:'Above 50',
                    value:'[gt]=50'
                  },
                  ]
                  .map((option,i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name='bmi'
                  style={{width : '120px'}}
                  onChange={handleChange}
                  label='BMI'
                  variant="outlined"
                  type='text'
                  helperText="Filter by BMI"
                />
                <IconButton style={{marginBottom:'25px'}} onClick={filter} color="primary" component="span"><FilterListIcon/></IconButton>
              </div>
              </div>
      
            {table}
        </div>
    )
}

export default Patients
