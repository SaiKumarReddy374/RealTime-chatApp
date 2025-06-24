import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

export const useAuthStore = create((set) => ({
  authuser: null,   
  isSigningUp: false,   
  isLoggingIn: false,
  isUpdatingProfile: false,


  isCheckingAuth: true, 

  checkAuth: async () => {
    try {
      const res=await axiosInstance.get("/auth/check");
    } catch (error) {
      
    }finally {
      set({ isCheckingAuth: false });
    }
  },
}));