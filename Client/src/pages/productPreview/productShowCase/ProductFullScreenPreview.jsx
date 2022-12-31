import { useState } from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';

import { closeIcon, leftIcon, rightIcon } from './assets';

export const ProductFullScreenPreview = ({ productImages, setFullScreenPreview, oldActiveImage }) => {
  const [activeImage, setActiveImage] = useState(oldActiveImage);

  const activeImageHandler = amount => {
    if (activeImage + amount < 0) return setActiveImage(productImages.length - 1);

    if (activeImage + amount === productImages.length) return setActiveImage(0);

    setActiveImage(activeImage + amount);
  };

  return (
    <Box display={['none', null, 'block']}>
      <Box
        w="100vw"
        h="100vh"
        bg="modal"
        pos="absolute"
        top="0"
        left="0"
        zIndex="modal"
        onClick={() => setFullScreenPreview(false)}
      ></Box>

      <Flex
        pos="absolute"
        zIndex="modal"
        top="5.5rem"
        left="50%"
        transform="translateX(-50%)"
        flexDir="column"
        justifyContent="center"
        alignItems="flex-end"
        w="34.5rem"
      >
        <Box
          onClick={() => setFullScreenPreview(false)}
          cursor="pointer"
          w="5"
          transition="filter 0.3s"
          filter="brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%)"
          _hover={{ filter: 'invert(78%) sepia(70%) saturate(3221%) hue-rotate(2deg) brightness(107%) contrast(98%)' }}
        >
          <Image src={closeIcon} alt="" />
        </Box>

        <Box pos="relative" mt="6" mb="9" w="full">
          <Box
            onClick={() => activeImageHandler(-1)}
            pos="absolute"
            top="48%"
            transform="translateY(-50%)"
            left="-7"
            w="14"
            h="14"
            bg="white"
            rounded="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            _hover={{
              img: {
                filter: 'invert(78%) sepia(70%) saturate(3221%) hue-rotate(2deg) brightness(107%) contrast(98%)'
              }
            }}
            cursor="pointer"
          >
            <Image src={leftIcon} alt="" w="auto" transition="filter 0.3s" filter="unset" />
          </Box>

          <Box overflow="hidden" rounded="2xl" display="flex" justifyContent="center" minH="35rem" maxH="35rem">
            <Image src={productImages[activeImage]} alt="" w="auto" h="auto" />
          </Box>

          <Box
            onClick={() => activeImageHandler(1)}
            pos="absolute"
            top="48%"
            transform="translateY(-50%)"
            right="-7"
            w="14"
            h="14"
            bg="white"
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
              img: {
                filter: 'invert(78%) sepia(70%) saturate(3221%) hue-rotate(2deg) brightness(107%) contrast(98%)'
              }
            }}
            cursor="pointer"
          >
            <Image src={rightIcon} alt="" w="auto" transition="filter 0.3s" filter="unset" />
          </Box>
        </Box>

        <Flex px="3.25rem" gap="6" w="full" justifyContent="center">
          {productImages.map((img, index) => (
            <Box
              onClick={() => setActiveImage(index)}
              key={index}
              w="maxContent"
              overflow="hidden"
              rounded="xl"
              cursor="pointer"
              transition="border 0.3s, filter 0.3s"
              border={activeImage === index ? '2px solid hsl(26, 100%, 55%)' : '2px solid transparent'}
              pos="relative"
              _after={{
                content: "''",
                pos: 'absolute',
                top: '0',
                left: '0',
                w: 'full',
                h: 'full',
                bg: 'white',
                transition: 'filter 0.3s',
                filter: activeImage === index ? 'opacity(0.7)' : 'opacity(0)'
              }}
              _hover={{
                border: '2px solid hsl(26, 100%, 55%)'
              }}
            >
              <Image src={img} alt="" />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
