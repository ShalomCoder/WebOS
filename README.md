# WebOS

**WebOS** is a browser-native desktop-style platform built entirely with **vanilla JavaScript** and **TailwindCSS**.  
Apps are written as modular `.webapp` files, loaded per user through JSON config files. The result?  
A fully dynamic, script-powered operating environment that runs entirely in the browser.

> No frameworks. No bundlers. Just clean code and a ridiculous level of control.

---

## 🚀 Features

- 🪟 App windows with draggable, resizable UI
- 🔗 Modular `.webapp` file system
- 🧠 Per-user app configuration via JSON
- 🧭 Dynamic dock with app icons and launch hooks
- 💾 Notepad with file open/save (with keyboard shortcuts)
- 🛠️ Built with [TailwindCSS](https://tailwindcss.com/)
- 🧱 Fully frontend—no backend required to run

---

## 📁 How It Works

- All apps live in the `/apps` directory as `.webapp` files.
- Each `.webapp` calls `registerAppMetadata({...})` to declare:
  - `name`
  - `icon`
  - `description`
  - `run()` function (to launch the app)
- User-specific JSON files (e.g. `/accounts/shalom.json`) define which apps to load.

### Example user JSON:

```json
{
  "username": "shalom",
  "installedApps": [
    "calculator.webapp",
    "notepad.webapp",
    "terminal.webapp"
  ]
}
