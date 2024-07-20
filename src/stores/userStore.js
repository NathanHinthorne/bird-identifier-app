import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth, db } from '@/firebase'; //! Ensure this path is correct
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword
} from 'firebase/auth';
import { ref as dbRef, set, get } from 'firebase/database';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const isAuthenticated = computed(() => user.value !== null);
    const settings = ref({
        enablePuns: true,
        enableMusic: true,
        enableSoundEffects: true
    });

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user.value = userCredential.user;
        await fetchSettings();
    };

    const logout = async () => {
        await signOut(auth);
        user.value = null;
        settings.value = {
            enablePuns: true,
            enableMusic: true,
            enableSoundEffects: true
        };
    };

    const register = async (email, password, username) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user.value = userCredential.user;
        await updateProfile(username);
        await saveSettings();
    };

    const updateProfile = async (username) => {
        if (user.value) {
            await set(dbRef(db, `users/${user.value.uid}/profile`), { username });
        }
    };

    const updateEmail = async (newEmail) => {
        if (user.value) {
            await updateEmail(user.value, newEmail);
            user.value = auth.currentUser; // Refresh user object
        }
    };

    const updatePassword = async (newPassword) => {
        if (user.value) {
            await updatePassword(user.value, newPassword);
        }
    };

    const saveSettings = async () => {
        if (user.value) {
            await set(dbRef(db, `users/${user.value.uid}/settings`), settings.value);
        }
    };

    const fetchSettings = async () => {
        if (user.value) {
            const snapshot = await get(dbRef(db, `users/${user.value.uid}/settings`));
            if (snapshot.exists()) {
                settings.value = snapshot.val();
            }
        }
    };

    return {
        user,
        isAuthenticated,
        settings,
        login,
        logout,
        register,
        updateProfile,
        updateEmail,
        updatePassword,
        saveSettings,
        fetchSettings
    };
});