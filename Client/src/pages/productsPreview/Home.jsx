import { Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// import products from '../../utils/products/products';
import ProductCard from './ProductCard';

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => setProducts(await (await axios.get('/products')).data.products))();
  }, []);

  return (
    <Grid
      as="section"
      templateColumns={['1fr', '1fr 1fr', null, 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
      gap={[4, null, 8, 10, 20]}
      m="5"
    >
      {products.length > 0 ? products.map(product => <ProductCard product={product} key={product.ID} />) : 0}
    </Grid>
  );
};
