import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(persist(
    (set, _) => ({
        accessToken: null,
        userProfile: null,
        setUserProfile: (userProfile) => set((state) => ({ ...state, userProfile })),
        setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
        clear: () => set(() => ({ accessToken: null, userProfile: null }))
    }),
    {
        name: 'auth',
        storage: createJSONStorage(() => sessionStorage),
    }
));

export default useAuthStore;
