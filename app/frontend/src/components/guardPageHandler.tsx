"use client";

import { checkLogin } from "@/http/api/authApi";
import { AuthCheckResponseType } from "@/types/responseTypes";
import { CircularProgress } from "@mui/material";
import { use, useEffect, useState } from "react";
import CircleSpinner from "./circleSpinner";

interface GuardPageHandlerProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * ログインチェックを行い、ログインしていない場合はリダイレクトする
 * 
 * @param {GuardPageHandlerProps} props
 * @returns {JSX.Element}
 */
const GuardPageHandler = ({ children, redirectTo }: GuardPageHandlerProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    init();
  }, []);

  const init = async ():Promise<void> => {
    const auth:AuthCheckResponseType|null = await checkLogin();
    if (auth === null) {
      // ログインしていない場合はリダイレクト
      window.location.href = redirectTo === undefined ? '/login' : redirectTo;
    } else {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? <CircleSpinner /> : children}
    </>
  )
}

export default GuardPageHandler;
