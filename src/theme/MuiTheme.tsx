import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import React from 'react'
import theme from './theme'

const MuiTheme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst >
        {children}
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default MuiTheme
