/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePrivy, useLoginWithEmail } from "@privy-io/react-auth";
// import {Link} from "react-router-dom";
import { useNavigate } from "react-router";

import { ErrorIconSvg } from "@/components/svg/layout";
import { Input } from "@/components/ui/input";
import { MessageBoxDialog } from "@/components/dialog/MessageBoxDialog";
import { cn } from "@/lib/utils";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { fetchLoginWalletNonce, loginWithPrivy } from "@/lib/fetcher";
import { setAuthToken } from "@/lib/auth";
export const LoginLamportId = () => {
  const { authenticated, user, signMessage, createWallet } = usePrivy();
  const router = useNavigate();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleLogin = useCallback(async () => {
    if (authenticated) {
      if (!user?.wallet?.address) {
        setErrMessage(
          "You should signup or upgrade your account to email first!"
        );
        setIsErrorOpen(true);
        return;
      }
      try {
        const nonceResult = await fetchLoginWalletNonce(
          user?.wallet?.address || ""
        );
        const userData = {
          user_name: user?.email?.address.substring(0,6) || "USER",
          email: user?.email?.address,
          image: "/default.png",
          address: user?.wallet?.address,
          nonce: nonceResult.nonce,
        };
        const rawData = JSON.stringify(userData);
        const sign = await signMessage(
          {
            message: rawData,
          },
          {
            address: user?.wallet?.address,
            uiOptions: {
              showWalletUIs: false,
            },
          }
        );
        const rs = await loginWithPrivy({
          data: userData,
          sig: sign.signature,
        });
        console.log("rs", rs);
        setAuthToken(rs.access_token);
        router("/portal");
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || error?.message;
        let finalError = errMessage;
        if (errorMessage === "captcha token is missing"){
          finalError = "user not exists";
        }
        setErrMessage(finalError || "Login failed");
        setIsErrorOpen(true);
        console.log("error", error);
      }
      return;
    }
  }, [
    authenticated,
    router,
    signMessage,
    user?.email?.address,
    user?.wallet?.address,
  ]);
  const handleCreateWallet = useCallback(async () => {
    try {      
      if(authenticated) {
        if(!user?.wallet?.address) {
          await createWallet();
        } else {
          // await createWallet();
        }
      }
    } catch (error: any) {
      setErrMessage(error?.message || "Create wallet failed");
      setIsErrorOpen(true);
    }

  }, [authenticated, createWallet, user?.wallet?.address]);
  useEffect(() => {
    handleCreateWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);
  const walletAddress = useMemo(() => {
    return user?.wallet?.address;
  }, [user?.wallet?.address])
  useEffect(() => {
    if(walletAddress) {
      handleLogin();
      console.log("walletAddress", walletAddress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);
  return (
    <div className=" w-full flex flex-col gap-4">
      {/* <div className="text-center">Your Lamport ID</div>
    <div className="text-center text-[#586565] text-xs">
      This will be your unique identifier for the app.
    </div> */}
      <button
        className={cn(
          "text-[#141413] px-30 py-2 rounded-md bg-gradient-to-r from-[#20EAC8] to-[#00E1FF] w-full px-6 mt-10 md:mt-20"
        )}
        onClick={() => {
          router("/portal");
        }}
      >
        Go To Home
      </button>
      <MessageBoxDialog
        open={isErrorOpen}
        onOpenChange={(open) => {
          setIsErrorOpen(open);
        }}
      >
        <div className=" text-white p-4 md:p-4 text-sm">
          <div className=" text-center my-10 text-[#141413]">
            <div className=" flex items-center justify-center">
              {<ErrorIconSvg className=" size-12 text-[#141413]" />}
            </div>
            <div className="mt-10">
              <div>
                {
                  <div>
                    <div className=" w-full text-center text-[#141413]">
                      {errMessage}
                    </div>
                  </div>
                }
              </div>
              <div className=" flex items-center justify-center gap-10">
                {/* <Link
                  to="/login/migrate"
                  className={cn(
                    "text-[#141413] py-2 rounded-lg bg-gradient-to-r from-[#20EAC8] to-[#00E1FF] px-6 mt-10 md:mt-20"
                  )}
                >
                  Upgrade
                </Link>
                <Link
                  to="/signup"
                  className={cn(
                    "text-[#141413]  py-2 rounded-lg bg-gradient-to-r from-[#20EAC8] to-[#00E1FF] px-6 mt-10 md:mt-20"
                  )}
                >
                  Signup
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </MessageBoxDialog>
    </div>
  );
};

type FormType = "email" | "code" | "createWallet" | "lamportId";

export default function LoginV2Page() {
  const privy = usePrivy();
  const [formType, setFormType] = useState<FormType>("email");
  const { sendCode, loginWithCode, state } = useLoginWithEmail();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const form = useForm({
    defaultValues: {
      email: "",
      code: "",
      userName: "",
    },
  });
  const [email, setEmail] = useState("");
  const handleSendCode = useCallback(async () => {
    // if(privy.authenticated) {
    //   setFormType("lamportId");
    //   return;
    // }
    try {
      await sendCode({
        email: form.getValues("email"),
      });
      setEmail(form.getValues("email"));
      setFormType("code");
    } catch (error: any) {
      setErrMessage(error?.message || "Send code failed");
      setIsErrorOpen(true);
    }
  }, [form, sendCode]);
  const handleLogin = useCallback(async () => {
    // if(privy.authenticated) {
    //   setFormType("lamportId");
    //   return;
    // }
    try {
      const rs = await loginWithCode({
        code: form.getValues("code"),
      });
      setFormType("lamportId");
      console.log("rs", rs);
    } catch (error: any) {
      setErrMessage(error?.message || "Login failed");
      setIsErrorOpen(true);
    }
  }, [form, loginWithCode]);

  const inputEmail = form.watch("email");
  const inputCode = form.watch("code");
  const isValidEmail = useMemo(() => {
    return /^[\w\.-]+@[\w\.-]+\.\w+$/.test(inputEmail);
  }, [inputEmail]);
  const isValidCode = useMemo(() => {
    return /^\d{6}$/.test(inputCode);
  }, [inputCode]);
  return (
    <div className="relative w-full h-full bg-white">
      <div className="h-full pt-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 w-full md:w-96 px-4">
          <div className='flex flex-col items-center mt-10 md:mt-20'>
            <img src='/images/login/wallet.png' className='w-[116px] h-[128px] mb-[24px]' />
            <p className='text-2xl font-medium text-primary'>Sign in to get started</p>
          </div>
          <Form {...form}>
            {formType === "email" && (
              <div className=" w-full flex flex-col gap-4">
                <div className="text-center">Enter Email</div>
                <Input
                  className=" border border-[#141413] rounded-md"
                  {...form.register("email")}
                />
                <button
                  disabled={!isValidEmail}
                  className={cn(
                    "text-[#141413] py-2 rounded-md w-full px-6 mt-10 md:mt-20",
                    isValidEmail
                      ? "bg-[#0E0E10] text-white"
                      : "bg-[#F4F4F4] cursor-not-allowed"
                  )}
                  onClick={handleSendCode}
                >
                  Continue
                </button>
              </div>
            )}
            {formType === "code" && (
              <div className=" w-full flex flex-col gap-4">
                <div className="text-center">Verify your email</div>
                <div className="text-center text-[#586565] text-xs">
                  Enter the 6-digit code we sent you to ({email})
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className=" flex items-center justify-center">
                        <FormControl className="">
                          <InputOTP maxLength={7} {...field}>
                            {/* <InputOTPGroup> */}
                            <InputOTPSlot
                              className=" border-[#141413] rounded-md"
                              index={0}
                            />
                            <InputOTPSlot
                              className=" border-[#141413] rounded-md border-l"
                              index={1}
                            />
                            <InputOTPSlot
                              className=" border-[#141413] rounded-md border-l"
                              index={2}
                            />
                            <InputOTPSlot
                              className=" border-[#141413] rounded-md border-l"
                              index={3}
                            />
                            <InputOTPSlot
                              className=" border-[#141413] rounded-md border-l"
                              index={4}
                            />
                            <InputOTPSlot
                              className=" border-[#141413] rounded-md border-l"
                              index={5}
                            />
                            {/* <InputOTPSlot className=" border-[#141413] rounded-md border-l" index={6} /> */}
                            {/* </InputOTPGroup> */}
                          </InputOTP>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <button
                  disabled={!isValidCode}
                  className={cn(
                    "text-[#141413] py-2 rounded-md w-full px-6 mt-10 md:mt-20",
                    isValidCode
                      ? "bg-[#0E0E10] text-white"
                      : "bg-[#F4F4F4] cursor-not-allowed"
                  )}
                  onClick={handleLogin}
                >
                  Continue
                </button>
              </div>
            )}
            {formType === "lamportId" && <LoginLamportId />}
          </Form>
        </div>
      </div>
      <MessageBoxDialog
        open={isErrorOpen}
        onOpenChange={(open) => {
          setIsErrorOpen(open);
        }}
      >
        <div className=" text-white p-4 md:p-4 text-sm">
          <div className=" text-center my-10 text-[#141413]">
            <div className=" flex items-center justify-center">
              {<ErrorIconSvg className=" size-12 text-[#141413]" />}
            </div>
            <div className="mt-10">
              {
                <div>
                  <div className=" w-full text-center text-[#141413]">
                    {errMessage}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </MessageBoxDialog>
    </div>
  );
}
