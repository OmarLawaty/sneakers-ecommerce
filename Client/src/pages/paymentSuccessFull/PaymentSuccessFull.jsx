import { useEffect, useState } from 'react';
import { Box, Image, Link as StyledLink } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { checkMark } from './assets';

export const PaymentSuccessFull = () => {
  const [redirectIn, setRedirectIn] = useState(5);

  const navigate = useNavigate();
  const history = useLocation();

  useEffect(() => {
    const timeout = setInterval(() => {
      setRedirectIn(redirectIn - 1);

      if (redirectIn === 1 && history.pathname === '/products/successful-payment') {
        navigate('/products/');
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, [history.pathname, navigate, redirectIn]);

  return (
    <Box display="flex" flexDir="column" alignItems="center" flex="1 1 auto" gap="20" p="5">
      <Box w={['50%', null, null, '40%']} minW="260px">
        <Image src={checkMark} />
      </Box>

      <Box display="flex" flexWrap="wrap" mx="32" justifyContent="center">
        Payment Successful.({redirectIn})
        <StyledLink as={Link} to="/products" color="blue.400">
          Go Back To Home
        </StyledLink>
      </Box>
    </Box>
  );
};
