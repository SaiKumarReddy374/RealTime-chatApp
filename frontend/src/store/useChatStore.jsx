import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data, isUsersLoading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users"+error.response.data.message);
      set({ isUsersLoading: false });
    }finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data, isMessagesLoading: false });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages"+ error.response.data.message);
      set({ isMessagesLoading: false });
    }finally {
      set({ isMessagesLoading: false });
    }
  },

  // users: async () => {
  //   set({ isUsersLoading: true });
  //   try {
  //     const response = await axiosInstance.get("/messages/users");
  //     set({ users: response.data, isUsersLoading: false });
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     toast.error("Failed to load users"+error.response.data.message);
  //     set({ isUsersLoading: false });
  //   }finally {
  //     set({ isUsersLoading: false });
  //   }
  // },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  //todo :optmize later
  setSelectedUser: (selectedUser) => set({ selectedUser }),

}));