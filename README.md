# My Wordbooks

This application is full-stack app for memorizing your own English words especially you don't understand.
You can create your own vocabulary book by writing the word and meaning down in this app.

![screencapture-localhost-3000-2024-02-23-11_57_51](https://github.com/JamesCroissant/new-my-wordbooks/blob/main/frontend/public/mywordbooks.png)

## Features

- User Authentication
- CRUD Function （user, word）
- Quiz
- Check the result of quiz

## Requirements

- Node v21.7.1 or above

## Setup

### Env file

Create .env file（environment file） in both server and client

#### backend
```zsh
MONGOURL=
PORT=
```

#### frontend
```zsh
VITE_API_URL="http://[YOUR SERVER URL]/api"
```

### Install dependencies

#### backend
```zsh
cd backend
npm install
```

#### frontend
```zsh
cd frontend
npm install
```

## Running App

#### backend
```zsh
cd backend
npm start
```

#### frontend
```zsh
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Upcoming Features

- create the function for sharing your word list between users
