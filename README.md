# ShiaMatch Hide Profiles

A simple Chrome extension that lets you hide selected ShiaMatch profiles from search results and manage them from the extension popup.

## Features

- Adds a **Hide** button to profile rows on ShiaMatch search pages
- Remembers hidden profile IDs in Chrome storage
- Lets you view and unhide saved profiles from the popup
- Open source and easy to install manually

## Files

- `manifest.json` — extension configuration
- `content.js` — adds Hide buttons to search result rows
- `popup.html` — popup user interface
- `popup.js` — popup behavior

## Manual installation in Chrome

### Option 1: Install from this repository folder

1. Download this repository as a ZIP
2. Extract the ZIP to a folder on your computer
3. Open Chrome
4. Go to `chrome://extensions`
5. Turn on **Developer mode**
6. Click **Load unpacked**
7. Select the extracted extension folder

### Option 2: Install from a release ZIP

1. Download the latest release ZIP from the Releases section
2. Extract the ZIP to a folder on your computer
3. Open Chrome
4. Go to `chrome://extensions`
5. Turn on **Developer mode**
6. Click **Load unpacked**
7. Select the extracted folder

## How to use

1. Open a ShiaMatch search results page
2. Click **Hide** next to any profile you do not want to see
3. Click the extension icon to view hidden profiles
4. Use **Open** to view a profile or **Unhide** to restore it

## Notes - IMPORTANT

- You must keep the extracted folder on your computer after installing it

## Website matching

This extension runs on:

- `http://www.shiamatch.com/search.php*`
- `https://www.shiamatch.com/search.php*`

## Privacy

This extension stores hidden profile IDs locally in your browser using Chrome storage.
It does not send your data to any external server.

## License

MIT
