import { Grid } from '@chakra-ui/react';

import { useFetch } from '../../hooks';

import ProductCard from './ProductCard';
import { RequestHandler } from '../../components';

export const Home = () => {
  const { data, isLoading, error, isError } = useFetch('/products');

  return (
    <RequestHandler isLoading={isLoading} isError={isError} error={error}>
      <Grid
        as="section"
        templateColumns={['1fr', '1fr 1fr', null, 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
        gap={[4, null, 8, 10, 15]}
        m="5"
        w="full"
      >
        {data.products
          ? data.products.map(product => <ProductCard product={product} key={product.ID} />)
          : 'No Products'}
      </Grid>
    </RequestHandler>
  );
};
