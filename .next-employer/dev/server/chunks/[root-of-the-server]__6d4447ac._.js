module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db/db.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDatabase",
    ()=>connectToDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    // Fail fast on the server – this never runs in the browser
    throw new Error("MONGODB_URI is not set. Add it to your environment variables.");
}
const cached = global._mongooseCache || {
    conn: null,
    promise: null
};
global._mongooseCache = cached;
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI).then((mongooseInstance)=>mongooseInstance);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/src/lib/models/User.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: [
            "candidate",
            "recruiter"
        ],
        default: "candidate",
        required: true
    },
    resetOtp: {
        type: String,
        required: false
    },
    resetOtpExpires: {
        type: Date,
        required: false
    },
    // Enhanced profile fields
    phone: String,
    location: String,
    about: String,
    skills: {
        type: [
            String
        ],
        default: []
    },
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],
    education: [
        {
            degree: String,
            institution: String,
            startDate: Date,
            endDate: Date,
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    projects: [
        {
            title: String,
            description: String,
            link: String,
            year: String
        }
    ],
    languages: [
        {
            name: String,
            proficiency: String,
            read: {
                type: Boolean,
                default: true
            },
            write: {
                type: Boolean,
                default: true
            },
            speak: {
                type: Boolean,
                default: true
            }
        }
    ],
    itSkills: [
        {
            name: String,
            version: String,
            lastUsed: String,
            experience: String
        }
    ],
    resumeUrl: String,
    companyName: String,
    companyWebsite: String,
    bio: String
}, {
    timestamps: true
});
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    const bcrypt = await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [middleware] (ecmascript, async loader)");
    const bcryptDefault = bcrypt.default || bcrypt;
    return bcryptDefault.compare(candidatePassword, this.password);
};
UserSchema.pre("save", async function hashPassword() {
    if (!this.isModified("password")) {
        return;
    }
    const bcrypt = await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [middleware] (ecmascript, async loader)");
    const bcryptDefault = bcrypt.default || bcrypt;
    const saltRounds = 10;
    const hashed = await bcryptDefault.hash(this.password, saltRounds);
    this.password = hashed;
});
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("User", UserSchema);
}),
"[project]/src/lib/auth/auth.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "auth",
    ()=>auth,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/google.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$github$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/github.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$github$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/github.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/credentials.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$db$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/db.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$User$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/models/User.ts [middleware] (ecmascript)");
;
;
;
;
;
;
const useSecureCookies = ("TURBOPACK compile-time value", "development") === "production";
const cookiePrefix = process.env.APP_TYPE === "employer" ? "__employer" : process.env.APP_TYPE === "seeker" ? "__seeker" : "";
const { handlers: { GET, POST }, signIn, signOut, auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    cookies: cookiePrefix ? {
        sessionToken: {
            name: `${("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ""}${cookiePrefix}.next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        }
    } : undefined,
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$github$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
                role: {
                    label: "Role",
                    type: "text"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$db$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["connectToDatabase"])();
                    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$User$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["User"].findOne({
                        email: credentials.email
                    }).select("+password");
                    if (!user) {
                        throw new Error("Invalid credentials");
                    }
                    const isValid = await user.comparePassword(credentials.password);
                    if (!isValid) {
                        throw new Error("Invalid credentials");
                    }
                    if (credentials.role && user.role !== credentials.role) {
                        throw new Error(`Please log in as a ${credentials.role}`);
                    }
                    return {
                        id: user._id.toString(),
                        name: user.fullName,
                        email: user.email,
                        role: user.role,
                        accessToken: "local-jwt-token"
                    };
                } catch (error) {
                    throw new Error(error.message || "Email or password incorrect. Please try again.");
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt ({ token, user, account }) {
            if (user) {
                token.accessToken = user.accessToken || account?.access_token || "oauth-token";
                token.role = user.role || "candidate";
                token.id = user.id || user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken;
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    }
});
}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$auth$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/auth.ts [middleware] (ecmascript)");
;
;
async function proxy(request) {
    const { pathname } = request.nextUrl;
    const protectedRoutes = [
        "/mnjuser/homepage",
        "/profile",
        "/admin",
        "/settings",
        "/employer"
    ];
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$auth$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["auth"])();
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    const isAuthRoute = pathname.startsWith("/auth/login");
    // ❌ If trying to access protected route without token → go to login
    if (isProtectedRoute && !session) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    // Handle role-based access for logged-in users
    if (session) {
        const userRole = session?.user?.role || "candidate"; // Default to candidate
        // If user tries to visit login page → send to their exact dashboard
        if (isAuthRoute) {
            const url = request.nextUrl.clone();
            if (userRole === "recruiter") {
                url.pathname = "/employer/dashboard";
            } else {
                url.pathname = "/mnjuser/homepage";
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
        // Role-based route guards
        // Prevent candidates from accessing employer pages
        if (pathname.startsWith("/employer") && userRole !== "recruiter") {
            const url = request.nextUrl.clone();
            url.pathname = "/mnjuser/homepage";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
        // Prevent recruiters from accessing candidate pages
        if (pathname.startsWith("/mnjuser") && userRole === "recruiter") {
            const url = request.nextUrl.clone();
            url.pathname = "/employer/dashboard";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/mnjuser/homepage/:path*",
        "/profile/:path*",
        "/admin/:path*",
        "/settings/:path*",
        "/employer/:path*",
        "/auth/login"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d4447ac._.js.map