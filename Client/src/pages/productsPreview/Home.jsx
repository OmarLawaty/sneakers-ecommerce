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
        w="full"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={[4, null, 8, 10, 15]}
        p="5"
      >
        {data.products && data.products.map(product => <ProductCard product={product} key={product.ID} />)}
      </Grid>
    </RequestHandler>
  );
};
