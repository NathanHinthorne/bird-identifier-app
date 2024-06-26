<template>
    <ion-page>

        <!-- "last bird seen" section -->
        <ion-card>
            <ion-card-header>
                <ion-card-title>Last Bird Seen</ion-card-title>
            </ion-card-header>
            <ion-card-content class="last-bird-seen">
                <p>Placeholder for last bird seen.</p>
            </ion-card-content>
        </ion-card>


        <!-- "identify a bird" section -->
        <ion-content>
            <ion-card-header>
                <div class="heading-container">
                    <div class="heading-text">IDENTIFY A BIRD</div>
                </div>
            </ion-card-header>
            <ion-card-content>
                <div class="button-container">
                    <ion-button class="big-button" @click="identifyBySound">
                        <ion-icon :icon="mic"></ion-icon>
                    </ion-button>
                    <ion-button class="big-button" @click="identifyByImage">
                        <ion-icon :icon="camera"></ion-icon>
                    </ion-button>
                </div>
            </ion-card-content>
        </ion-content>

    </ion-page>
</template>

<script setup>
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent, IonIcon } from '@ionic/vue';

    // camera and mic icons
    import { camera, mic } from 'ionicons/icons';

    import { useRouter } from 'vue-router';

    const router = useRouter();

    const identifyBySound = () => {
        console.log('Identifying bird by sound...');
        // route to the IdentifyBySound page
        router.push('/identify/sound');
    };

    const identifyByImage = () => {
        console.log('Identifying bird by image...');
        // route to the IdentifyByImage page
        router.push('/identify/image');
    };
</script>



<style scoped>
.heading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    position: relative;
}

.heading-container::before,
.heading-container::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #B0BEC5;
    /* Light grey color */
    margin: 0 10px;
}

.heading-text {
    color: var(--ion-color-secondary-contrast);
    /* Grey color for the text */
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
}


/* buttons */
.big-button {
    /* ratio should be 3 high, 2 wide */
    width: 35vw;
    height: 20vh;
    /* round edges*/
    border-radius: 20px;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}


/* last bird seen */
.last-bird-seen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28vh;
    font-size: 1.5rem;
    color: var(--ion-color-secondary-contrast);
    background-color: var(--ion-color-light);
}

ion-icon {
    font-size: 3rem;
}

</style>