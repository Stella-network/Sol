"use client";

import httpRequest from "@/http/HttpRequest";
import { checkLogin, handleLogout } from "@/http/api/authApi";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/utils";
import { Box, Button, Paper } from "@mui/material";
import React from "react";

const SamplePage = () => {

  const init = async () => {
    const result = await httpRequest(
      '/sample',
      'test',
      {userName: 'test', password: 'test'},
      'GET'
    )
    console.log(result)
  }
  init()

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box p={2}>
        <h1>Sample Page</h1>
      </Box>
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        ログアウト
      </Button>
      <Button
        onClick={async () => {
          const res = await checkLogin();
          console.log(res);
        }}
      >
        ログインチェック
      </Button>
    </Paper>
  );
};

export default SamplePage;
