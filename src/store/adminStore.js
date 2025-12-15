import { create } from 'zustand';
import { getAllFacts, getFactById, createFact, updateFact, deleteFact } from '../lib/api/admin/fact';
import { getAllFreeAds, getFreeAdById, createFreeAd, updateFreeAd, deleteFreeAd } from '../lib/api/admin/freeAd';
import { getAllMovements, getMovementById, createMovement, updateMovement, deleteMovement } from '../lib/api/admin/movement';
import { getAllNotices, getNoticeById, createNotice, updateNotice, deleteNotice } from '../lib/api/admin/notice';
import { getAllImportantNotes, getImportantNoteById, createImportantNote, updateImportantNote, deleteImportantNote } from '../lib/api/admin/importantNote';
import { getAllImportantFacts, getImportantFactById, createImportantFact, updateImportantFact, deleteImportantFact } from '../lib/api/admin/importantFact';
import { getAllAlterNatives, getAlterNativeById, createAlterNative, updateAlterNative, deleteAlterNative } from '../lib/api/admin/alterNative';
import { getAllResults, getResultById, createResult, updateResult, deleteResult } from '../lib/api/admin/result';
import { getCurrentDayResult } from '../lib/api/admin/currentDayResult';

const useAdminStore = create((set) => ({
    // State
    isLoading: false,
    isError: false,
    facts: [],
    freeAds: [],
    movements: [],
    notices: [],
    importantNotes: [],
    importantFacts: [],
    alterNatives: [],
    results: [],
    currentDayResult: {},

    // Loading and Error Actions
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ isError: error }),

    // Fact Actions
    fetchFacts: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllFacts();
            set({ facts: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch facts:", error);
        }
    },
    addFact: async (factData) => {
        set({ isLoading: true, isError: false });
        try {
            const newFact = await createFact(factData);
            set((state) => ({ facts: [...state.facts, newFact], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add fact:", error);
        }
    },
    updateExistingFact: async (id, factData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateFact(id, factData);
            set((state) => ({
                facts: state.facts.map((fact) => (fact._id === id ? updated : fact)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update fact:", error);
        }
    },
    removeFact: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteFact(id);
            set((state) => ({
                facts: state.facts.filter((fact) => fact._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete fact:", error);
        }
    },

    // Free Ad Actions
    fetchFreeAds: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllFreeAds();
  
            set({ freeAds: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch free ads:", error);
        }
    },
    addFreeAd: async (freeAdData) => {
        set({ isLoading: true, isError: false });
        try {
            const newFreeAd = await createFreeAd(freeAdData);
            set((state) => ({ freeAds: [...state.freeAds, newFreeAd], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add free ad:", error);
        }
    },
    updateExistingFreeAd: async (id, freeAdData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateFreeAd(id, freeAdData);
            
            set((state) => ({
                freeAds: state.freeAds.map((ad) => (ad._id === id ? updated : ad)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update free ad:", error);
        }
    },
    removeFreeAd: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteFreeAd(id);
            set((state) => ({
                freeAds: state.freeAds.filter((ad) => ad._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete free ad:", error);
        }
    },

    // Movement Actions
    fetchMovements: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllMovements();
            set({ movements: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch movements:", error);
        }
    },
    addMovement: async (movementData) => {
        set({ isLoading: true, isError: false });
        try {
            const newMovement = await createMovement(movementData);
            set((state) => ({ movements: [...state.movements, newMovement], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add movement:", error);
        }
    },
    updateExistingMovement: async (id, movementData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateMovement(id, movementData);
            set((state) => ({
                movements: state.movements.map((movement) => (movement._id === id ? updated : movement)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update movement:", error);
        }
    },
    removeMovement: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteMovement(id);
            set((state) => ({
                movements: state.movements.filter((movement) => movement._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete movement:", error);
        }
    },

    // Notice Actions
    fetchNotices: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllNotices();
            set({ notices: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch notices:", error);
        }
    },
    addNotice: async (noticeData) => {
        set({ isLoading: true, isError: false });
        try {
            const newNotice = await createNotice(noticeData);
            set((state) => ({ notices: [...state.notices, newNotice], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add notice:", error);
        }
    },
    updateExistingNotice: async (id, noticeData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateNotice(id, noticeData);
            set((state) => ({
                notices: state.notices.map((notice) => (notice._id === id ? updated : notice)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update notice:", error);
        }
    },
    removeNotice: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteNotice(id);
            set((state) => ({
                notices: state.notices.filter((notice) => notice._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete notice:", error);
        }
    },

    // Important Note Actions
    fetchImportantNotes: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllImportantNotes();
            set({ importantNotes: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch important notes:", error);
        }
    },
    addImportantNote: async (importantNoteData) => {
        set({ isLoading: true, isError: false });
        try {
            const newImportantNote = await createImportantNote(importantNoteData);
            set((state) => ({ importantNotes: [...state.importantNotes, newImportantNote], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add important note:", error);
        }
    },
    updateExistingImportantNote: async (id, importantNoteData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateImportantNote(id, importantNoteData);
            set((state) => ({
                importantNotes: state.importantNotes.map((note) => (note._id === id ? updated : note)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update important note:", error);
        }
    },
    removeImportantNote: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteImportantNote(id);
            set((state) => ({
                importantNotes: state.importantNotes.filter((note) => note._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete important note:", error);
        }
    },

    // Important Fact Actions
    fetchImportantFacts: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllImportantFacts();
            set({ importantFacts: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch important facts:", error);
        }
    },
    addImportantFact: async (importantFactData) => {
        set({ isLoading: true, isError: false });
        try {
            const newImportantFact = await createImportantFact(importantFactData);
            set((state) => ({ importantFacts: [...state.importantFacts, newImportantFact], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add important fact:", error);
        }
    },
    updateExistingImportantFact: async (id, importantFactData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateImportantFact(id, importantFactData);
            set((state) => ({
                importantFacts: state.importantFacts.map((fact) => (fact._id === id ? updated : fact)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update important fact:", error);
        }
    },
    removeImportantFact: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteImportantFact(id);
            set((state) => ({
                importantFacts: state.importantFacts.filter((fact) => fact._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete important fact:", error);
        }
    },

    // Alter Native Actions
    fetchAlterNatives: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllAlterNatives();
            set({ alterNatives: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch alter natives:", error);
        }
    },
    addAlterNative: async (alterNativeData) => {
        set({ isLoading: true, isError: false });
        try {
            const newAlterNative = await createAlterNative(alterNativeData);
            set((state) => ({ alterNatives: [...state.alterNatives, newAlterNative], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add alter native:", error);
        }
    },
    updateExistingAlterNative: async (id, alterNativeData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateAlterNative(id, alterNativeData);
            set((state) => ({
                alterNatives: state.alterNatives.map((alt) => (alt._id === id ? updated : alt)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update alter native:", error);
        }
    },
    removeAlterNative: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteAlterNative(id);
            set((state) => ({
                alterNatives: state.alterNatives.filter((alt) => alt._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete alter native:", error);
        }
    },

    // Result Actions
    fetchResults: async (limit, page) => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getAllResults(limit, page);
            set({ results: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch results:", error);
        }
    },
    addResult: async (resultData) => {
        set({ isLoading: true, isError: false });
        try {
            const newResult = await createResult(resultData);
            set((state) => ({ results: [...state.results, newResult], isLoading: false }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to add result:", error);
        }
    },
    updateExistingResult: async (id, resultData) => {
        set({ isLoading: true, isError: false });
        try {
            const updated = await updateResult(id, resultData);
            set((state) => ({
                results: state.results.map((result) => (result._id === id ? updated : result)),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to update result:", error);
        }
    },
    removeResult: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            await deleteResult(id);
            set((state) => ({
                results: state.results.filter((result) => result._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to delete result:", error);
        }
    },

    // Current Day Result Actions
    fetchCurrentDayResult: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await getCurrentDayResult();
            set({ currentDayResult: data, isLoading: false });
        } catch (error) {
            set({ isError: true, isLoading: false });
            console.error("Failed to fetch current day result:", error);
        }
    },
}));

export default useAdminStore;
