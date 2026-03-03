import mongoose, { Schema, type Document, type Model } from "mongoose";

export type UserRole = "candidate" | "recruiter";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  resetOtp?: string;
  resetOtpExpires?: Date;

  // Enhance Profile Fields
  phone?: string;
  location?: string;
  about?: string;

  // For Candidates
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }[];
  education?: {
    degree: string;
    institution: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
  }[];
  resumeUrl?: string;

  // For Recruiters
  companyName?: string;
  companyWebsite?: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
      required: true,
    },
    resetOtp: {
      type: String,
      required: false,
    },
    resetOtpExpires: {
      type: Date,
      required: false,
    },
    // Enhanced profile fields
    phone: String,
    location: String,
    about: String,
    skills: { type: [String], default: [] },
    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        current: { type: Boolean, default: false },
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
        current: { type: Boolean, default: false },
      },
    ],
    resumeUrl: String,
    companyName: String,
    companyWebsite: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function comparePassword(
  this: IUser,
  candidatePassword: string
) {
  const bcrypt = await import("bcryptjs");
  const bcryptDefault = bcrypt.default || bcrypt;
  return bcryptDefault.compare(candidatePassword, this.password);
};

UserSchema.pre<IUser>("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }

  const bcrypt = await import("bcryptjs");
  const bcryptDefault = bcrypt.default || bcrypt;

  const saltRounds = 10;
  const hashed = await bcryptDefault.hash(this.password, saltRounds);
  this.password = hashed;
});

export const User: UserModel =
  (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>("User", UserSchema);

