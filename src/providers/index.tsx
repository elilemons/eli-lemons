import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { GyroscopeProvider } from './Gyroscope'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <GyroscopeProvider>{children}</GyroscopeProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
