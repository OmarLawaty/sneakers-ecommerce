import { extendTheme } from '@chakra-ui/react';

// Global Values
const globalStyles = {
  global: {
    '*': {
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box'
    },
    img: {
      h: 'auto',
      w: 'full',
      userSelect: 'none'
    },
    body: {
      backgroundColor: 'white',
      minH: '100vh',
      scrollbarGutter: 'stable',
      color: 'black'
    }
  }
};

// Base Values
const colors = {
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',

  blue: {
    600: 'hsl(223, 64%, 98%)',
    700: 'hsl(220, 14%, 75%)',
    800: 'hsl(219, 9%, 45%)',
    900: 'hsl(220, 13%, 13%)'
  },
  orange: {
    300: 'hsl(25, 100%, 94%)',
    400: 'hsl(26, 100%, 55%)'
  },

  modal: 'hsla(0, 0%, 0%, 0.6)'
};

// Custom Components
const Container = {
  baseStyle: {
    maxW: [null, null, null, null, '6xl', '8xl'],
    px: '5',
    py: '1'
  }
};

// Configurations
const config = { initialColorMode: 'light', useSystemColorMode: false };

export default extendTheme({
  styles: {
    ...globalStyles
  },
  colors,
  fonts: {
    body: "'Kumbh Sans', sans-serif",
    heading: "'Kumbh Sans', sans-serif"
  },
  components: { Container },
  config
});
