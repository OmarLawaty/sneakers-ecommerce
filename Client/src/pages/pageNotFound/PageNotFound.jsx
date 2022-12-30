import { Box, Image, Link as StyledLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { sneaker } from './assets';

export const PageNotFound = () => {
  return (
    <Box display="flex" flexDir="column" alignItems="center" flex="1 1 auto">
      <Box w={['70%', null, null, '50%']} minW="260px">
        <Image src={sneaker} />
      </Box>

      <Box display="flex" flexWrap="wrap" mx="16" justifyContent="center">
        Page Not Found.{' '}
        <StyledLink as={Link} to="/products" color="blue.400">
          Go Back To Home
        </StyledLink>
      </Box>
    </Box>
  );
};
