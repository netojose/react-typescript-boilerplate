/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react'

import theme from '../utils/theme'

export default (): JSX.Element => (
    <ThemeProvider theme={theme}>
        <h1>Hello World!</h1>
    </ThemeProvider>
)
