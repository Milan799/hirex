"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaEye, FaEyeSlash, FaArrowLeft, FaEnvelope, FaLock, FaUser, FaCheckCircle, FaExclamationCircle, FaMoon, FaSun, FaLaptop } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";

type AuthMode = "login" | "register" | "forgot";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Theme Hook
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    reset();
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(`Form Submitted [${mode}]:`, data);
      setIsLoading(false);
      if (mode === 'forgot') alert("Password reset link sent to your email!");
    }, 1500);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  const slideVariants = {
    hidden: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    visible: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  const direction = mode === "register" ? 1 : -1;

  if (!mounted) return null; 

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* --- Theme Toggle Button (Top Right) --- */}
      <div className="absolute top-5 right-5 z-50 flex gap-2 rounded-full bg-white/50 p-1 backdrop-blur-md dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700'}`}
          title="Light Mode"
        >
          <FaSun />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`p-2 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700'}`}
          title="System Mode"
        >
          <FaLaptop />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-700 text-purple-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700'}`}
          title="Dark Mode"
        >
          <FaMoon />
        </button>
      </div>

      {/* Background Mesh (Dark Mode Adjusted) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-400/20 blur-[120px] delay-1000 dark:bg-purple-600/10" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-cyan-400/20 blur-[120px] delay-2000 dark:bg-cyan-600/10" />
      </div>

      {/* Glass Card */}
      <motion.div
        layout
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl sm:mx-4 dark:bg-slate-900/60 dark:border-slate-700/50"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
          >
            <span className="text-xl font-bold">H</span>
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {mode === "login" && "Enter your credentials to access your account."}
            {mode === "register" && "Start your journey with HireX today."}
            {mode === "forgot" && "We'll send you a link to reset it."}
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
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Full Name */}
            {mode === "register" && (
              <InputGroup
                icon={<FaUser className="text-gray-400 dark:text-slate-500" />}
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
              icon={<FaEnvelope className="text-gray-400 dark:text-slate-500" />}
              type="email"
              placeholder="Email Address"
              name="email"
              register={register}
              validationRules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              error={errors.email}
            />

            {/* Password */}
            {mode !== "forgot" && (
              <InputGroup
                icon={<FaLock className="text-gray-400 dark:text-slate-500" />}
                type="password"
                placeholder="Password"
                name="password"
                register={register}
                validationRules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } }}
                error={errors.password}
                isPassword
              />
            )}

            {/* Confirm Password */}
            {mode === "register" && (
              <InputGroup
                icon={<FaCheckCircle className="text-gray-400 dark:text-slate-500" />}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                register={register}
                isPassword
                validationRules={{
                  required: "Confirm Password is required",
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return "Passwords do not match";
                    }
                  },
                }}
                error={errors.confirmPassword}
              />
            )}

            {mode === "login" && (
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 disabled:opacity-70 dark:from-blue-500 dark:to-indigo-500`}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                mode === "login" ? "Sign In" : mode === "register" ? "Sign Up" : "Send Reset Link"
              )}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {mode !== "forgot" && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200/60 dark:border-slate-700"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/50 px-3 font-medium text-slate-500 backdrop-blur-xl dark:bg-slate-900/50 dark:text-slate-400">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton icon={<FcGoogle className="h-5 w-5" />} label="Google" onClick={() => handleSocialLogin("google")} />
              <SocialButton icon={<FaGithub className="h-5 w-5 dark:text-white" />} label="GitHub" onClick={() => handleSocialLogin("github")} />
            </div>
          </>
        )}

        <div className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => switchMode("register")} className="text-blue-600 hover:underline dark:text-blue-400">Sign up</button>
            </>
          ) : mode === "register" ? (
            <>
              Already have an account?{" "}
              <button onClick={() => switchMode("login")} className="text-blue-600 hover:underline dark:text-blue-400">Log in</button>
            </>
          ) : (
            <button onClick={() => switchMode("login")} className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
              <FaArrowLeft className="text-xs" /> Back to Login
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}

// --- Sub-Components ---

const InputGroup = ({ icon, type, placeholder, register, name, error, isPassword, validationRules }: any) => {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div className={`relative flex items-center rounded-xl border bg-white/50 px-4 py-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 dark:bg-slate-800/50 dark:focus-within:bg-slate-800 dark:focus-within:ring-blue-500/20 ${error ? "border-red-500 ring-4 ring-red-500/10 dark:ring-red-500/20" : "border-gray-200 dark:border-slate-700"}`}>
        <span className="mr-3">{icon}</span>
        <input
          {...register(name, validationRules)}
          type={inputType}
          placeholder={placeholder}
          suppressHydrationWarning={true}
          className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="ml-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
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
    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/60 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-white hover:shadow-md active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
  >
    {icon} <span>{label}</span>
  </button>
);