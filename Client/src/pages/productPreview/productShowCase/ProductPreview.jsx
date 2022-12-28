import { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

import { ProductFullScreenPreview } from './ProductFullScreenPreview';
import { leftIcon, rightIcon } from './assets';

export const ProductPreview = ({ product }) => {
  const [fullScreenPreview, setFullScreenPreview] = useState(false);

  const [activeImage, setActiveImage] = useState(0);

  console.log(product.IMAGES.IMAGES.trim().split(' '));

  const activeImageHandler = amount => {
    if (activeImage + amount < 0) return setActiveImage(product.IMAGES.IMAGES.trim().split(' ').length - 1);

    if (activeImage + amount === product.IMAGES.IMAGES.trim().split(' ').length) return setActiveImage(0);

    setActiveImage(activeImage + amount);
  };

  return (
    <Flex flexDir="column" w={['full', null, '28.5rem', 'xl']} py={['0', null, '2.5']}>
      <Box
        onClick={() => setFullScreenPreview(true)}
        mx={['0', null, '1.5']}
        overflow="hidden"
        rounded={['0', null, '2xl']}
        mb={['0', null, '8']}
        cursor="pointer"
        h={['18.7rem', '30rem', 'auto']}
        pos={['relative', null, 'static']}
      >
        <Box
          onClick={() => activeImageHandler(-1)}
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
          left="4"
          w="10"
          h="10"
          bg="white"
          rounded="full"
          display={['flex', null, 'none']}
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

        <Image
          src={product.IMAGES.IMAGES.trim().split(' ')[activeImage]}
          alt=""
          objectFit={['cover', null, 'unset']}
          h={['full', null, 'inherit']}
        />

        <Box
          onClick={() => activeImageHandler(1)}
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
          right="4"
          w="10"
          h="10"
          bg="white"
          rounded="full"
          display={['flex', null, 'none']}
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

      <Flex gap="6" display={['none', null, 'flex']} justifyContent="center">
        {product.IMAGES.IMAGES.trim().split(' ').map((img, index) => (
          <Box
            onClick={() => setActiveImage(index)}
            key={index}
            w="maxContent"
            overflow="hidden"
            rounded="xl"
            cursor="pointer"
            transition="border 0.3s"
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

      {fullScreenPreview && (
        <ProductFullScreenPreview
          productImages={product.IMAGES.IMAGES.trim().split(' ')}
          setFullScreenPreview={setFullScreenPreview}
          oldActiveImage={activeImage}
        />
      )}
    </Flex>
  );
};
