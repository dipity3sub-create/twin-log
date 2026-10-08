# Twin Sleep Log

A simple sleep log for Luca and Leon that runs in your phone's browser.
Everything is saved **only on your phone**: no account, no server.

## What it does

- One big button per twin: **Sleep start**, which turns into **Sleep end** while they're asleep.
- A live timer for each twin: "Awake for 1h 20m" (since they last woke up) or "Asleep for 35m".
- **Today's log** (midnight to midnight). Tap any entry to fix its times or delete it.
- **+ Add a missed sleep** for when you forgot to tap.
- **Undo** appears for 8 seconds after every tap, in case you pressed by mistake.
- **Last 7 days**: a bar for each twin per day (out of 24 hours) and a daily average.
- **Download backup / Restore from backup**, so you can keep a copy of the log.
- Works offline once it has been opened once.

## One-time setup: put it online (GitHub Pages)

1. On GitHub, open this repository → **Settings** → **General**, scroll to the bottom
   (**Danger Zone**) → **Change visibility** → **Public**.
   (Only the app's code becomes public. Your sleep data never leaves your phone.)
2. **Settings** → **Pages**. Under **Build and deployment**, set **Source** to
   **Deploy from a branch**, choose the branch that holds the app and the **/ (root)** folder, then **Save**.
3. Wait 1–2 minutes. The app will be at:
   **https://dipity3sub-create.github.io/twin-log/**

## Put it on your Android home screen

1. Open the link above in **Chrome** on your phone.
2. Tap the **⋮** menu (top right) → **Add to Home screen** (or **Install app**) → **Install**.
3. It now opens from the moon icon like a normal app, full screen.

## Good to know

- The log lives in Chrome on this phone. Clearing Chrome's site data or uninstalling Chrome
  erases it, so tap **Download backup** now and then (it saves a small file to Downloads).
- Another phone keeps its own separate log. There is no syncing.
- Sleeps that cross midnight count toward each day by the part that falls in that day.
- The 7-day average covers the last 7 full days, not counting today, and skips days with nothing logged.
