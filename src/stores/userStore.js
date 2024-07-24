import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth, rtdb } from '@/firebase'; // my firebase/index.js file
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword
} from 'firebase/auth';
import { ref as dbRef, set, get } from 'firebase/database';

export const useUserStore = defineStore('user', () => {
    // State

    const user = ref(null);
    const isAuthenticated = computed(() => user.value !== null);
    const settings = ref({
        enablePuns: true,
        enableMusic: true,
        enableSoundEffects: true
    });
    const seenBirds = ref([]);

    // Account management

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user.value = userCredential.user;
        await fetchSettings();
        console.log('Logged in as:', user.value);

        // add test bird in seenBirds
        seenBirds.value.push('test bird');
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
            await set(dbRef(rtdb, `users/${user.value.uid}/profile`), { username });
            console.log('Updated profile:', username);
        }
    };

    const updateEmail = async (newEmail) => {
        if (user.value) {
            await firebaseUpdateEmail(user.value, newEmail);
            user.value = auth.currentUser; // Refresh user object
            console.log('Updated email:', newEmail);
        }
    };

    const updatePassword = async (newPassword) => {
        if (user.value) {
            await firebaseUpdatePassword(user.value, newPassword);
            console.log('Updated password');
        }
    };


    // Settings

    const saveSettings = async () => {
        if (user.value) {
            await set(dbRef(rtdb, `users/${user.value.uid}/settings`), settings.value);
            console.log('Saved settings:', settings.value);
        }
    };

    const fetchSettings = async () => {
        if (user.value) {
            const snapshot = await get(dbRef(rtdb, `users/${user.value.uid}/settings`));
            if (snapshot.exists()) {
                settings.value = snapshot.val();
            }
        }
    };


    // Seen birds

    const addSeenBird = async (birdName) => {
        if (user.value) {
            seenBirds.value.push(birdName);
            await set(dbRef(rtdb, `users/${user.value.uid}/seenBirds`), seenBirds.value);
            console.log('Added seen bird:', birdName);
        }
    }

    const fetchSeenBirds = async () => {
        if (user.value) {
            const snapshot = await get(dbRef(rtdb, `users/${user.value.uid}/seenBirds`));
            if (snapshot.exists()) {
                seenBirds.value = snapshot.val();
            }
        }
    }


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
        fetchSettings,
        addSeenBird,
        fetchSeenBirds
    };
});