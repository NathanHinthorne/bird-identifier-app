# Bird Identification App

<!-- add image to be displayed -->
<p align="center">
  <img src="https://live.staticflickr.com/65535/53941243746_30d3aa168e_c.jpg" width="200">
  <img src="https://live.staticflickr.com/65535/53941233061_8ee12ef1de_c.jpg" width="200">
  <img src="https://live.staticflickr.com/65535/53941685105_079f8d8308_c.jpg" width="200">
  <img src="https://live.staticflickr.com/65535/53941566474_6aa9c4e2df_c.jpg" width="200">
</p>

## Description

This app is designed to help users identify birds they see in the wild. It uses machine learning to identify birds based on live audio recordings, as well as step-by-step questions to identify birds based on their characteristics.

It also has the option of syncing the user's life list to a separate bird battler game I created. The game is a simple RPG where the user's birds battle against other birds in a turn-based system.

Unlike other bird identification apps, this app is designed to be more of a personal bird journal, both in asthetic and in features. It will allow users to upload their own photos of birds and write their own descriptions of birds they've seen. It also has a bird battler game that syncs with the life list.

Keep in mind this app was produced by a single developer, not a whole lab of ornithology who have crazy amounts of data at their disposal. As a result, it currently only contains birds in the Washington State region and doesn't display information such as range maps, seasonal occurrence, etc. I hope to add more regions in the future. If you would like to contribute to the project, please see the [Future Plans](#future-plans) section below or shoot me an email at [nathanrh856@gmail.com](mailto:nathanrh856@gmail.com) about helping to expand my Google Sheet full of all the bird data.

## 3rd Party Libraries

This app uses Firebase for the following features:

- Authentication
  - User authentication is handled through Firebase Authentication.
  - Users can sign up, log in, and log out.
  - User passwords are hashed and salted for security.
  - User authentication is required to access the app.
  
- Database
  - Realtime Database to store birds identified by each user, along with info about each bird.
  - Firestore to store all bird images, descriptions, etc.

## Future Plans

- Center the app around personalization features to make it feel like a bird "journal". This is a major part of what separates it from apps like Merlin.
  - Add ability for user to write their own short description of a bird that will show up in the life list. This will allow users to add their own personal experiences with the bird.
- Cache all regional birds in user's file system to allow offline use.
  - Either use the [sqlite capacitor plugin](https://github.com/capacitor-community/sqlite) and phone's storage for that, or connect Firebase directly to android (instead of the current web mode) and then use Firebase's offline storage. [capacitor@preference](https://www.npmjs.com/package/@capacitor/preferences) might also work, but it's meant for lightweight data and not an entire db.
- Create "forgot password" recovery feature with Firebase.
- Create change email feature with Firebase.
- Re-train ML audio model to improve accuracy.

## Installation for Development

### Android

After building, cd to the android folder and run the following command:

```bash
gradlew assembleDebug
```

```bash
npx cap run android --target=44190DLJH0008S  --external
```

## Credits

A big thank you to my following friends for their contributions to this project:
  
- Natan for his funny success text that appears when a bird is identified, such as: "THAT THERE BE A BIRD", "U HAS FOUND BIRD", and "BIRD OBTAINED".

- Arsh for the idea of pairing a game with bird identification.

- And most importantly **Ethan!!!** for his help writing bird descriptions and his contribution of over 100 bird images he spent years personally photographing and organizing. You can find a wonderful wildlife book he wrote [here on Amazon](https://www.amazon.com/Masterpieces-Evergreen-State-Narration-Washington/dp/B09GCXXTBX). I would highly recommend checking it out!

## License

This project is licensed under the GPL 3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
