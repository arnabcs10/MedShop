import React from 'react';
import {Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  return (
    <>
    <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id'  component={OrderScreen} />
          <Route path='/placeorder'  component={PlaceOrderScreen} />
          <Route path='/payment'  component={PaymentScreen} />
          <Route path='/shipping'  component={ShippingScreen} />
          <Route path='/login'  component={LoginScreen} />
          <Route path='/profile'  component={ProfileScreen} />
          <Route path='/register'  component={RegisterScreen} />
          <Route path='/product/:id'  component={ProductScreen} />
          <Route path='/cart/:id?'  component={CartScreen} />
          <Route path='/admin/userlist'  component={UserListScreen} />
          <Route path='/admin/user/:id/edit'  component={UserEditScreen} />
          <Route path='/admin/productlist'  component={ProductListScreen} />
          <Route path='/admin/product/:id/edit'  component={ProductEditScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Container>
      </main>
    <Footer />
    </>
  );
}

export default App;
