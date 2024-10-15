"use client";

import { Box,Paper } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const SamplePage = ():JSX.Element => {

  const [message, setMessage] = useState<string>("みなのホームページ");

  const init = ():void => {
    
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        width: "90%",
        margin: "20px auto 0 auto"
      }}
    >
      <Image
        src={"/next.svg"}
        alt={"test"}
        width={100}
        height={100}
      />
      <Box>
        { message }
      </Box>
    </Paper>
  );
};

export default SamplePage;
