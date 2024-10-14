"use client";

import GuardPageHandler from "@/components/guardPageHandler";
import httpRequest from "@/http/HttpRequest";
import { checkLogin, handleLogout } from "@/http/api/authApi";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/utils";
import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";

const SamplePage = () => {

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GuardPageHandler>
        <div>You have a session</div>
      </GuardPageHandler>
    </Paper>
  );
};

export default SamplePage;
