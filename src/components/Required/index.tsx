import { Typography } from '@mui/joy'
import React from 'react'

function Required() {
  return (
    <Typography sx={{color : "danger.plainColor"}} component="b">*</Typography>
  )
}

export default Required