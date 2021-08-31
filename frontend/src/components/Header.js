import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import Drawer2 from './Drawer'
import IconButton from '@material-ui/core/IconButton';
import {List,Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

const Header = () => {
  const dispatch = useDispatch()
const [open, setOpen] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
const handleopen=()=>{
  dispatch({type:"Toggle"})
}

  return (
    <header>
      
      <Navbar bg='white' variant='pink' expand='lg' collapseOnSelect>      
        <Container>
        <IconButton aria-label="open drawer" edge="start"style={{height:'2rem',width:"2rem"}} >
             <MenuIcon color="white" onClick={handleopen}/>
        </IconButton>  
  
          <LinkContainer to='/'>
            <Navbar.Brand>test shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Brand>it is test website</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'style={{"backgroundColor":"white"}} >sign in</Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav' >
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto' >
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/brandlist'>
                    <NavDropdown.Item>Brand</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item>category</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.seller && !userInfo.isAdmin &&(
                <NavDropdown title='seller' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
