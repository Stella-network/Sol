"use client";

import { basePaperStyle } from "@/styles/baseStyles";
import { Box,Button,Paper } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HomePage = ():JSX.Element => {

  const [message, setMessage] = useState<string>("みなのホームページ");

  const init = ():void => {
    
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Paper
      sx={basePaperStyle}
    >
      <Box
        sx={{
          width: "auto"
        }}
      >
        <Image
          src={"/IMG_4116.jpg"}
          alt={"test"}
          width={400}
          height={320}
        />
      </Box>
      <Box>
        { message }
      </Box>
      <Box
        sx={{
          marginTop: '30px'
        }}
      >
        <Button
          variant="contained"
          color="success"
        >
          {`ゲームコーナー`}
        </Button>
      </Box>
    </Paper>
  );
};

export default HomePage;
