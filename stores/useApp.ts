import { AppStore } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import axios from "axios";
const useApp = create<AppStore>((set) => ({
  user: null,
  incomeSources: null,
  signup: async (formData) => {
    try {
      const res = await axios.post("/api/signup", formData);
      if (res.status === 200) {
        window.location.href = "/dashboard";
        toast.success("Signup Successul");
      }
    } catch {
      toast.error("Failed to signup");
    }
  },
  login: async (formData) => {
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200) {
        window.location.href = "/dashboard";
        toast.success("Login Successul");
        set({ user: res.data });
      }
    } catch {
      toast.error("Failed to login");
      set({ user: null });
    }
  },
  fetchUser: async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.status === 200) {
        set({ user: res.data });
      }
    } catch {
      set({ user: null });
    }
  },
  logout: async () => {
    const res = await axios.post("/api/logout");
    if (res.status === 200) {
      toast.success("Logout Successful");
      window.location.href = "/";
      set({ user: null });
    }
  },
  addIncomeSource: async (formData) => {
    try {
      const res = await axios.post("/api/income", formData);
      if (res.status === 200) {
        toast.success("Added new income source");
      }
    } catch {
      toast.error("Failed to add income source");
    }
  },
  fetchIncomeSources: async () => {
    const res = await axios.get("/api/income");
    if (res.status === 200) {
      set({ incomeSources: res.data });
    }
  },
  deleteIncomeSource: async (id) => {
    try {
      const res = await axios.delete(`/api/income?id=${id}`);
      if (res.status === 200) {
        toast.success("Income Source Deleted");
      }
    } catch {
      toast.error("Failed to delete income source");
    }
  },
}));
export default useApp;
