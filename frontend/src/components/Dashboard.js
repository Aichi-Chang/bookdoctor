import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'
import clsx from 'clsx' 
import { makeStyles } from '@material-ui/core/styles' 
import Drawer from '@material-ui/core/Drawer' 
import Box from '@material-ui/core/Box' 
import Divider from '@material-ui/core/Divider' 
import IconButton from '@material-ui/core/IconButton' 
import Container from '@material-ui/core/Container' 
import Grid from '@material-ui/core/Grid' 
import Paper from '@material-ui/core/Paper' 
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight' 
import ListItems from './ListItems' 
import MedicalHistory from './MedicalHistory' 
import Auth from '../lib/auth'
import DeleteAppointment from './DeleteAppointment'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Picker from './Picker'




const drawerWidth = 240 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#faf6ef',
    backgroundImage: "url('https://66.media.tumblr.com/e5e4a78035d2db4535b1bf18a7ba78f3/tumblr_nwfphgd4tI1tf8vylo1_1280.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  },
  container: {
    marginLeft: '40px',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '80%'
  },
  fixedHeight: {
    height: 240
  }

})) 




export default function Dashboard(props) {
  const classes = useStyles()
  
  const [singleUser, setSingleUser] = useState({})
  const [open, setOpen] = useState(false) 
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight) 
  const handleDrawer = () => {
    return open ? setOpen(false) : setOpen(true)
  } 
 

  useEffect(() => {
    axios.get(`/api/user/${Auth.getUser().id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => setSingleUser(res.data))
      .catch(err => console.log(err))
  }, [])

  

  const start = singleUser.appointment && singleUser.appointment.length - (singleUser.appointment.length - 2)
  const end = singleUser.appointment && singleUser.appointment.length
  const patient = singleUser && singleUser.role === 'patient'
  const doctor = singleUser && singleUser.role === 'doctor'
  // console.log(singleUser.appointment, start, end)


  if (!singleUser.appointment) return <h1>Loading...</h1>



  return (
    <div className={classes.root}>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >

        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => handleDrawer()}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItems open={open}/>
        <Divider />

      </Drawer>


      <main className={classes.content}>
      
        <Container maxWidth="lg" className={classes.container}>
          <h1 className='dashboardTitle'>Hello, {singleUser.username}</h1>
          
          <Grid container spacing={3}>
      
            <Box margin={1.5}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Picker
                  url={patient ? '/api/appointment' : doctor && `/api/appointment/doc/${singleUser.username}`}
                />
              </MuiPickersUtilsProvider> 
            </Box>

            <Grid item xs={12} md={4} lg={5}>
              <Paper className={fixedHeightPaper}>
                <h1 className='title'> Most recent appointments </h1>
                {doctor && singleUser.appointment.map((info, i) => {
                  return <p className='content' key={i}>
                    {info.date} at {info.time}
                  </p>
                })}
                {patient && singleUser.appointment.length === 0 ? <p className='content'>No Appointment Booked</p> :
                  patient && singleUser.appointment.length <= 3 ? 
                    <div>
                      {singleUser.appointment.map((info, i) => {
                        return <div key={i} className='appointmentFlex'><p className='content'>
                          {info.date} with {info.doctor} at {info.time}
                        </p>
                        <DeleteAppointment id={info._id} props={props}/>
                        </div>
                      })}
                    </div> :
                    <div>{patient && singleUser.appointment.slice(start, end).map((info, i) => {
                      return <div key={i} className='appointmentFlex'><p className='content'>
                        {info.date} with {info.doctor} at {info.time}
                      </p>
                      <DeleteAppointment id={info._id}/>
                      </div>
                    })}</div>
                }
              </Paper>
            </Grid>
          
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {singleUser.history.length === 0 ? <h1 className='title'>No Medical History</h1> :
                  <MedicalHistory singleUser={singleUser} />}
              </Paper>
            </Grid>

          </Grid>

          
          <Box mt={18}>
            <div>Copyright © <Link target='blank' className='links' to="https://github.com/soniacweb/bookdoctor">bookdoctor</Link>{' '}{new Date().getFullYear()}</div>
          </Box>

        </Container>
      </main>


    </div>
  ) 
}