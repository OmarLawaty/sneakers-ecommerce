import { useState } from 'react';
import { Box, Container, Flex, Image } from '@chakra-ui/react';

import { Cart } from './Cart';
import { NavItems } from './NavItems';
import { logo, avatar } from './assets';
import { NavMenuToggler } from './NavMenuToggler';
import { Link } from 'react-router-dom';

export const Header = ({ cart, setCart }) => {
  const [isNavOpened, setIsNavOpened] = useState(false);

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      minH={['4.3rem', null, '28']}
      py="0"
      pb={['2', null, '0']}
      px={['6', null, 'auto']}
      borderBottom="1px solid rgba(104,112,125,.2)"
    >
      <Flex
        justifyContent={['flex-start', null, 'space-between']}
        alignItems="center"
        width="37rem"
        gap={['3.5', null, '0']}
      >
        <NavMenuToggler setIsNavOpened={setIsNavOpened} isNavOpened={isNavOpened} />

        <Link cursor="pointer" to="/products">
          <Image src={logo} alt="logo" />
        </Link>

        <NavItems isNavOpened={isNavOpened} setIsNavOpened={setIsNavOpened} />
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" w={['9.6rem', '6.5rem', '7.5rem']}>
        <Cart cart={cart} setCart={setCart} />

        <Box
          w={['6', '8', '12']}
          rounded="50px"
          cursor="pointer"
          transition="outline 0.1s"
          outline="0px solid hsl(26, 100%, 55%)"
          _hover={{
            outline: '2px solid hsl(26, 100%, 55%)'
          }}
        >
          <Image src={avatar} alt="avatar" />
        </Box>
      </Flex>
    </Container>
  );
};
