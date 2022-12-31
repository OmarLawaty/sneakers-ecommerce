import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components';
import { Home, Product, PageNotFound } from './pages';
import { getCart } from './actions';
import PaymentSuccessFull from './pages/paymentSuccessFull/PaymentSuccessFull';

const App = ({ isSignedIn, getCart }) => {
  useEffect(() => {
    getCart();
  }, [getCart, isSignedIn]);

  return (
    <>
      <Header />

      <Container as="main" flex="1 1 auto" px={['0', null, '16']} py={['0', null, '20']} mb={['10', null, 'unset']}>
        <Routes>
          <Route path="*" element={<Navigate to={`/products/`} />} />
          <Route path="/products/" element={<Home />} />
          <Route path="/products/*" element={<PageNotFound />} />
          <Route path={`/products/:id`} element={<Product />} />
          <Route path={`/products/successful-payment`} element={<PaymentSuccessFull />} />
        </Routes>
      </Container>
    </>
  );
};

const mapStateToProps = ({ auth: isSignedIn }) => ({ isSignedIn });

export default connect(mapStateToProps, { getCart })(App);
