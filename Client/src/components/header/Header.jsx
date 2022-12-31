import { useEffect, useState } from 'react';
import { Box, Container, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Cart from './Cart';
import { NavItems } from './NavItems';
import { logo } from './assets';
import { NavMenuToggler } from './NavMenuToggler';
import GoogleAuth from '../GoogleAuth';

export const Header = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isNavOpened) body.style = 'overflow-y:hidden';
    else body.style = 'overflow-y:auto';
  }, [isNavOpened]);

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
        <Cart />

        <Box pos="relative">
          <GoogleAuth />
        </Box>
      </Flex>
    </Container>
  );
};
