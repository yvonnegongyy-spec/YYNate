# Handoff Guide: Deploying to iOS (Mac Required)

Since you are moving from Windows to Mac to build the iOS app, follow these steps exactly on your Mac.

## 1. Transfer Code to Mac
Since you already pushed everything to GitHub, you just need to clone it on your Mac.

1.  Open **Terminal** on your Mac.
2.  Clone your repo:
    ```bash
    git clone https://github.com/yvonnegongyy-spec/YYNate.git
    cd YYNate
    ```

## 2. Install Dependencies
You need Node.js installed on your Mac.

1.  Install project credentials:
    ```bash
    npm install
    ```

2.  **Important**: Create the `.env.local` file again on your Mac (since it wasn't committed to GitHub for security).
    *   Create a file named `.env.local` in the root folder.
    *   Paste your API keys there (Gemini, Supabase URL/Key).

## 3. Build & Sync
Prepare the iOS project:

```bash
# Build the web assets
npm run build

# Sync everything to the iOS native project
npx cap sync ios
```

## 4. Open in Xcode
This command will open the specialized iOS project workspace:

```bash
npx cap open ios
```

## 5. Run on iPhone
1.  When Xcode opens, plug in your iPhone via USB.
2.  In the top toolbar of Xcode, select your **iPhone** as the target device (instead of a Simulator).
3.  Click the **Play/Run** button (top left).
4.  **Trust Developer**: On your iPhone, you might see a popup "Untrusted Developer". Go to **Settings -> General -> VPN & Device Management** and trust your Apple ID profile.

## Troubleshooting
*   **CocoaPods Error**: If `npx cap sync` fails saying "CocoaPods not found", run:
    ```bash
    sudo gem install cocoapods
    ```
    Then try syncing again.
*   **Signing Team**: In Xcode, click on the "App" project (left sidebar) -> **Signing & Capabilities**. You need to select your personal "Team" (your Apple ID) to sign the app for free testing.
