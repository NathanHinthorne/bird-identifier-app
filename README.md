<!-- main image -->
<p align="center">
  <img src="https://live.staticflickr.com/65535/54010198591_a43c01c817_b.jpg" width="800">
</p>

# Bird Identification App

<!-- app screenshots -->
<p align="center">
  <img src="https://live.staticflickr.com/65535/53941243746_30d3aa168e_c.jpg" width="200">
  <img src="https://live.staticflickr.com/65535/53941233061_8ee12ef1de_c.jpg" width="200">
  <img src="https://live.staticflickr.com/65535/53941685105_079f8d8308_c.jpg" width="200">
  <img src="https://live.staticflickr.com/65535/53941566474_6aa9c4e2df_c.jpg" width="200">
</p>

## Description

This Android app is designed to help users identify birds they see in the wild. It uses machine learning to identify birds based on live audio recordings, as well as step-by-step questions to identify birds based on their characteristics.

It also has the option of syncing the user's life list to a separate bird battler [game I'm still developing](https://github.com/NathanHinthorne/bird-battler-game). The game is a simple RPG where the user's birds battle against other birds in a turn-based system.

Unlike other bird identification apps, this app is designed to be more of a personal bird journal, both in aesthetic and in features. It will allow users to upload their own photos of birds and write their own notes of birds they've seen.

Keep in mind this app was produced by a single developer, not a whole lab of ornithology who have crazy amounts of data at their disposal. As a result, it currently only contains birds in the Washington State region and doesn't display information such as range maps, seasonal occurrence, etc. I hope to add more regions in the future. If you would like to contribute to the project, please see the [Future Plans](#future-plans) section below or shoot me an email at [nathanrh856@gmail.com](mailto:nathanrh856@gmail.com) about helping to expand my Google Sheet full of all the bird data.

## 3rd Party Libraries

- Firebase

  - Authentication
  
    - User authentication is handled through Firebase Authentication.
    - Users can sign up, log in, and log out.
    - User passwords are hashed and salted for security.
    - User authentication is required to access the app.

  - Database
  
    - Realtime Database to store birds identified by each user, along with info about each bird.
    - Firestore to store all bird images, descriptions, etc.

- Geocode
  - Reverse geolocation to get region from user's latitude and longitude.

## Future Plans

- Center the app around personalization features to make it feel like a bird "journal". This is a major part of what separates it from apps like Merlin.
  - Add checkmark badge if bird is seen
  - Change "sighting history" button to look like a small page from a scrapbook with scribbles and horizontal lines to represent lists of birds.
  - Change "sighting history" PAGE to feature a couple pages piled on top of each other. Each page is a sighting, so the user will "flip" between the pages.
  - During the sighting note pop-up, allow user to upload a photo. This photo will be displayed alongside the written note in the "sighting history" page.
- Cache all regional birds in user's file system (Directory.Data) to allow offline use.
  - Use the [sqlite capacitor plugin](https://github.com/capacitor-community/sqlite) and phone's storage for that.
  - For audio files, transition to Dropbox and its API. Only access the API when a user needs to download a new region of birds. Cache all data dropbox provides so we don't have unnecessary usage of the API.
  - An offline mode implies all the data will be offline, and will only connect when downloading new data. This requires old code that interacts with the data to be rewritten. This situation could be avoided with Firebase's offline database support for Android (app currently uses web version), but SQLite is a viable solution too, especially since it means I can store large files without worrying about Firebase's API limits.
- Create "forgot password" recovery feature with Firebase.
- Create change email feature with Firebase.
- Re-train ML audio model to improve accuracy.

- Expand regions of birds to encapsulate the entire U.S. These regions will include the following:
  - Pacific Northwest Rain Forest
  - Rocky Mountains
  - Great Plains
  - Southeast Swamps
  - Southwest Desert
  - Eastern Woodlands

## Installation for Development

### Android

After building, cd to the android folder and run the following command:

```bash
gradlew assembleDebug
```

## Credits

A big thank you to my friend Ethan for his help writing bird descriptions and his contribution of over 100 bird images he spent years personally photographing and organizing! You can find a wonderful wildlife book he wrote [here on Amazon](https://www.amazon.com/Masterpieces-Evergreen-State-Narration-Washington/dp/B09GCXXTBX). I would highly recommend checking it out!

## License

This project is licensed under the GPL 3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
