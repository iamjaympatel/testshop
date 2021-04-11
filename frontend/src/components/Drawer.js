import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {List,Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';

import { Row, Col, ListGroup } from 'react-bootstrap'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';
import { fetchCategories } from '../actions/categoryAction';
import { fetchBrand, fetchBrands } from '../actions/brandAction';

const drawerWidth = 240;

export default function Drawer2() {

const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //const [price1, setPrice1] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    dispatch({type:"Toggle"})
  };
  const names = [
    'Prcie low to high',
    'Prcie high to low',
    'name A to Z',
    'Heighest Rating'
  ];

  const [personName, setPersonName] = React.useState([]);
  const dispatch = useDispatch()
  
const category = useSelector(state => state.category)
const {categories}=category

const brand = useSelector(state => state.brand)
const {brands}=brand

const filter = useSelector(state => state.filter)
const {modalopen}=filter
const selectedcategory=filter.categories
const selectedbrand=filter.brands
  const handleChange = (event) => {
    setPersonName(event.target.value);
    dispatch({type:"SORTED",payload:event.target.value})
};

const [value, setValue] = React.useState([50]);
const handleChangeslider =(event, newValue) => {
  setValue(newValue);
  dispatch({type:"PRICERANGE",payload:newValue})
};

const handleChange2 = (event) => {
   dispatch({type:"SELECTCATEGORY",payload:event.target.value})
  };
  
const  handleChange3=(event)=>{
  dispatch({type:"SELECTBRAND",payload:event.target.value})
  }

  useEffect(() => {
    if(categories.length==0){
    dispatch(fetchCategories())
   
    }
  
  }, [categories])
   return (
      
    <div className={classes.root}>
    <div className={classes.button}>
                 
                </div>
    <CssBaseline />

 <Drawer className={classes.drawer} variant="persistent"  anchor="left"  open={modalopen} classes={{paper: classes.drawerPaper,}}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      <Divider />

      <ListGroup>
      <ListGroup.Item>
      <Typography id="range-slider" gutterBottom>
      price range
    </Typography>
    <Slider
    defaultValue={1501} value={value} min={0} max={1600}
      onChange={handleChangeslider} valueLabelDisplay="auto" aria-labelledby="range-slider"
    />
      </ListGroup.Item>
      </ListGroup>
      <Divider />
    <FormLabel component="legend" style={{"marginTop":"0.5rem"}}>select category</FormLabel>

      {categories.map((c)=>
      <div>
      <FormControlLabel
          control={<Checkbox value={c._id} 
          checked={selectedcategory.includes(c._id)}
           onChange={(e)=>handleChange2(e)} name="antoine" />}
          label={c.name}
          style={{'marginBottom':"-0.7rem"}}
        />
  </div>)}

  <Divider />
    <FormLabel component="legend" style={{"marginTop":"0.5rem"}}>select Brand</FormLabel>

      {brands.map((c)=>
      <div>
      <FormControlLabel
          control={<Checkbox value={c._id} 
          checked={selectedbrand.includes(c._id)}
           onChange={(e)=>handleChange3(e)} name="antoine" />}
          label={c.name}
          style={{'marginBottom':"-0.7rem"}}
        />
  </div>)}
    </Drawer>
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: modalopen,
      })}
    >
      <div className={classes.drawerHeader} />
       
      </main>
    </div>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    button:{
    marginLeft:'1.5rem',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      marginTop:'5rem',

    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      marginLeft:'1.5rem',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 230,
        maxWidth: 300,
        height:100
      },
    
  }));


//   {
    
//     <Divider />
//     <ListGroup>
//     <ListGroup.Item>
//     <FormControl component="fieldset">
//   <FormLabel component="legend">sort by</FormLabel>
// {names.map((n)=>

//   <RadioGroup  aria-label="filter by" name="gender1" value={personName} onChange={handleChange}>
//     <FormControlLabel value={n} control={<Radio />} label={n} />
//   </RadioGroup>
//   )}
// </FormControl>

//     </ListGroup.Item>
// </ListGroup>
//   }
