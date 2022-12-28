import { useParams } from 'react-router-dom';

import { ProductInfo, ProductPreview } from './';
import { PageNotFound } from '../PageNotFound';
import { useFetch } from '../../hooks';
import { RequestHandler } from '../../components';

export const Product = ({ setCart }) => {
  const productId = useParams().id;

  const { data, isLoading, error, isError } = useFetch('/product', { productId });

  return data.status !== 404 ? (
    <RequestHandler isLoading={isLoading} isError={isError} error={error}>
      <ProductPreview product={data.product} />
      <ProductInfo product={data.product} setCart={setCart} />
    </RequestHandler>
  ) : (
    <PageNotFound />
  );
};
