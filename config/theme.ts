import { extendTheme, theme as base } from '@chakra-ui/react'

// Example on how to customize: https://egghead.io/lessons/react-override-the-built-in-component-s-styles-in-chakra-ui
const theme = extendTheme({
  colors: {
    error: base.colors.red[500],
  },
})

export default theme
