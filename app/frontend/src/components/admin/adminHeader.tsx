"use client";
import { handleAdminLogout } from "@/http/api/authApi";
import { Button, Stack } from "@mui/material";
import React from "react";

const AdminHeader = ():JSX.Element => {
  return (
    <header>
      <Stack
        direction={'row'}
        justifyContent={'right'}
        spacing={2}
        padding={2}
      >
        <Button
          onClick={() => handleAdminLogout()}
        >
          ログアウト
        </Button>
      </Stack>
    </header>
  );
}

export default AdminHeader;
