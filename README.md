# OpenSports Tournament Prototype

A React Native prototype created for an interaction design project with OpenSports.

The project focuses on improving the tournament experience for players and organizers, with our main implementation centered around **score dispute resolution**.

The prototype was designed in Figma and implemented using React Native, Expo, Expo Router, and TypeScript.

---

## Current Features

### Player Experience

The prototype includes a player home experience for viewing tournament session information.

Player functionality currently includes:

- Player home screen
- Current session information
- Match information
- Tournament widget concept screen

---

### Organizer Dashboard

The organizer side provides quick access to tournament management features.

The organizer experience includes:

- Organizer home screen
- Player list access
- Check-in actions
- Tournament setup actions
- Active session access

---

### Tournament Session

The organizer can view the courts currently being played during the session.

The session currently contains three example courts with different states:

```text
Court 1
→ Match in progress

Court 2
→ Score dispute reported

Court 3
→ Contested score dispute
```

This allows the prototype to demonstrate different organizer situations.

---

## Score Dispute Resolution

The main implemented feature of the prototype is the organizer dispute-resolution flow.

### Standard Dispute

Court 2 demonstrates a normal score dispute.

```text
Score Dispute Reported
↓
Organizer Opens Dispute
↓
Reviews Recorded Score
↓
Reviews Reported Score
↓
Reviews Player Information
↓
Accept or Reject
↓
Dispute Resolved
```

The organizer can review the information submitted by the player before deciding how the score should be handled.

---

### Contested Dispute

Court 3 demonstrates a dispute where the opposing player contests the original report.

The organizer can review information from both sides.

```text
Dispute Reported
↓
Opponent Contests Dispute
↓
Organizer Reviews Both Sides
↓
Go to Court
↓
Record Outcome
↓
Dispute Resolved
```

The **Go to Court** option represents situations where the organizer needs to verify what happened in person before making the final decision.

---

## Manage Court

Organizers can open an individual court and manually manage the current score.

The score controls allow the organizer to:

```text
Decrease Score
Increase Score
```

Scores are limited between:

```text
0 - 11
```

The Manage Court screen also provides access to:

- Finish Match
- Dispute History

---

## Dispute History

Organizers can review resolved disputes for a court.

The dispute history can display:

- Reporting player
- Recorded score
- Reported score
- Dispute reason
- Opponent response
- Final score
- Resolution information

For contested disputes, the history also shows information from the player who contested the dispute.

Courts without previous disputes display an empty state.

---

## End Session

The organizer can end the current session.

The implemented flow is:

```text
Session
↓
End Session
↓
Confirmation
↓
Session Ended
↓
Organizer Home
```

A confirmation screen is shown before the session is ended to prevent accidental actions.

---

## Widget Concepts

The project also includes a screen demonstrating four Home Screen widget concepts from the Figma prototype.

### Today's Event

Displays:

- Event name
- Event time and location
- Check In action

### Live Match

Displays:

- Current court
- Teams
- Current score
- Playing-to score
- Report Issue action

### Dispute Status

Displays:

- Recorded score
- Proposed score
- Organizer review status
- Review Dispute action

### Tournament Standings

Displays:

- Current rankings
- Team points
- Player's current rank

These are **React Native prototype components**, not native iOS WidgetKit widgets.

---

## Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- React Hooks
- React Native Safe Area Context
- Ionicons

---

## Running the Project

Install the project dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

The prototype can then be tested using Expo Go.

### Run on Web

```bash
npx expo start --web
```

### Create Web Build

```bash
npx expo export --platform web
```

Expo generates the production web build inside:

```text
dist/
```

---

## Project Status

The current prototype focuses primarily on demonstrating the organizer's score dispute-resolution experience.

The core implemented demonstration is:

```text
Organizer Session
↓
Score Dispute
↓
Review Dispute
↓
Accept / Reject

or

Contested Dispute
↓
Go to Court
↓
Record Outcome
↓
Dispute Resolved
↓
Dispute History
```

The application currently uses prototype/local data for demonstrating these interactions.

---

## Disclaimer

This is an educational prototype created as part of a Humber College project involving OpenSports.

It is not the official production OpenSports application.

---

## Author

**Lovepreet Sandhu**

Web Development  
Humber College
