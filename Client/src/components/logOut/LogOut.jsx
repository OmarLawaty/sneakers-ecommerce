import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineGoogle } from 'react-icons/ai';

import { getCart } from '../../actions';

const LogOut = ({ user: { name }, isOpened, signOut, setIsOpened }) => {
  return (
    <Flex
      pos="absolute"
      zIndex="docked"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="6"
      pl="6"
      pr="12"
      top="-6"
      right="30%"
      bg="white"
      w={isOpened ? ['auto', '22.5rem'] : '0'}
      minH="12"
      rounded="full"
      visibility={isOpened ? 'visible' : 'hidden'}
      opacity={isOpened ? '1' : '0'}
      transition="
      visibility 0.7s ease-in 0.2s,
      opacity 0.2s ease-in 0.2s,
      box-shadow 0.3s ease 0.2s,
      width 0.5s ease 0.1s"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      shadow={isOpened ? '3px 30px 89px -6px rgba(0,0,0,.5)' : 'unset'}
    >
      <Box fontWeight="bold">{name}</Box>

      <Box
        bg="red.600"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="2"
        rounded="lg"
        gap="3"
        color="white"
        cursor="pointer"
        _hover={{ background: 'red.700' }}
        transition="background 0.3s"
        onClick={() => {
          setIsOpened(false);
          signOut();
        }}
      >
        <AiOutlineGoogle size="20" color="white" />
        Log out
      </Box>
    </Flex>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps, { getCart })(LogOut);
