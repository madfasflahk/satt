import { create } from "zustand";
import axios from "axios";

const useCurrentDayStore = create((set, get) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  data: null,
  loading: false,
  error: null,

  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),

  fetchResults: async () => {
    const { year, month } = get();

    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}result`,
        {
          params: { year, month },
          // NO CACHING
          headers: { "Cache-Control": "no-cache" },
        }
      );

      set({ data: response.data, loading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || error.message,
        loading: false,
        data: null,
      });
    }
  },
}));

export default useCurrentDayStore;
