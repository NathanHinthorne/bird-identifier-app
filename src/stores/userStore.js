import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth, rtdb } from '@/firebase'; // my firebase/index.js file
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { ref as dbRef, set, get } from 'firebase/database';
import router from '@/router';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


// NOTE: for ease of use, this store makes calls to firebase when its state is changed

export const useUserStore = defineStore('user', () => {
    // Default state values
    const defaultSettings = {
        enableMusic: true,
        enableSoundEffects: true,
        showGameInfo: true,
        showBirdBattlerAd: true
    };

    // State
    const user = ref(null);
    const isAuthenticated = computed(() => user.value !== null);
    const settings = ref({ ...defaultSettings });
    const seenBirdNames = ref({});
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
        settings.value = { ...defaultSettings };
        seenBirdNames.value = [];
        location.value = null;
        console.log('User state reset');
    };

    // Account management
    const init = () => {
        onAuthStateChanged(auth, (activeUser) => {
            if (activeUser) {
                user.value = activeUser;
                pullUserState(); // don't need to await this, just let it run in the background

                // User is signed in, redirect to the home page
                router.push({ name: 'Identify' });
                console.log('User is signed in:', activeUser.email);
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
            pullUserState().then(() => {
                console.log('Logged in as:', user.value);
            })

        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
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

        } catch (error) {
            console.error('Error registering new user:', error);
            throw error;
        }
    };

    const updateUsername = async (username) => {
        if (user.value) {
            updateProfile(user.value, { displayName: username });
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
    // TODO find a way to cache user's location and use it when no wifi is available
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
    //TODO let user fill in observationLoc and note
    //TODO Make observationDate automatically filled in.

    /**
     * Adds a bird sighting to the user's seen birds
     * @param {string} birdName - Name of the bird
     * @param {string} birdNote - Note to associate with the bird sighting
     * @param {string} birdDate - Date of the bird sighting
     * @param {string} birdLoc - Location of the bird sighting
     */
    const addBirdSighting = async (birdName, birdNote, birdDate, birdLoc) => {
        if (user.value) {
            if (!seenBirdNames.value[birdName]) {
                seenBirdNames.value[birdName] = [];
            }

            seenBirdNames.value[birdName].push({
                note: birdNote,
                date: birdDate,
                location: birdLoc,
            });

            await set(dbRef(rtdb, `users/${user.value.uid}/seenBirds`), seenBirdNames.value);
            console.log('Added seen bird:', birdName);
        }
    };

    const getBirdSightings = (birdName) => {
        return seenBirdNames.value[birdName];
    };

    const getOriginalBirdSighting = (birdName) => {
        return seenBirdNames.value[birdName][0];
    }

    const deleteBirdSighting = (birdName, index) => {
        seenBirdNames.value[birdName].splice(index, 1);
        set(dbRef(rtdb, `users/${user.value.uid}/seenBirds`), seenBirdNames.value);
    };

    const editBirdSighting = (birdName, index, newNote) => {
        seenBirdNames.value[birdName][index] = {
            note: newNote,
            date: newDate,
            location: newLoc
        }
        set(dbRef(rtdb, `users/${user.value.uid}/seenBirds`), seenBirdNames.value);
    };


    /*
    const saveDataToCache = async () => {
        const dateTime = new Date().toISOString();
        const subfolder = 'User/';
        const fileName = `bird_data_${dateTime}.json`;

        // need to save settings, seenBirdNames, and location
        const data = JSON.stringify(settings.value);

        try {
            const savedFile = await Filesystem.writeFile({
                path: subfolder + fileName,
                data: data,
                directory: Directory.Data,
                encoding: Encoding.UTF8,
            });
            console.log('Bird data saved to cache:', savedFile);
        } catch (error) {
            console.error('Error saving bird data to cache:', error);
        }
    };

    const fetchLatestDataFromCache = async () => {
        // fileName should be the latest save file
        const files = await Filesystem.readdir({
            path: '',
            directory: Directory.Data,
        });
        const latestFile = files.files.sort((a, b) => b.lastModified - a.lastModified)[0];
        const fileName = latestFile.name;

        try {
            const result = await Filesystem.readFile({
                path: fileName,
                directory: Directory.Data,
                encoding: Encoding.UTF8,
            });
            const birdData = JSON.parse(result.data);
            console.log('Bird data retrieved from cache:', birdData);
            return birdData;
        } catch (error) {
            console.error('Error retrieving bird data from cache:', error);
            return null;
        }
    };
    */

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
        addBirdSighting,
        getBirdSightings,
        getOriginalBirdSighting,
        setLocation,
        pullSettings,
        pullSeenBirdNames,
        pullLocation,
    };
});