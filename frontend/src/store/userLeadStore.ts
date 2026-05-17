import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export type Lead = {
  _id: string;
  name: string;
  email: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "referral" | "instagram";
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type GetLeadsParams = {
  page?: number;
  limit?: number;
  search?: string;
  source?: string;
  status?: string;
};

type LeadState = {
  leads: Lead[];
  selectedLead: Lead | null;

  total: number;
  page: number;
  hasMore: boolean;

  loading: boolean;

  createLead: (data: {
    name: string;
    email: string;
    status: string;
    source: string;
  }) => Promise<any>;

  getLeads: (params?: GetLeadsParams) => Promise<any>;

  getLeadById: (leadId: string) => Promise<any>;

  updateLead: (
    leadId: string,
    data: {
      name?: string;
      email?: string;
      status?: string;
      source?: string;
    }
  ) => Promise<any>;

  deleteLead: (leadId: string) => Promise<any>;
};

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  selectedLead: null,

  total: 0,
  page: 1,
  hasMore: false,

  loading: false,

  createLead: async (data) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/leads", data);

      set((state) => ({
        leads: [res.data, ...state.leads],
      }));

      toast.success("Lead created");

      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  getLeads: async (params = {}) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/leads", {
        params,
      });

      set({
        leads: res.data.leads,
        total: res.data.total,
        hasMore: res.data.hasMore,
        page: res.data.page,
      });

      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  getLeadById: async (leadId) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get(`/leads/${leadId}`);

      set({
        selectedLead: res.data,
      });

      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateLead: async (leadId, data) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.put(`/leads/${leadId}`, data);

      set((state) => ({
        leads: state.leads.map((lead) =>
          lead._id === leadId ? res.data : lead
        ),
        selectedLead: res.data,
      }));

      toast.success("Lead updated");

      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteLead: async (leadId) => {
    set({ loading: true });

    try {
      await axiosInstance.delete(`/leads/${leadId}`);

      set((state) => ({
        leads: state.leads.filter((lead) => lead._id !== leadId),
      }));

      toast.success("Lead deleted");

      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Error");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));