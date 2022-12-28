import { useState } from 'react';
import { Box, Text, Image, Heading, Flex, Grid, Button } from '@chakra-ui/react';

import { formatCurrency, getDiscount } from '../../utils/helpers';
import { cartIcon, deleteIcon } from './assets';
import { Link } from 'react-router-dom';

export const Cart = ({ cart, setCartItem }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Box pos={['static', 'relative']}>
      <Box onClick={() => setIsOpened(!isOpened)} cursor="pointer" pos="relative">
        <Text
          position="absolute"
          px="1.5"
          fontSize="10px"
          zIndex="docked"
          top="-7px"
          left="11px"
          bg="orange.400"
          color="#fff"
          textAlign="center"
          rounded="full"
        >
          {cart.length ? cart.reduce((acc, cartItem) => acc + cartItem.amount, 0) : null}
        </Text>
        <Image
          src={cartIcon}
          alt=""
          transition="filter 0.3s"
          filter={isOpened ? 'brightness(0)' : 'brightness(100%)'}
          _hover={{
            filter: 'brightness(0)'
          }}
        />
      </Box>

      <Box
        pos="absolute"
        zIndex="docked"
        overflow="hidden"
        display="flex"
        flexDir="column"
        top={isOpened ? ['4.3rem', '12'] : ['-10%', '0']}
        left={['0', '-17rem', '-10.3rem']}
        right={['0', 'unset']}
        bg="white"
        w={['auto', '22.5rem']}
        mx={['2', '0']}
        maxH={isOpened ? '50rem' : '0'}
        minH={isOpened ? '64' : '0'}
        rounded="lg"
        transition="opacity 0.3s ease 0.1s,
        visibility 0.3s ease 0.1s,
        transform 0.3s ease 0.1s,
        box-shadow 0.3s ease 0.2s,
        top 0.3s ease 0.1s,
        width 0.3s ease 0.1s,
        max-height 0.3s,
        min-height 0.3s 0.1s"
        transform={`scale(${isOpened ? 1 : 0})`}
        opacity={isOpened ? 100 : 0}
        visibility={isOpened ? 'visible' : 'hidden'}
        shadow={isOpened ? '3px 30px 89px -6px rgba(0,0,0,.71)' : 'unset'}
      >
        <Heading
          as="h3"
          fontFamily="inherit"
          size="4"
          fontWeight="700"
          color="black"
          px="6"
          py={['1.6rem', '1.4rem']}
          borderBottom="1px solid rgba(104,112,125,.2)"
        >
          Cart
        </Heading>

        {cart.length ? (
          <>
            <CartItem cart={cart} setCartItem={setCartItem} />
            <Button
              display="block"
              transition="background-color 0.2s"
              mx="auto"
              mt="5"
              mb="8"
              w="80"
              h="14"
              rounded="lg"
              fontWeight="700"
              color="white"
              bg="orange.400"
              _hover={{
                bg: 'rgba(255,125,26,0.7)'
              }}
            >
              Checkout
            </Button>
          </>
        ) : (
          <Text display="flex" flex="1 1 auto" justifyContent="center" alignItems="center" color="black">
            Your cart is empty
          </Text>
        )}
      </Box>
    </Box>
  );
};

const CartItem = ({ cart, setCartItem }) =>
  cart.map(cartItem => {
    // const productThumbnail = require(`../../utils/products/assets/${cartItem.ID}`).images[0][0];

    return (
      <Flex key={cartItem.ID} alignItems="center" justifyContent="space-between" px="6" pt="6">
        <Grid
          as={Link}
          to={`/products/${cartItem.ID}`}
          templateColumns="50px auto"
          templateRows="auto"
          gap="0.4rem 1rem"
          color="blue.800"
        >
          <Box gridRow="1/4" rounded="lg" h="min-content" overflow="hidden">
            <img src={cartItem.IMAGES.IMAGES.split(' ')[0]} alt="" />
          </Box>

          <Heading as="h4" gridRow="1/2" fontSize="medium" fontWeight="400">
            {cartItem.NAME}
          </Heading>

          <Text gridColumn="2/3" letterSpacing="wide">
            <Box as="span">
              {cartItem.PRICE.CURRENCY}
              {formatCurrency(getDiscount(cartItem.PRICE.PRICE, cartItem.PRICE.DISCOUNT))}
            </Box>{' '}
            <Box as="span">x {cartItem.amount}</Box>{' '}
            <Box as="span" fontWeight="700" color="black" letterSpacing="widest">
              {cartItem.PRICE.CURRENCY}
              {formatCurrency(getDiscount(cartItem.PRICE.PRICE, cartItem.PRICE.DISCOUNT) * cartItem.amount)}
            </Box>
          </Text>
        </Grid>

        <Box onClick={() => setCartItem(cartItem, true)} cursor="pointer">
          <Image src={deleteIcon} alt="" />
        </Box>
      </Flex>
    );
  });
