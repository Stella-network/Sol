"use client";

import { handleAdminLogin } from "@/http/api/authApi";
import { Box, Button, Input, Paper, Stack } from "@mui/material";
import { useState } from "react";

const LoginPage = ():JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
      <Paper
        sx={{
          width: 300,
          margin: 'auto',
          padding: 10,
        }}
      >
          <Stack direction={'column'} spacing={3}>
            <Box
              textAlign={'center'}
              fontSize={20}
              paddingBottom={3}
            >
              管理アカウント認証
            </Box>
            <Input
              value={userName}
              placeholder="ユーザー名"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              value={password}
              placeholder="パスワード"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={() => handleAdminLogin(userName, password)}
              variant="contained"
              color="secondary"
            >
              ログイン
            </Button>
          </Stack>
      </Paper>
  );
}

export default LoginPage;
