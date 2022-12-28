import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <Box
      as={Link}
      to={`/products/${product.ID}`}
      minH="10"
      w="full"
      pos="relative"
      rounded="base"
      overflow="hidden"
      cursor="pointer"
      bg="#fafafa"
      border="orange 1px solid"
      transition="transform 500ms, box-shadow 300ms, border 500ms"
      _hover={{ transform: 'scale(1.02)', border: 'darkblue 1px solid', shadow: 'lg' }}
    >
      <Image h="160px" w="full" objectFit="cover" loading="lazy" src={product.IMAGES[0]} alt={`${product.NAME}`} />

      <Box p="4" pb="10">
        <Heading size="sm" fontWeight="700" lineHeight="1.4" mb="15">
          {product.NAME}
        </Heading>

        <Box>
          <Text fontWeight="600">
            {product.PRICE.CURRENCY}
            {getDiscount(product.PRICE.PRICE, product.PRICE.DISCOUNT)}
            <Box as="span" fontWeight="300" textDecor="line-through" pl="1">
              <sub>
                {product.PRICE.CURRENCY}
                {product.PRICE.PRICE}
              </sub>
            </Box>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
