import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <Box
      as={Link}
      to={`/products/${product.ID}`}
      h="min-content"
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

      <Flex justifyContent="space-between" p="4" pb="5" gap="4">
        <Flex gap="3" flexDir="column">
          <Heading size="sm" fontWeight="700" lineHeight="1.4">
            {product.NAME}
          </Heading>

          <Heading
            as="h2"
            textTransform="uppercase"
            fontSize="0.750rem"
            letterSpacing={['0', null, '1px']}
            fontWeight="700"
            color="orange.400"
          >
            {product?.COMPANY}
          </Heading>
        </Flex>

        <Flex flexDir="column" justifyContent="flex-start">
          <Text fontWeight="600" fontSize="xl">
            {product.PRICE.CURRENCY} {getDiscount(product.PRICE.PRICE, product.PRICE.DISCOUNT)}
          </Text>

          <Box as="span" fontWeight="300" textDecor="line-through" color="blue.700">
            {product.PRICE.CURRENCY}
            {product.PRICE.PRICE}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductCard;
