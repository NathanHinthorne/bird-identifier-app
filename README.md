# Bird Identification App

## Description

## Structure

This app (the frontend) uses Firebase to store birds identified by each user, wheras the API (the backend) has a PostGreSQL database for storing all birds (by region) in the US.

## Installation for Development

### Android

After building, go to the android folder and run the following command:

```bash
./gradlew assembleDebug
``` 

OR to test the app on a connected device:

```bash
npx cap run android --target=44190DLJH0008S  --external --no-sync
```

## Ideas for Future Features

- Animation of birds perched on UI buttons that flutter away when clicked.
  
## Credits

A big thank you to my following friends for their contributions to this project:
  
- Natan for his witty success text that appears when a bird is identified, such as: "THAT THERE BE A BIRD", "U HAS FOUND BIRD", and "BIRD OBTAINED".
  
- Arsh for the idea of pairing a game with bird identification.

- And most importantly **Ethan!!!** For his collection of over 600 bird images he spent years personally photographing and organizing.