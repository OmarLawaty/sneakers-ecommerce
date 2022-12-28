import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import history from '../../utils/history';
import { ProductInfo, ProductPreview } from './';
import { PageNotFound } from '../PageNotFound';
import axios from 'axios';

export const Product = ({ cart, setCartItem }) => {
  const productId = useParams().id;

  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const product = await (await axios.get('/product', { params: { productId: productId } })).data;

      if (await product.ErrMessage) history.push('/products/notfound');
      setProduct(product.product);
    })();
  }, [product.length, productId]);

  return product.NAME ? (
    <>
      <ProductPreview product={product} cart={cart} />
      <ProductInfo product={product} setCartItem={setCartItem} />
    </>
  ) : (
    <PageNotFound />
  );
};
