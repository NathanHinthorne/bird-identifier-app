import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth, rtdb } from '@/firebase'; // my firebase/index.js file
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
    onAuthStateChanged
} from 'firebase/auth';
import { ref as dbRef, set, get } from 'firebase/database';
import router from '@/router';


// NOTE: for ease of use, this store makes calls to firebase when its state is changed

export const useUserStore = defineStore('user', () => {
    // State
    const user = ref(null);
    const isAuthenticated = computed(() => user.value !== null);
    const settings = ref({
        enablePuns: true,
        enableMusic: true,
        enableSoundEffects: true
    });
    const seenBirdNames = ref([]);
    const location = ref(null);

    // Helper functions
    const pullUserState = async () => {
        if (user.value) {
            console.log('Pulling user state...');

            await Promise.all([
                pullSettings(),
                pullSeenBirdNames(),
            ]);

            console.log('Finished pulling user state', settings.value, seenBirdNames.value);
        }
    };

    const resetUserState = () => {
        user.value = null;
        settings.value = {
            enablePuns: true,
            enableMusic: true,
            enableSoundEffects: true
        };
        seenBirdNames.value = [];
        location.value = null;
    };

    // Account management
    const init = () => {
        onAuthStateChanged(auth, (activeUser) => {
            if (activeUser) {
                user.value = activeUser;
                pullUserState(); // don't need to await this, just let it run in the background

                // User is signed in, redirect to the home page
                router.push({ name: 'Identify' });
                console.log('User is signed in:', activeUser.uid, activeUser.email);
            } else {
                // No user is signed in, redirect to the auth page
                router.push({ name: 'Auth' });
                console.log('No user is signed in');
            }
        });
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            user.value = userCredential.user;
            await pullUserState();
            console.log('Logged in as:', user.value);

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        resetUserState();
        await firebaseSignOut(auth);
    };

    const register = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user.value = userCredential.user;
            await updateUsername(username);
            await saveSettings();
            console.log('Registered new user:', email);

            // add test bird in seenBirds
            await addSeenBirdName('Canada_Goose');
            await addSeenBirdName('American_Robin');

        } catch (error) {
            console.error('Error registering new user:', error);
        }
    };

    const updateUsername = async (username) => {
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

    const saveSettings = async () => {
        if (user.value) {
            await set(dbRef(rtdb, `users/${user.value.uid}/settings`), settings.value);
            console.log('Saved settings:', settings.value);
        }
    };

    const pullSettings = async () => {
        if (user.value) {
            const snapshot = await get(dbRef(rtdb, `users/${user.value.uid}/settings`));
            if (snapshot.exists()) {
                settings.value = snapshot.val();
            }
        }
    };

    const pullSeenBirdNames = async () => {
        if (user.value) {
            const snapshot = await get(dbRef(rtdb, `users/${user.value.uid}/seenBirds`));
            if (snapshot.exists()) {
                seenBirdNames.value = snapshot.val();
            }
        }
    };

    // probably won't need this since we set loc instantly
    // if user doesn't have wifi, this wouldn't work anyway
    // TODO find a way to cache user's location and use it when no wifi
    const pullLocation = async () => {
        if (user.value) {
            const snapshot = await get(dbRef(rtdb, `users/${user.value.uid}/location`));
            if (snapshot.exists()) {
                location.value = snapshot.val();
            }
        }
    };

    const setLocation = (newLocation) => {
        location.value = newLocation;
        if (user.value) {
            set(dbRef(rtdb, `users/${user.value.uid}/location`), newLocation);
        }
        console.log('Location set:', newLocation);
    };


    //TODO Give each bird name an observationDate, observationLoc, and note
    //TODO let user fill in observationLoc. 
    //TODO Make observationDate automatically filled in.
    //TODO let user add note later

    const addSeenBirdName = async (birdName) => {
        if (user.value) {
            seenBirdNames.value.push(birdName);
            await set(dbRef(rtdb, `users/${user.value.uid}/seenBirds`), seenBirdNames.value);
            console.log('Added seen bird:', birdName);
        }
    };

    return {
        user,
        settings,
        seenBirdNames,
        location,
        isAuthenticated,
        init,
        login,
        logout,
        register,
        updateUsername,
        updateEmail,
        updatePassword,
        saveSettings,
        addSeenBirdName,
        setLocation,
        pullSettings,
        pullSeenBirdNames,
        pullLocation
    };
});