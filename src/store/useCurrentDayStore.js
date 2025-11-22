import { create } from 'zustand';

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
      const res = await fetch(`https://luckpatix.com/api/v1/result?year=${year}&month=${month}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch results');
      }
      
      const data = await res.json();
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false, data: null });
    }
  },
}));

export default useCurrentDayStore;