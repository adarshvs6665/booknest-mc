import { z } from "zod";

export const signInSchema = z.object({
  userName: z.string().trim().min(1, "username is required"),
  password: z
    .string()
    .trim()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),
});

export const signupSchema = z.object({
  fullName: z
    .string({ required_error: "fullName is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must be at most 100 characters" }),
  userName: z
    .string({ required_error: "userName is required" })
    .trim()
    .min(3, { message: "userName must be at least 3 characters" })
    .max(30, { message: "userName must be at most 100 characters" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(100, { message: "email must be at most 100 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters" })
    .max(100, { message: "password must be at most 100 characters" }),
});

export const createBookSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  author: z
    .string({ required_error: "Author is required" })
    .trim()
    .min(3, { message: "Author name must be at least 3 characters" })
    .max(100, { message: "Author name must be at most 100 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be at most 500 characters" }),
  logo: z
    .string({ required_error: "Logo url is required" })
    .min(1, { message: "Logo url is required" }),
  genre: z
    .string({ required_error: "Genre is required" })
    .trim()
    .min(3, { message: "Genre must be at least 3 characters" })
    .max(50, { message: "Genre must be at most 50 characters" }),
  totalCopies: z
    .string({ required_error: "totalCopies is required" })
    .trim()
    .min(1, { message: "Minimum of 1 required" }),
});

export const issueBookSchema = z.object({
  borrowingId: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "This field is required" }),
});

export const returnBookSchema = z.object({
  borrowingId: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "This field is required" }),
});
