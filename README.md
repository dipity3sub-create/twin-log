# Twin Sleep Log

A simple sleep log for Luca and Leon that runs in your phone's browser.
Out of the box, everything is saved **only on your phone**. You can also connect a
Google Sheet so two phones share one log (see below).

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

## Share the log between two phones (Google Sheet)

Do this once, on a computer. It takes about 10 minutes.

**A. Create the sheet**
1. Go to <https://sheets.new> (signed in to your Google account). Name it **Twin Sleep Log**.
2. Menu **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete everything in the editor. Then open
   [google-sheet-sync.gs](https://github.com/dipity3sub-create/twin-log/blob/claude/newborn-sleep-logger-holod7/google-sheet-sync.gs),
   click the **Copy raw file** button (two overlapping squares, top right of the code), and paste into the editor.
4. Click the **Save** icon (floppy disk).

**B. Publish it**
1. Click the blue **Deploy** button (top right) → **New deployment**.
2. Click the gear next to **Select type** → **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy**.
4. Google asks for permission: **Authorize access** → pick your account →
   "Google hasn't verified this app" → **Advanced** → **Go to Twin Sleep Log (unsafe)** → **Allow**.
   (It says "unsafe" only because you wrote the script yourself rather than Google checking it.)
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/…/exec`.

**C. Connect the phones**
1. On your phone, open the app, scroll to **Share with another phone**, paste the address and tap **Connect**.
2. Tap **Send invite link** and send it to the other person (WhatsApp, SMS…).
3. They open the link in **Chrome** and tap **OK**. Then they add it to their home screen as above.

The status line under the title shows **Shared log · updated 14:02** when it's working.

**Good to know about sharing**
- Phones check for the other's changes every 10 seconds while the app is open, and right away when you open it.
- Taps made with no signal are saved on the phone and sent when it's back online.
- If one phone starts a sleep and the other ends it, that's one sleep. If you both tap **Sleep start**
  for the same twin before seeing each other's tap, the two are joined into one.
- The log is kept in the **Sleeps** tab of your sheet. Look, but please make changes in the app, not in the sheet.
- The web-app address works like a key: anyone who has it can read and add to the log. Only share it with your partner.

## Good to know

- Without sharing, the log lives in Chrome on this phone. Clearing Chrome's site data or uninstalling Chrome
  erases it, so tap **Download backup** now and then (it saves a small file to Downloads).
- Sleeps that cross midnight count toward each day by the part that falls in that day.
- The 7-day average covers the last 7 full days, not counting today, and skips days with nothing logged.
