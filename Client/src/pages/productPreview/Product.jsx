import { useParams } from 'react-router-dom';

import { ProductInfo, ProductPreview } from './';
import { PageNotFound } from '../pageNotFound/PageNotFound';
import { useFetch } from '../../hooks';
import { RequestHandler } from '../../components';
import { Box } from '@chakra-ui/react';

export const Product = () => {
  const productId = useParams().id;

  const { data, isLoading, error, isError } = useFetch('/product', { productId });

  return data.status !== 404 ? (
    <RequestHandler isLoading={isLoading} isError={isError} error={error}>
      <Box
        display="flex"
        flexDir={['column', null, 'row']}
        justifyContent="space-between"
        gap={[null, null, '12', '20']}
        minH="full"
      >
        <ProductPreview product={data.product} />
        <ProductInfo product={data.product} />
      </Box>
    </RequestHandler>
  ) : (
    <PageNotFound />
  );
};
