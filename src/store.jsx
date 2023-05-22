import create from 'zustand';

const useStore = create((set) => ({
  languages: [],
  currentLanguage: {
    _id: "",
    name: "",
    snippet: [],
  },
  check: false,
  setLanguages: (languages) => set({ languages }),
  setCurrentLanguage: (language) => set({ currentLanguage: language }),
  setCheck: (value) => set({ check: value }),
}));

export default useStore;
