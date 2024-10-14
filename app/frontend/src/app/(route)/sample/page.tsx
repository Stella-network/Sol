"use client";

import { Box,Paper } from "@mui/material";
import React, { useState } from "react";

const SamplePage = ():JSX.Element => {

  const [message, setMessage] = useState<string>("here is sample page");

  const init = ():void => {
    
  }

  init()

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        width: "70%",
        margin: "100px auto 0 auto"
      }}
    >
      <Box>
        { message }
      </Box>
    </Paper>
  );
};

export default SamplePage;
