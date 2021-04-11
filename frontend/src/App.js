import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/Customer/Home2'
import BrandScreen from './screens/Customer/Brandscreen'
import Brandproduct from './screens/Customer/Brandproduct'
import ProductScreen from './screens/Customer/ProductScreen'
import CartScreen from './screens/Customer/CartScreen'
import LoginScreen from './screens/Auth/LoginScreen'
import RegisterScreen from './screens/Auth/RegisterScreen'
import ProfileScreen from './screens/Auth/ProfileScreen'
import ShippingScreen from './screens/Customer/ShippingScreen'
import PaymentScreen from './screens/Customer/PaymentScreen'
import PlaceOrderScreen from './screens/Customer/PlaceOrderScreen'
import OrderScreen from './screens/Customer/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/Product/ProductListScreen'
import ProductEditScreen from './screens/Product/ProductEditScreen'
import ProductAddScreen from './screens/Product/ProductAddScreen'
import OrderListScreen from './screens/OrderListScreen'
import BrandAddScreen from './screens/Brand/BrandAddScreen'
import BrandEditScreen from './screens/Brand/BrandEditScreen'
import BrandListScreen from './screens/Brand/BrandList'
import CategoryListScreen from './screens/Category/CategoryLIstScreen'
import CategoryAddScreen from './screens/Category/CategoryAddScreen'
import CategoryEditScreen from './screens/Category/CategoryEditScreen'
import CategoryScreen from './screens/Customer/Categoryscreen'
import CategoryProduct from './screens/Customer/CategoryProduct'
import AdminRoute from './components/Routes/AdminRoute'
import PrivateRoute from './components/Routes/PrivateRoute'
import SellerRoute from './components/Routes/SellerRoute'
import OrderScreenAdmin from './screens/Order/Orderadmin'
import OrderScreenSeller from './screens/Order/Orderseller'

const App = () => {
  return (
    <Router>
      <Header />
     
      <main className='py-3'>
        <Container>
        <Route path='/brand' component={BrandScreen} />
        <Route path='/category' component={CategoryScreen} />
        <Route path='/categorys/:slug' component={CategoryProduct} />
        <Route path='/brands/:slug' component={Brandproduct} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <SellerRoute  path='/admin/productlist/:pageNumber'  component={ProductListScreen}exact />
          <SellerRoute path='/admin/product/:id/edit' component={ProductEditScreen} />
          <SellerRoute path='/admin/product/add' component={ProductAddScreen} />
        
          <AdminRoute  path='/admin/brandlist/'  component={BrandListScreen}exact />
          <AdminRoute path='/admin/brand/:id/edit' component={BrandEditScreen} />
          <AdminRoute path='/admin/brand/add' component={BrandAddScreen} />
          
          <AdminRoute  path='/admin/categorylist/'  component={CategoryListScreen}exact />
          <AdminRoute path='/admin/category/:id/edit' component={CategoryEditScreen} />
          <AdminRoute path='/admin/category/add' component={CategoryAddScreen} />
          
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/seller/order/:id' component={OrderScreenSeller} />
          <Route path='/admin/order/:id' component={OrderScreenAdmin} />


          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
