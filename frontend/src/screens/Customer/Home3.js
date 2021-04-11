//import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import {List,Typography} from '@material-ui/core';
//import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {fetchBrands} from '../../actions/brandAction'
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';
import { fetchCategories } from '../../actions/categoryAction';


const drawerWidth = 240;


export default function HomeScreen({match}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //const [price1, setPrice1] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const names = [
    'Prcie low to high',
    'Prcie high to low',
    'name A to Z',
    'name Z to A'
  ];


  const [personName, setPersonName] = React.useState([]);
  function valuetext(value) {
    return `${value}°C`;
  }
 
  //
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  
const category = useSelector(state => state.category)
const {categories}=category
  const handleChange = (event) => {
    setPersonName(event.target.value);
    dispatch({type:"SORTED",payload:event.target.value})

};

const [value, setValue] = React.useState([50]);

//const fproducts=[]

const handleChangeslider =(event, newValue) => {
  setValue(newValue);
  dispatch({type:"PRICERANGE",payload:newValue})

};

 
const fproducts= error? []:  products.filter((p)=>{return p.price<=value})

if(personName==='Prcie low to high'){
    
    fproducts.sort((a,b)=>{return a.price-b.price})
}
 else if(personName==='Prcie high to low'){
    fproducts.sort((a,b)=>{return b.price-a.price})
}
else if(personName ==='name A to Z'){
    fproducts.sort(function(a,b){
        return a.name.localeCompare(b.name);
    })
}
else if(personName ==='name Z to A'){
    fproducts.sort((a,b)=>{
        return b.name.localeCompare(a.name);
    })
};

 const brand=useSelector((state)=>state.brand) 
 const {brands}=brand
 const [checked, setChecked] = React.useState(true);
 
 const categoryid=categories.map((c)=>{return c._id})
 
 const [Selectedc, setselectedc] = React.useState([categoryid])
const filteredproduct=fproducts.filter((p)=>Selectedc.includes(p.category._id))

useEffect(() => {
  setselectedc(categoryid)
  return () => {
    
  }
}, [category])
const handleChange2 = (event) => {
    setChecked(event.target.checked);
    if(Selectedc.includes(event.target.value)){
     setselectedc(Selectedc.filter((e)=>e!==event.target.value))
     dispatch({type: "SELECTCATEGORY",payload:event.target.value})
    }else{
      setselectedc([...Selectedc,event.target.value]) 
     dispatch({type: "SELECTCATEGORY",payload:event.target.value})
    }
  };

  
useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch(fetchBrands())
    dispatch(fetchCategories())
   
  }, [dispatch, keyword, pageNumber])

  
  return (
    <div className={classes.root}>
      <div className={classes.button}>
                  <IconButton color="inherit"aria-label="open drawer"onClick={handleDrawerOpen} edge="start"className={clsx(classes.menuButton, open && classes.hide)}style={{height:'2rem',width:"2rem"}}>
              <Typography onClick={handleDrawerOpen} >filter product</Typography>
               <MenuIcon />
          </IconButton>  
                  </div>
      <CssBaseline />

   <Drawer className={classes.drawer} variant="persistent"  anchor="left"  open={open} classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListGroup>
        <ListGroup.Item>
        <FormControl component="fieldset">
      <FormLabel component="legend">sort by</FormLabel>
  {names.map((n)=>
  
      <RadioGroup  aria-label="filter by" name="gender1" value={personName} onChange={handleChange}>
        <FormControlLabel value={n} control={<Radio />} label={n} />
      </RadioGroup>
      )}
    </FormControl>
    
        </ListGroup.Item>
    </ListGroup>

        <Divider />

        <ListGroup>
        <ListGroup.Item>
        <Typography id="range-slider" gutterBottom>
        price range
      </Typography>
      <Slider
      defaultValue={16} value={value}
        onChange={handleChangeslider} valueLabelDisplay="auto" aria-labelledby="range-slider"getAriaValueText={valuetext}
      />
        </ListGroup.Item>
        </ListGroup>
        <Divider />
        {categories.map((c)=>
        <div>
        <FormControlLabel
            control={<Checkbox value={c._id} checked={Selectedc.includes(c._id)} onChange={(e)=>handleChange2(e)} name="antoine" />}
            label={c.name}
          />
    </div>)}

    <Divider />
        <ListGroup>
          <Link to='/brand'>
               <ListGroup.Item variant="primary">product by brands</ListGroup.Item>
          </Link>
           
        </ListGroup>
       <Divider/>
       
        <ListGroup>
          <Link to='/category'>
               <ListGroup.Item variant="primary">product by category</ListGroup.Item>
          </Link>
          </ListGroup>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      
    
        <div className={classes.drawerHeader} />
        <>
     
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
     
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (  
        <div>
          <Row>
            {filteredproduct.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
      </div>

        
      )}
    </>
    
      </main>
    </div>
  );
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
  