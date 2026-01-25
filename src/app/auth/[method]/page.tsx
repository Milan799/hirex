/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaEye, FaEyeSlash, FaArrowLeft, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register" | "forgot";

export default function AuthPage({params}: {params: {method: AuthMode}}) {
  // Getting the method from URL params (e.g., /auth/login)
  const {method} = use(params);
  const [mode, setMode] = useState<AuthMode>(method);
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Switch modes and clear errors
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    router.replace(`/auth/${newMode}`); // Clear URL query params if any
    reset();
  };

  // --- Handlers ---
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      console.log(`Form Submitted [${mode}]:`, data);
      setIsLoading(false);
      if (mode === 'forgot') alert("Password reset link sent to your email!");
    }, 1500);
    
    // TODO: Connect to your actual backend API here
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    // await signIn(provider, { callbackUrl: "/dashboard" });
  };

  // --- Animation Variants ---
  const slideVariants = {
    hidden: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    visible: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  const direction = mode === "register" ? 1 : -1;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 text-slate-800">
      
      {/* 1. Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-400/20 blur-[120px] delay-1000" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-cyan-400/20 blur-[120px] delay-2000" />
      </div>

      {/* 2. Glass Card */}
      <motion.div
        layout
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl sm:mx-4"
      >
        {/* Logo Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
          >
            <span className="text-xl font-bold">H</span>
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "login" && "Enter your credentials to access your account."}
            {mode === "register" && "Start your journey with HireX today."}
            {mode === "forgot" && "We'll send you a link to reset it."}
          </p>
        </div>

        {/* 3. Dynamic Form Section */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.form
            key={mode}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Full Name (Register Only) */}
            {mode === "register" && (
              <InputGroup
                icon={<FaUser className="text-gray-400" />}
                type="text"
                placeholder="Full Name"
                register={register}
                name="fullName"
                error={errors.fullName}
              />
            )}

            {/* Email Field (All Modes) */}
            <InputGroup
              icon={<FaEnvelope className="text-gray-400" />}
              type="email"
              placeholder="Email Address"
              register={register}
              name="email"
              error={errors.email}
            />

            {/* Password Field (Login & Register Only) */}
            {mode !== "forgot" && (
              <InputGroup
                icon={<FaLock className="text-gray-400" />}
                type="password"
                placeholder="Password"
                register={register}
                name="password"
                error={errors.password}
                isPassword
              />
            )}

            {/* Forgot Password Link */}
            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-500 hover:underline"
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
              className={`flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 disabled:opacity-70`}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                mode === "login" ? "Sign In" : mode === "register" ? "Sign Up" : "Send Reset Link"
              )}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* 4. Social Login Divider (Only for Login/Register) */}
        {mode !== "forgot" && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200/60"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/50 px-3 font-medium text-slate-500 backdrop-blur-xl">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton icon={<FcGoogle className="h-5 w-5" />} label="Google" onClick={() => handleSocialLogin("google")} />
              <SocialButton icon={<FaGithub className="h-5 w-5" />} label="GitHub" onClick={() => handleSocialLogin("github")} />
            </div>
          </>
        )}

        {/* 5. Footer Toggle Links */}
        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => switchMode("register")} className="text-blue-600 hover:underline">Sign up</button>
            </>
          ) : mode === "register" ? (
            <>
              Already have an account?{" "}
              <button onClick={() => switchMode("login")} className="text-blue-600 hover:underline">Log in</button>
            </>
          ) : (
            <button onClick={() => switchMode("login")} className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900">
              <FaArrowLeft className="text-xs" /> Back to Login
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}

// --- Sub-Components ---

const InputGroup = ({ icon, type, placeholder, register, name, error, isPassword }: any) => {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="relative group">
      <div className={`flex items-center rounded-xl border bg-white/50 px-4 py-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 ${error ? "border-red-500" : "border-gray-200"}`}>
        <span className="mr-3">{icon}</span>
        <input
          {...register(name, { required: true })}
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="ml-2 text-slate-400 hover:text-slate-600">
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <span className="absolute -bottom-5 left-1 text-xs font-medium text-red-500">Field is required</span>}
    </div>
  );
};

const SocialButton = ({ icon, label, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/60 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-white hover:shadow-md active:scale-95"
  >
    {icon} <span>{label}</span>
  </button>
);