# 🚗 Ignite Fleet

**Ignite Fleet** is a mobile application built with React Native, Expo, and TypeScript. The app was developed during the [Rocketseat Ignite](https://www.rocketseat.com.br/) program as part of my learning journey. It aims to provide a seamless experience for managing car rentals at a company.

## ✨ Features

- Register and manage cars with license plates
- Track trips with detailed records for each car
- Offline-first functionality with data saved locally using Realm
- Sync data with MongoDB Cloud
- Social login with Google Account
- Map tracking using Google Maps API
- Background location tracking with Expo Task Manager

## 👾 Getting Started

Follow these steps to get the app up and running on your local machine.

### Prerequisites

- Node.js v18.17.1 or higher
- MongoDB account for cloud sync

### Installation

Create a `.env` file by copying the environment variables from `.env.example` to configure the app locally.

```sh
# Clone the repository
git clone https://github.com/msvalandro/ignite-fleet.git
cd ignite-fleet

# Install dependencies
npm install

# Run Expo PreBuild
npx expo prebuild

# Run the app on Android
npm run android

# Run the app on iOS
npm run ios
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
