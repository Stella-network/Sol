"use client";

import AdminGuardPageHandler from "@/components/admin/adminGuardPageHandler";
import { Paper } from "@mui/material";
import React from "react";

const AdminDashbourd = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>You are administrator</div>
    </Paper>
  );
};

export default AdminDashbourd;
