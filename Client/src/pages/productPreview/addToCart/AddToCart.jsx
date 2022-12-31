import { useState } from 'react';
import { Image, Text, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';

import { cart } from './assets';
import { connect } from 'react-redux';
import { getCart } from '../../../actions';

const AddToCart = ({ product, user, isSignedIn, getCart }) => {
  const [amount, setAmount] = useState(0);

  const productAmountHandler = newAmount => {
    if (amount + newAmount < 0 || amount + newAmount > 50) return;
    setAmount(amount + newAmount);
  };

  return (
    <Flex flexDir={['column', 'row']} justifyContent="space-between" minH="14" gap={['4', '3']}>
      <Flex
        justifyContent={['space-between', null, 'space-around']}
        alignItems="center"
        bg="blue.600"
        rounded="lg"
        w={['full', '40']}
        h="14"
        px={['6', null, '0']}
        userSelect="none"
      >
        <Flex
          onClick={() => productAmountHandler(-1)}
          alignItems="center"
          justifyContent="center"
          h="10"
          cursor="pointer"
          color="orange.400"
          fontWeight="900"
          fontSize="2xl"
        >
          -
        </Flex>

        <Text w="10" textAlign="center">
          {amount}
        </Text>

        <Flex
          onClick={() => productAmountHandler(1)}
          alignItems="center"
          justifyContent="center"
          h="10"
          cursor="pointer"
          color="orange.400"
          fontWeight="900"
          fontSize="2xl"
        >
          +
        </Flex>
      </Flex>

      <Flex
        as={Button}
        onClick={async () => {
          if (amount && isSignedIn && user) {
            await axios.get('/addToCart', {
              params: { userId: user.id, productId: product?.ID, productAmount: amount }
            });
            getCart();
          }
        }}
        title={!isSignedIn ? 'Please login first' : amount === 0 ? 'Please increase the product amount' : null}
        justifyContent="center"
        alignItems="center"
        flex="1 1 auto"
        h="14"
        px="0"
        mr="1"
        gap="3"
        color="white"
        bg={!isSignedIn || !amount ? 'orange.300' : 'orange.400'}
        cursor={!isSignedIn || amount === 0 ? 'not-allowed' : 'pointer'}
        _hover={
          !isSignedIn || amount === 0
            ? {
                bg: 'orange.300'
              }
            : {
                bg: 'rgba(255,125,26,0.7)'
              }
        }
      >
        <Text
          as="span"
          filter="brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7489%) hue-rotate(348deg) brightness(103%) contrast(102%);"
        >
          <Image src={cart} alt="" />
        </Text>

        <Text as="span">Add to cart</Text>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getCart })(AddToCart);
