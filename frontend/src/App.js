import React from 'react';
import {Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <>
    <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' exact component={LoginScreen} />
          <Route path='/product/:id' exact component={ProductScreen} />
          <Route path='/cart/:id?' exact component={CartScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Container>
      </main>
    <Footer />
    </>
  );
}

export default App;
