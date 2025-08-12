
import { create } from 'zustand'

const useCurrentDayStore = create((set) => ({
  currentDayData: null,
  currentDay: null,
  setCurrentDayData: (data) => set({ currentDayData: data }),
  setCurrentDays: (data) => set({ currentDay: data }),
}))

export default useCurrentDayStore;
