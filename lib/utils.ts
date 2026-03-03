import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL

console.log(API_URL)

export const axiosInstance = axios.create({
  baseURL: API_URL,
  // timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const showToaster = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
  toast(message, { type });
};
