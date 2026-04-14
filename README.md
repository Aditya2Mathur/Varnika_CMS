# Clinic Management System

A lightweight clinic management system for creating prescriptions, tracking patients, reviewing daily activity, and printing or sharing prescription slips.

## Current Features

- Secure login screen with local session persistence.
- Dashboard with today's, weekly, and monthly patient counts.
- Estimated daily collection based on the actual saved `fee` values for today's records.
- New prescription form with preview before save.
- Old patient detection only when both `name` and `phone number` match.
- Same phone number with a different name is treated as a different or referred patient.
- Auto-fill of age, gender, address, and patient ID for matching old patients.
- Free-visit handling when the previous prescription is still valid.
- Search records by phone number, patient name, or appointment ID.
- Patient list view with daily, weekly, and monthly filters.
- Print prescription slips from preview or from the patient list.
- Send prescription details through WhatsApp.
- Offline save queue with automatic sync when internet connection returns.
- Cached dashboard data for faster loading and offline fallback.

## Tech Stack

- `HTML`
- `CSS`
- `Vanilla JavaScript`
- `Chart.js`
- `Phosphor Icons`
- `Google Apps Script` backend endpoint for data storage

## Project Structure

- `index.html` - Main app layout and UI sections
- `styles.css` - App styling, responsive layout, and prescription print/preview positioning
- `app.js` - Login, dashboard, patient logic, offline sync, search, printing, and WhatsApp actions
- `Assets/` - Prescription background and image assets

## Main Modules

### 1. Login

The app starts with a login overlay. Valid usernames and passwords are checked through hashed values stored inside `app.js`.

- Session token is stored in `localStorage` as `magnum_auth_token`
- Logout clears the token and reloads the app

### 2. Dashboard

The dashboard shows:

- Today's patients
- Weekly patients
- Monthly patients
- Estimated collection for today
- Recent patient visit chart

Collection is calculated from the real saved fees for today's records, not from a fixed per-patient estimate.

### 3. Prescription Flow

When creating a prescription:

1. Enter patient details
2. Preview the prescription on the clinic template
3. Confirm and save
4. Print the slip or send it on WhatsApp

Each saved record includes:

- Appointment ID
- Patient ID
- Name
- Age
- Gender
- Phone
- Address
- Symptoms
- Fee
- Visit count
- Valid till date

### 4. Old Patient and Referral Logic

The app now uses this matching rule:

- Same `name` and same `phone` => old patient
- Same `phone` but different `name` => different or referred patient
- New `phone` => new patient

This prevents multiple family members or referrals using the same phone number from being merged into one patient history.

### 5. Search and Patient List

Search supports:

- Phone number
- Patient name
- Appointment ID

Patient list supports:

- Daily records
- Weekly records
- Monthly records
- Re-printing a slip
- Sending WhatsApp directly from the list

### 6. Offline Support

If the internet is unavailable while saving:

- The prescription is stored in `localStorage`
- It is queued in `magnum_offline_sync`
- The app automatically retries syncing when the browser comes back online

Cached data is stored in `magnum_data_cache` for faster dashboard loading.

## Data Source

The app reads and writes records through this Google Apps Script endpoint configured in `app.js`:

- `GOOGLE_SCRIPT_URL`

If you want to deploy your own backend, replace that value with your own Apps Script web app URL.

## How To Run

Because this is a static frontend app, you can run it in any of these ways:

- Open `index.html` directly in a browser
- Serve the folder with a simple local server
- Deploy it on any static hosting platform

For best results, keep internet access available when syncing with the Google Apps Script backend.

## Notes

- Print layout and preview layout are controlled from `styles.css`
- The prescription preview uses absolute positioning over the prescription background image
- WhatsApp sharing sends appointment details with patient name and visit date
- Offline saved records are added locally first and synced later when possible

## Future Improvements

Possible next improvements:

- Edit existing patient records
- Add medicine lines and dosage instructions into the printable prescription area
- Add export to CSV or Excel
- Add stronger authentication backed by a server
- Add admin settings for consultation fee and validity duration
