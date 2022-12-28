import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components';
import { useFetch } from './hooks';
import { Home, Product, PageNotFound } from './pages';

const App = () => {
  const [cart, setCart] = useState([]);

  const { data } = useFetch('/getCart', { userId: 0, userName: 'Omar' });

  useEffect(() => {
    setCart(data?.cart);
  }, [data?.cart]);

  return (
    <>
      <Header cart={cart} setCart={setCart} />

      <Container
        as="main"
        display="flex"
        flexDir={['column', null, 'row']}
        justifyContent="space-between"
        px={['0', null, '16']}
        py={['0', null, '20']}
        gap={[null, null, '12', '20']}
        mb="10"
      >
        <Routes>
          <Route path="*" element={<Navigate to={`/products/`} />} />
          <Route path="/products/" element={<Home />} />
          <Route path="/products/*" element={<PageNotFound />} />
          <Route path={`/products/:id`} element={<Product setCart={setCart} />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
