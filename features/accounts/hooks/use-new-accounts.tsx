import { create } from "zustand";
import { NewAccountSheet } from "../components/new-account-sheet";

type NewAccountState = {
    isOpen: boolean;
    onopen: () => void;
    onclose: () => void;
};

export const useNewAccount = 
    create<NewAccountState>((set) => ({
        isOpen: false,
        onopen: () => set({ isOpen: true }),
        onclose: () => set({ isOpen: false }),
    }));