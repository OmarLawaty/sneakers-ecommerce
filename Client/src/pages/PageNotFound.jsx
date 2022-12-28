import { Box, Link as StyledLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const ProductNotFound = () => {
  return (
    <Box flex="1 1 auto">
      Page Not Found.{' '}
      <StyledLink as={Link} to="/products" color="blue.400">
        Go Back To Home
      </StyledLink>
    </Box>
  );
};
