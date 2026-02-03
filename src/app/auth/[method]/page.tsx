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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 text-slate-100 transition-colors duration-300">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-600/10 blur-[120px] delay-1000" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-cyan-600/10 blur-[120px] delay-2000" />
      </div>

      {/* Glass Card */}
      <motion.div
        layout
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative z-10 w-full max-w-105 overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl sm:mx-4"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
          >
            <span className="text-xl font-bold">H</span>
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login" && "Enter your credentials to access your account."}
            {mode === "register" && "Start your journey with HireX today."}
            {mode === "forgot" &&
              (otpStep === "request"
                ? "We'll send you a one-time code to reset your password."
                : "Enter the code from your email and choose a new password.")}
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
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              mass: 1.2,
            }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Full Name */}
            {mode === "register" && (
              <InputGroup
                icon={<FaUser className="text-slate-500" />}
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
              icon={<FaEnvelope className="text-slate-500" />}
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

            {/* OTP Code for reset step - show before password fields */}
            {mode === "forgot" && otpStep === "reset" && (
              <InputGroup
                icon={<FaCheckCircle className="text-slate-500" />}
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
                icon={<FaLock className="text-slate-500" />}
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
                icon={<FaCheckCircle className="text-slate-500" />}
                type="password"
                placeholder={mode === "forgot" ? "Confirm New Password" : "Confirm Password"}
                name="confirmPassword"
                register={register}
                isPassword
                validationRules={{
                  required: "Confirm Password is required",
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Passwords do not match";
                    }
                  },
                }}
                error={errors.confirmPassword}
              />
            )}

            {/* Root error (API errors) */}
            {errors.root?.message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <FaExclamationCircle />
                <span>{errors.root.message}</span>
              </motion.div>
            )}

            {/* Role Selection */}
            {mode !== "forgot" && (
              <RoleToggle selectedRole={watch("role") || "candidate"} register={register} />
            )}

            {mode === "login" && (
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 disabled:opacity-70`}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : mode === "login" ? (
                "Sign In"
              ) : mode === "register" ? (
                "Sign Up"
              ) : (
                otpStep === "request" ? "Send OTP" : "Reset Password"
              )}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {mode !== "forgot" && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900/50 px-3 font-medium text-slate-400 backdrop-blur-xl">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton
                icon={<FcGoogle className="h-5 w-5" />}
                label="Google"
                onClick={() => handleSocialLogin("google")}
              />
              <SocialButton
                icon={<FaGithub className="h-5 w-5 text-white" />}
                label="GitHub"
                onClick={() => handleSocialLogin("github")}
              />
            </div>
          </>
        )}

        <div className="mt-8 text-center text-sm font-medium text-slate-400">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => switchMode("register")}
                className="text-blue-400 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : mode === "register" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchMode("login")}
                className="text-blue-400 hover:underline"
              >
                Log in
              </button>
            </>
          ) : (
            <button
              onClick={() => switchMode("login")}
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200"
            >
              <FaArrowLeft className="text-xs" /> Back to Login
            </button>
          )}
        </div>
      </motion.div>
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
        className={`relative flex items-center rounded-xl border bg-slate-800/50 px-4 py-3 transition-all focus-within:bg-slate-800 focus-within:ring-blue-500/20 ${error ? "border-red-500 ring-4 ring-red-500/20" : "border-slate-700 focus-within:ring-4 focus-within:border-blue-500"}`}
      >
        <span className="mr-3">{icon}</span>
        <input
          {...register(name, validationRules)}
          type={inputType}
          placeholder={placeholder}
          suppressHydrationWarning={true}
          className="w-full bg-transparent text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="ml-2 text-slate-500 hover:text-slate-300"
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
            className="flex items-center gap-1.5 text-xs font-semibold text-red-400 ml-1"
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
    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:shadow-md active:scale-95"
  >
    {icon} <span>{label}</span>
  </button>
);

const RoleToggle = ({ selectedRole, register }: any) => {
  return (
    <div className="w-full">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        I am a
      </p>
      <div className="grid grid-cols-2 gap-3">
        <label
          className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all ${
            selectedRole === "candidate"
              ? "border-blue-500 bg-blue-500/10 text-blue-100 shadow-lg shadow-blue-500/30"
              : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
          }`}
        >
          <input
            type="radio"
            value="candidate"
            {...register("role")}
            className="hidden"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold">Candidate</span>
            <span className="text-[11px] font-normal text-slate-400">
              Looking for jobs and opportunities.
            </span>
          </div>
        </label>

        <label
          className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all ${
            selectedRole === "recruiter"
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-100 shadow-lg shadow-indigo-500/30"
              : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
          }`}
        >
          <input
            type="radio"
            value="recruiter"
            {...register("role")}
            className="hidden"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold">Recruiter</span>
            <span className="text-[11px] font-normal text-slate-400">
              Posting jobs and managing candidates.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};