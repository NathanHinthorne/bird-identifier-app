<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
    <ion-page>

        <!-- "last bird seen" section -->
        <ion-card>
            <ion-card-header>
                <ion-card-title>Last Bird Seen</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <p>Placeholder for last bird seen.</p>
            </ion-card-content>
        </ion-card>


        <!-- "identify a bird" section -->
        <ion-card>
            <ion-card-header>
                <ion-card-title>Identify a Bird</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-button @click="identifyBySound">Identify by Sound</ion-button>
                <ion-button @click="identifyByImage">Identify by Photo</ion-button>
            </ion-card-content>
        </ion-card>

    </ion-page>
</template>

<script setup>
    import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage } from '@ionic/vue';

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