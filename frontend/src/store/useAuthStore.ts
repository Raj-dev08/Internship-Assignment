import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;

  signup: (data: { name: string; email: string; password: string }) => Promise<any>;
  login: (data: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<any>;
  checkAuth: () => Promise<any>;
  updateProfile: (data: { name: string }) => Promise<any>;
  beAdmin: (data: { adminPass: string }) => Promise<any>;
  cancelAdmin: () => Promise<any>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  signup: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ user: res.data });
      toast.success("Signup success");
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data });
      toast.success("Login success");
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out");
      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data });
      return res.data;
    } catch {
      set({ user: null });
      return null;
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ user: res.data });
      toast.success("Updated");
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    }
  },

  beAdmin: async (data) => {
    try {
      const res = await axiosInstance.patch("/auth/be-admin", data);
      toast.success(res.data.message);
      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    }
  },

  cancelAdmin: async () => {
    try {
      const res = await axiosInstance.patch("/auth/cancel-admin");
      toast.success(res.data.message);
      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    }
  },
}));