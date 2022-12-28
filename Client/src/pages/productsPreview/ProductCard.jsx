import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
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
      rounded="lg"
      overflow="hidden"
      cursor="pointer"
      bg="#fafafa"
      border="orange 1px solid"
      transition="transform 500ms, box-shadow 300ms, border 500ms"
      _hover={{ transform: 'scale(1.02)', border: 'darkblue 1px solid', shadow: 'lg' }}
    >
      <Image h="200px" w="full" objectFit="cover" loading="lazy" src={product.IMAGES[0]} alt={`${product.NAME}`} />

      <Flex p="4" pb="10">
        <Heading size="sm" fontWeight="700" lineHeight="1.4" mb="15">
          {product.NAME}
        </Heading>

        <Heading
          as="h2"
          textTransform="uppercase"
          size="xs"
          letterSpacing={['0', null, '1px']}
          fontWeight="700"
          color="orange.400"
          pt="2"
          mb={['2.5', null, '5']}
        >
          {product?.COMPANY}
        </Heading>
      </Flex>

      <Box>
        <Text fontWeight="600" fontSize="xl">
          <sup>{product.PRICE.CURRENCY}</sup> {getDiscount(product.PRICE.PRICE, product.PRICE.DISCOUNT)}
          <Box as="span" fontWeight="300" textDecor="line-through" pl="1" color="blue.700">
            <sub>
              {product.PRICE.CURRENCY}
              {product.PRICE.PRICE}
            </sub>
          </Box>
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
