# KlapBot - Discord Chat Backup Bot
#### Video Demo:  <https://youtu.be/m6QdIOLDrMo>
#### Description:
## Overview

KlapBot is a Discord bot designed to enhance your Discord experience by automatically downloading all files, including messages, images, and videos, shared in a chat. With KlapBot, you can ensure that important multimedia content is never lost, and you can effortlessly access and manage these files whenever you need to.

## Features

- **Chat History Backup:** KlapBot allows you to back up the entire chat history of a Discord channel. It gathers messages, filters out bot messages, and organizes them chronologically.

- **Attachment Management:** If a message contains attachments such as images or videos, KlapBot will download and store them. This ensures that multimedia content is also preserved in the backup.

- **Organized Storage:** KlapBot creates dedicated folders for each chat, keeping messages and attachments neatly organized. This makes it easy to navigate and locate specific content.

## Project Structure

The project consists of several key files:

- `index.js`: This is the main file where the bot's functionality is implemented. It uses the Discord.js library to interact with the Discord API.

- `commands/backup.js`: This file contains the code for the backup command. It fetches messages, processes attachments, and stores the backup in organized folders.

- `utils/downloadAttachment.js`: This utility function handles the download of attachments. It uses the `https` module to retrieve attachments and save them to the appropriate location.

## Design Choices

- **Discord.js:** I chose to use the Discord.js library because it provides a robust and user-friendly way to interact with the Discord API. It simplifies tasks like message fetching and attachment handling.

- **Folder Structure:** I opted to create a folder structure where each chat has its own dedicated folder. This design choice ensures that the backed-up content remains organized and easy to manage.

- **Attachment Naming:** I named attachments using the format "{message_id}_{attachment_name}". This helps prevent naming conflicts and allows for clear identification of attachments.

## Conclusion

KlapBot is a simple yet powerful tool that can enhance your Discord experience by ensuring important conversations are backed up and easily accessible. Whether you're a server administrator, community organizer, or student, KlapBot can help you keep your Discord chats organized and worry-free.

Feel free to explore the code, contribute, and make the most of KlapBot to streamline your Discord communication.
