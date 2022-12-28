import { Flex, Box } from '@chakra-ui/react';

export const NavItems = ({ isNavOpened, setIsNavOpened }) => {
  const navItems = ['Collections', 'Men', 'Women', 'About', 'Contact'];

  return (
    <>
      <Box
        display={['block', null, 'none']}
        h={['100vh', null, 'full']}
        w={['100vw', null, 'auto']}
        pos={['absolute', null, 'static']}
        top="0"
        transition="all 0.4s"
        left={isNavOpened ? '0' : '-100vw'}
        zIndex="modal"
        bg="modal"
        onClick={() => setIsNavOpened(false)}
      ></Box>
      <Flex
        h={['100vh', null, 'full']}
        w={['67%', null, 'auto']}
        gap={['5', null, '6']}
        pos={['absolute', null, 'static']}
        pt={['5.75rem', null, '0']}
        pb={['6', null, '0']}
        pl={['6', null, '0']}
        fontSize={['lg', null, 'md']}
        top="0"
        transition="all 0.5s"
        left={isNavOpened ? '0' : '-100vw'}
        alignItems={['flex-start', null, 'initial']}
        justifyContent={['flex-start', null, 'initial']}
        zIndex="modal"
        flexDir={['column', null, 'row']}
        bg={['white', null, 'transparent']}
      >
        {navItems.map(navItem => (
          <Flex
            alignItems="center"
            key={navItem}
            color={['black', null, 'blue.800']}
            cursor="pointer"
            pos="relative"
            p="0"
            transition="color 0.3s"
            _after={[
              {
                content: ['unset', null, '""'],
                bg: 'orange.400',
                pos: 'absolute',
                bottom: '0',
                left: '0',
                w: '0',
                h: '1',
                transition: 'width 0.3s'
              }
            ]}
            _hover={{
              color: 'blue.900',
              '&:after': {
                w: 'full'
              }
            }}
            fontWeight={['700', null, '400']}
            letterSpacing={['px', null, 'inherit']}
          >
            {navItem}
          </Flex>
        ))}
      </Flex>
    </>
  );
};
