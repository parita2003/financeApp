import { create } from "zustand";
import { NewAccountSheet } from "../components/new-account-sheet";

type OpenAccountState = {
    id?:string;
    isOpen: boolean;
    onopen: (id:string) => void;
    onclose: () => void;
};

export const useOpenAccount = 
    create<OpenAccountState>((set) => ({
        id:undefined,
        isOpen: false,
        onopen: (id: string) => set({ isOpen: true, id }),
        onclose: () => set({ isOpen: false, id: undefined }),
    }));