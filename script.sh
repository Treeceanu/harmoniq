#!/bin/bash

# Open the first Git Bash window and run the client
start "" "C:/Program Files/Git/git-bash.exe" -c "echo 'Running client'; npm run start; exec bash"

# Open the second Git Bash window and run the backend
start "" "C:/Program Files/Git/git-bash.exe" -c "echo 'Running backend'; cd ../harmoniq-backend; nodemon server.js; exec bash"