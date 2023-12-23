import * as z from "zod";

// ++++++++++++++ Signup Validation +++++++++++++++++++++++++++++++++++++++
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z
    .string()
    .email()
    .min(2, { message: "email must be at least 2 characters." }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters." }),
});

// ++++++++++++++ Signin Validation +++++++++++++++++++++++++++++++++++++++
export const SigninValidation = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: "email must be at least 2 characters." }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters." }),
});

// ++++++++++++++ Profile Validation ++++++++++++++++++++++++++++++++++++++
export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ++++++++++++++ Post Validation +++++++++++++++++++++++++++++++++++++++++
export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(255),
  tags: z.string(),
});
