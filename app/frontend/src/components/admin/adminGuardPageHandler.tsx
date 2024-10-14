"use client";

import { checkAdminLogin } from "@/http/api/authApi";
import { AuthCheckResponseType } from "@/types/responseTypes";
import { useEffect, useState } from "react";
import CircleSpinner from "../circleSpinner";
import { Stack } from "@mui/material";

interface GuardPageHandlerProps {
  children: React.ReactNode;
}

/**
 * 管理ユーザーのログインチェックを行い、ログインしていない場合はリダイレクトする
 * 
 * @param {GuardPageHandlerProps} props
 * @returns {JSX.Element}
 */
const AdminGuardPageHandler = ({ children }: GuardPageHandlerProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    init();
  }, []);

  const init = async ():Promise<void> => {
    const auth:AuthCheckResponseType|null = await checkAdminLogin();
    if (auth === null) {
      // ログインしていない場合は404ページにリダイレクト
      window.location.href = '/404';
    } else {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ?
        <CircleSpinner />
        : 
        <Stack
          direction={'column'}
        >
          {children}
        </Stack>
      }
    </>
  )
}

export default AdminGuardPageHandler;
