/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { use, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  loginUser,
  registerUser,
  requestOtp,
  resetPassword,
} from "@/lib/redux/slices/userSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

type AuthMode = "login" | "register" | "forgot";

type AuthFormValues = {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: "candidate" | "recruiter";
  otp?: string;
};

export default function AuthPage({ params }: { params: Promise<{ method: string }> }) {
  const unwrappedParams = use(params);
  const method = (unwrappedParams.method as AuthMode) || "login"; 

  const [mode, setMode] = useState<AuthMode>(method);
  const [otpStep, setOtpStep] = useState<"request" | "reset">("request");
  const [forgotEmail, setForgotEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      role: "candidate",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keep email in sync on reset step so reset-password always has the right email
  useEffect(() => {
    if (mode === "forgot" && otpStep === "reset" && forgotEmail) {
      setValue("email", forgotEmail);
    }
  }, [mode, otpStep, forgotEmail, setValue]);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    if (newMode !== "forgot") {
      setOtpStep("request");
      setForgotEmail("");
    }
    router.replace(`/auth/${newMode}`);
    reset();
  };

  const getErrorMessage = (err: unknown): string => {
    if (typeof err === "string") return err;
    const data = (err as Record<string, unknown>) ?? {};
    const msg = data.message ?? data.msg ?? data.error;
    return typeof msg === "string" ? msg : "Something went wrong. Please try again.";
  };

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    setError("root", { message: "" });

    try {
      if (mode === "login") {
        const result = await dispatch(
          loginUser({
            payload: { email: data.email, password: data.password },
            onSuccess: () => {},
            onError: () => {},
          })
        ).unwrap();
        if (result) {
          router.push("/dashboard");
          router.refresh();
        }
      } else if (mode === "register") {
        const result = await dispatch(
          registerUser({
            payload: {
              fullName: data.fullName!,
              email: data.email,
              password: data.password,
              role: data.role || "candidate",
            },
            onSuccess: () => {},
            onError: () => {},
          })
        ).unwrap();
        if (result) {
          alert("Registration successful! Please log in.");
          switchMode("login");
        }
      } else if (mode === "forgot") {
        if (otpStep === "request") {
          await dispatch(
            requestOtp({
              payload: { email: data.email },
              onSuccess: () => {},
              onError: () => {},
            })
          ).unwrap();
          setForgotEmail(data.email);
          alert("OTP sent to your email! Enter the code and new password.");
          setOtpStep("reset");
        } else {
          const emailForReset = forgotEmail || data.email;
          if (!emailForReset?.trim()) {
            setError("root", { message: "Email is required. Please go back and request OTP again." });
            return;
          }
          await dispatch(
            resetPassword({
              payload: {
                email: emailForReset.trim(),
                otp: (data.otp ?? "").trim(),
                password: data.password,
              },
              onSuccess: () => {},
              onError: () => {},
            })
          ).unwrap();
          alert("Password reset successfully! Please log in.");
          setOtpStep("request");
          setForgotEmail("");
          switchMode("login");
        }
      }
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      setError("root", { message: msg });
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, { 
        callbackUrl: "/dashboard", 
        redirect: false,
      });
      
      if (result?.error) {
        alert(`Social login failed: ${result.error}`);
        setIsLoading(false);
      } else if (result?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Social login error:", error);
      alert(`Social login failed: ${error.message || "Please check your provider configuration"}`);
      setIsLoading(false);
    }
  };

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  const direction = mode === "register" ? 1 : -1;

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Desktop Split Layout: Left Image Section */}
      <div className="hidden w-1/2 lg:block relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
           <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80" 
              alt="Office" 
              className="h-full w-full object-cover opacity-50 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-linear-to-tr from-blue-900/80 to-purple-900/80" />
        </div>
        
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
           <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">HireX</span>
           </div>
           
           <div className="mb-12 space-y-6">
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
              >
                 <h2 className="text-5xl font-bold leading-tight">
                    Find your dream job <br/> 
                    <span className="text-blue-400">in record time.</span>
                 </h2>
              </motion.div>
              <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="max-w-md text-lg text-slate-300"
              >
                 Join thousands of professionals and top companies connecting daily on the world's most intuitive recruitment platform.
              </motion.p>
           </div>
           
           <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>© 2026 HireX Inc.</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>Privacy Policy</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>Terms of Service</span>
           </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="relative flex w-full items-center justify-center p-4 lg:w-1/2">
        {/* Mobile Background Mesh */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10" />
          <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-400/20 blur-[120px] delay-1000 dark:bg-purple-600/10" />
        </div>

        {/* Auth Card */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-xl sm:p-10 dark:border-slate-700/50 dark:bg-slate-900/60 dark:shadow-blue-500/20"
        >
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
            >
              <span className="text-2xl font-bold">H</span>
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {mode === "login" && "Welcome Back"}
              {mode === "register" && "Create Account"}
              {mode === "forgot" && "Reset Password"}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {mode === "login" && "Enter your credentials to access your account."}
              {mode === "register" && "Start your journey with HireX today."}
              {mode === "forgot" && "We'll help you get back into your account."}
            </p>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.form
              key={mode}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Full Name */}
              {mode === "register" && (
                <InputGroup
                  icon={<FaUser className="text-slate-400 dark:text-slate-500" />}
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  register={register}
                  validationRules={{ required: "Full Name is required" }}
                  error={errors.fullName}
                />
              )}

              {/* Email */}
              <InputGroup
                icon={<FaEnvelope className="text-slate-400 dark:text-slate-500" />}
                type="email"
                placeholder="Email Address"
                name="email"
                register={register}
                validationRules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                error={errors.email}
              />

              {/* OTP Field */}
              {mode === "forgot" && otpStep === "reset" && (
                <InputGroup
                  icon={<FaCheckCircle className="text-slate-400 dark:text-slate-500" />}
                  type="text"
                  placeholder="6-digit OTP code"
                  name="otp"
                  register={register}
                  validationRules={{
                    required: "OTP code is required",
                    minLength: { value: 4, message: "Code seems too short" },
                  }}
                  error={errors.otp}
                />
              )}

              {/* Password */}
              {(mode !== "forgot" || otpStep === "reset") && (
                <InputGroup
                  icon={<FaLock className="text-slate-400 dark:text-slate-500" />}
                  type="password"
                  placeholder={mode === "forgot" ? "New Password" : "Password"}
                  name="password"
                  register={register}
                  validationRules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  }}
                  error={errors.password}
                  isPassword
                />
              )}

              {/* Confirm Password */}
              {(mode === "register" || (mode === "forgot" && otpStep === "reset")) && (
                <InputGroup
                  icon={<FaCheckCircle className="text-slate-400 dark:text-slate-500" />}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  register={register}
                  isPassword
                  validationRules={{
                    required: "Confirm Password is required",
                    validate: (val: string) => watch("password") === val || "Passwords do not match",
                  }}
                  error={errors.confirmPassword}
                />
              )}

              {/* Forgot Password Link */}
              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 disabled:opacity-70 dark:from-blue-500 dark:to-indigo-500"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : "Submit"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {mode !== "forgot" && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SocialButton
                  icon={<FcGoogle className="h-5 w-5" />}
                  label="Google"
                  onClick={() => handleSocialLogin("google")}
                />
                <SocialButton
                  icon={<FaGithub className="h-5 w-5 text-slate-900 dark:text-white" />}
                  label="GitHub"
                  onClick={() => handleSocialLogin("github")}
                />
              </div>
            </>
          )}

          <div className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            {mode === "login" ? (
              <>
                New to HireX?{" "}
                <button onClick={() => switchMode("register")} className="text-blue-600 hover:underline dark:text-blue-400">
                  Create an account
                </button>
              </>
            ) : mode === "register" ? (
              <>
                Already have an account?{" "}
                <button onClick={() => switchMode("login")} className="text-blue-600 hover:underline dark:text-blue-400">
                  Log in
                </button>
              </>
            ) : (
              <button onClick={() => switchMode("login")} className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400">
                <FaArrowLeft className="text-xs" /> Back to Login
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- Sub-Components ---
const InputGroup = ({
  icon,
  type,
  placeholder,
  register,
  name,
  error,
  isPassword,
  validationRules,
}: any) => {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center rounded-xl border bg-white/50 px-4 py-3 transition-all focus-within:bg-white focus-within:ring-blue-500/20 dark:bg-slate-800/50 dark:focus-within:bg-slate-800 ${error ? "border-red-500 ring-4 ring-red-500/10 dark:ring-red-500/20" : "border-slate-200 focus-within:border-blue-500 focus-within:ring-4 dark:border-slate-700"}`}
      >
        <span className="mr-3">{icon}</span>
        <input
          {...register(name, validationRules)}
          type={inputType}
          placeholder={placeholder}
          suppressHydrationWarning={true}
          className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="ml-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }} 
            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 ml-1 dark:text-red-400"
          >
            <FaExclamationCircle />
            <span>{error.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SocialButton = ({ icon, label, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
  >
    {icon} <span>{label}</span>
  </button>
);