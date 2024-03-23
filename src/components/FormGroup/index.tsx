import React from 'react'
import { Props } from './type'
import { Box } from '@mui/joy'

function FormGroup({children} : Props) {
  return (
    <Box margin={5}>
        {children}
    </Box>
  )
}

export default FormGroup