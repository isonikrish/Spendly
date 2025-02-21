import { AppStore } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import axios from "axios";
const useApp = create<AppStore>((set) => ({
  user: null,
  signup: async (formData) => {
    try {
      const res = await axios.post("/api/signup", formData);
      if (res.status === 200) {
        toast.success("Signup Successul");
      }
    } catch (error) {
      toast.error("Failed to signup");
    }
  },
  login: async (formData) => {
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200) {
        toast.success("Login Successul");
        set({ user: res.data });
      }
    } catch (error) {
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
    } catch (error) {
      set({ user: null });
    }
  },
  logout: async () => {
    const res = await axios.post("/api/logout");
    if(res.status === 200){
      toast.success("Logout Successful");
      set({user: null})
    }
  },
}));
export default useApp;
