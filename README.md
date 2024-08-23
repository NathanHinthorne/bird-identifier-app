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

I originally made this app as a fun project to help grow my skills in machine learning and mobile app development. However, I quickly realized that this app could be useful for bird enthusiasts and nature lovers alike, so I decided to publish it on the app store. I hope you enjoy it!

## Structure

This app uses Firebase for the following features:

- Authentication
  - User authentication is handled through Firebase Authentication.
  - Users can sign up, log in, and log out.
  - User passwords are hashed and salted for security.
  - User authentication is required to access the app.
  
- Database
  - Realtime Database to store birds identified by each user, along with info about each bird.
  - Firestore to store all bird images, descriptions, etc.
  
- Hosting
  - Firebase Hosting is used to host the app.

## Installation for Development

### Android

After building, cd to the android folder and run the following command:

```bash
gradlew assembleDebug
```
  
## Credits

A big thank you to my following friends for their contributions to this project:
  
- Natan for his witty success text that appears when a bird is identified, such as: "THAT THERE BE A BIRD", "U HAS FOUND BIRD", and "BIRD OBTAINED".

- Arsh for the idea of pairing a game with bird identification.

- And most importantly **Ethan!!!** for his help writing bird descriptions and his contribution of over 100 bird images he spent years personally photographing and organizing. You can find a wonderful wildlife book he wrote [here on Amazon](https://www.amazon.com/Masterpieces-Evergreen-State-Narration-Washington/dp/B09GCXXTBX). I would highly recommend checking it out!

## License

This project is licensed under the GPL 3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
