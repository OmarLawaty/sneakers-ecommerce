import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

export const NavMenuToggler = ({ setIsNavOpened, isNavOpened }) => {
  return (
    <Flex
      onClick={() => setIsNavOpened(!isNavOpened)}
      display={['flex', null, 'none']}
      flexDir="column"
      gap="1"
      transition="all 0.3s"
      mt={isNavOpened ? '1px' : '1'}
      cursor="pointer"
      userSelect="none"
      pos={isNavOpened ? 'sticky' : 'static'}
      zIndex={isNavOpened ? 'popover' : 'base'}
    >
      <Box
        as="hr"
        w="4"
        border="1px solid transparent"
        bg="blue.800"
        transition="all 0.2s"
        transform={isNavOpened ? 'rotate(-45deg)' : 'rotate(0)'}
        mb={isNavOpened ? '-4' : '0'}
        mt={isNavOpened ? '9px' : '0'}
      />
      <Box
        as="hr"
        w="4"
        border="1px solid transparent"
        bg="blue.800"
        transition="all 0.2s"
        filter={isNavOpened ? 'opacity(0)' : 'opacity(100%)'}
      />
      <Box
        as="hr"
        w="4"
        border="1px solid transparent"
        bg="blue.800"
        transition="all 0.2s"
        transform={isNavOpened ? 'rotate(45deg)' : 'rotate(0)'}
        mt={isNavOpened ? '1' : '0'}
      />
    </Flex>
  );
};
