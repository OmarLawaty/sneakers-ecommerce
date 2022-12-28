import { Box, Heading, Text, Flex } from '@chakra-ui/react';

import { AddToCart } from '../../components';
import { formatCurrency, getDiscount } from '../../utils/helpers';

export const ProductInfo = ({ product, setCartItem }) => {
  return (
    <Box
      w={[null, null, 'md', 'xl']}
      pt={['4', null, '16']}
      px={['6', null, '0']}
      display={{
        xl: 'flex'
      }}
      flexDir="column"
    >
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
        {product.COMPANY}
      </Heading>

      <Text
        fontSize={['3xl', null, '2.75rem']}
        letterSpacing={['-0.9px', null, '0']}
        fontWeight="700"
        lineHeight="1.1"
        mb={['3.5', null, '8']}
      >
        {product.NAME}
      </Text>

      <Text lineHeight="1.6" letterSpacing="-0.4px" mb={['5', null, '4']}>
        {product.DESCRIPTION}
      </Text>

      <Flex
        gap="1"
        mb={['5', null, '9']}
        alignItems={['center', null, 'flex-start']}
        justifyContent={['space-between', null, 'flex-start']}
        flexDir={['row', null, 'column']}
      >
        <Flex as="p" alignItems="center" fontSize="3xl" fontWeight="700" gap="4">
          {product.PRICE.CURRENCY}
          {formatCurrency(getDiscount(product.PRICE.PRICE, product.PRICE.DISCOUNT))}{' '}
          <Text
            display="inline-flex"
            as="span"
            alignItems="center"
            justifyContent="center"
            color="orange.400"
            bg="orange.300"
            fontSize="md"
            rounded="base"
            w="12"
            h="7"
          >
            {product.PRICE.DISCOUNT}%
          </Text>
        </Flex>

        <Text color="blue.700" textDecor="line-through" fontWeight="700">
          {product.PRICE.CURRENCY}
          {formatCurrency(product.PRICE.PRICE)}
        </Text>
      </Flex>

      <AddToCart product={product} setCartItem={setCartItem} />
    </Box>
  );
};
