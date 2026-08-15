# OpenSports React Native Development Log

## Project Overview

OpenSports is a React Native mobile application created with Expo.

The application contains two connected user flows:

```text
Player Flow
Organizer Flow
```

The player can:

- View an upcoming session
- Check in
- View match information
- Report a score dispute

The organizer can:

- View players
- Scan player QR codes
- Start a session
- View active courts
- Manage courts
- Receive and resolve disputes
- End the tournament
- Display final standings

The player and organizer flows are connected through features such as:

```text
Player QR check-in
Player score disputes
Organizer dispute resolution
Live match updates
Tournament completion
```

---

# Project Setup

Created the React Native project using Expo.

```text
OpenSports/
```

Installed project dependencies:

```bash
npm install
```

Installed Safe Area support:

```bash
npx expo install react-native-safe-area-context
```

Used Expo Vector Icons:

```bash
npx expo install @expo/vector-icons
```

The Expo project also uses:

```text
Expo Router
TypeScript
React Native
Expo Go
```

Start the development server with:

```bash
npx expo start
```

Start while clearing the Metro cache:

```bash
npx expo start -c
```

---

# Step 1 - Initial Project Structure

The Expo project initially contained the default tab-based structure:

```text
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── explore.tsx
├── _layout.tsx
└── modal.tsx
```

The application did not need bottom-tab navigation, so the player and organizer flows were separated into role-based folders.

Updated structure:

```text
app/
├── _layout.tsx
├── index.tsx
├── modal.tsx
│
├── player/
│   └── index.tsx
│
└── organizer/
    └── index.tsx
```

The `(tabs)` folder and unused Expo template routes were removed.

---

# Step 2 - Root Redirect

Created:

```text
app/index.tsx
```

The root route redirects the application to the selected development screen.

During player development:

```tsx
import { Redirect } from "expo-router";

export default function IndexScreen() {
    return <Redirect href="/player" />;
}
```

During organizer development, the redirect can temporarily be changed to:

```tsx
import { Redirect } from "expo-router";

export default function IndexScreen() {
    return <Redirect href="/organizer/index" />;
}
```

The redirect is currently used as a temporary development shortcut.

Later, authentication and the user's role can determine whether the app opens:

```text
/player
```

or:

```text
/organizer
```

---

# Step 3 - Root Layout Cleanup

Updated:

```text
app/_layout.tsx
```

Removed the old Expo tabs anchor:

```tsx
export const unstable_settings = {
    anchor: "(tabs)",
};
```

The `(tabs)` route no longer existed, so keeping this configuration caused Expo Router warnings.

The root layout uses a Stack navigator and hides Expo's default headers because the application has its own reusable header.

Example structure:

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack screenOptions={{ headerShown: false }} />

            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
```

Hiding the default header prevented duplicate headers such as:

```text
organizer
organizer/index
```

from appearing above the custom `AppHeader`.

---

# Step 4 - Safe Area Support

The first player heading was covered by the iPhone Dynamic Island.

Safe Area support was added using:

```tsx
import { SafeAreaView } from "react-native-safe-area-context";
```

Example:

```tsx
<SafeAreaView style={styles.container}>
    {/* Screen content */}
</SafeAreaView>
```

The screen component handles the safe area.

Small reusable components such as:

```text
ActionRow
EventCard
CourtCard
```

do not need their own `SafeAreaView`.

---

# Step 5 - Shared AppHeader Component

Created:

```text
components/AppHeader.tsx
```

The header was created as a reusable component so different screens can change the title through props.

Example usage:

```tsx
<AppHeader title="Pickleball" />
```

Organizer usage:

```tsx
<AppHeader title="Check-in & Set up" />
```

Session usage:

```tsx
<AppHeader title="Sessions" />
```

The important prop structure is:

```tsx
type AppHeaderProps = {
    title: string;
};
```

This allows one header component to be reused across the entire application.

---

# Step 6 - Reusable AppButton Component

Created:

```text
components/AppButton.tsx
```

Code:

```tsx
import { Pressable, StyleSheet, Text } from "react-native";

type AppButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
};

export default function AppButton({
    title,
    onPress,
    variant = "primary",
}: AppButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <Pressable
            style={[
                styles.button,
                isPrimary
                    ? styles.primaryButton
                    : styles.secondaryButton,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonText,
                    isPrimary
                        ? styles.primaryText
                        : styles.secondaryText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 60,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    primaryButton: {
        backgroundColor: "#2E903B",
    },

    secondaryButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E2E2",
    },

    buttonText: {
        fontSize: 18,
        fontWeight: "700",
    },

    primaryText: {
        color: "#FFFFFF",
    },

    secondaryText: {
        color: "#111111",
    },
});
```

The button component is responsible for:

- Button size
- Button color
- Text styling
- Press handling
- Primary and secondary variants

The parent screen controls spacing around the button.

A fixed `marginTop` was removed from the reusable component because each screen may require different spacing.

---

# Step 7 - Reusable EventCard Component

Created:

```text
components/EventCard.tsx
```

The EventCard displays:

- Event name
- Format
- Court count
- Location
- Start time

The event name was changed from hardcoded text to an optional prop.

Code:

```tsx
import { StyleSheet, Text, View } from "react-native";

type EventCardProps = {
    eventName?: string;
    format: string;
    courtCount: number;
    location: string;
    time: string;
};

export default function EventCard({
    eventName,
    format,
    courtCount,
    location,
    time,
}: EventCardProps) {
    return (
        <View style={styles.card}>
            {eventName && (
                <Text style={styles.eventName}>
                    {eventName}
                </Text>
            )}

            <Text style={styles.eventDetails}>
                {format} · {courtCount} courts
            </Text>

            <Text style={styles.locationDetails}>
                {location} · {time}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#2E903B",
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 25,
        marginTop: 20,
        marginBottom: 20,
    },

    eventName: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
    },

    eventDetails: {
        color: "#FFFFFF",
        fontSize: 19,
    },

    locationDetails: {
        color: "#FFFFFF",
        fontSize: 19,
        marginTop: 10,
    },
});
```

Conditional rendering:

```tsx
{eventName && (
    <Text style={styles.eventName}>
        {eventName}
    </Text>
)}
```

means:

- Display the event name when it is provided.
- Render nothing when the optional prop is missing.

Example:

```tsx
<EventCard
    eventName="Tuesday Pickleball"
    format="Doubles"
    courtCount={3}
    location="East Side Rec"
    time="6:30 PM"
/>
```

---

# Step 8 - SessionCard Component

Created:

```text
components/SessionCard.tsx
```

The SessionCard displays:

- Session date
- Session time
- Checked-in player count
- Total player count
- Location

The prop structure was created as:

```tsx
type SessionCardProps = {
    date: string;
    time: string;
    checkedInPlayers: number;
    totalPlayers: number;
    location: string;
};
```

Example usage:

```tsx
<SessionCard
    date="Today, Tuesday"
    time="6:30 PM"
    checkedInPlayers={18}
    totalPlayers={24}
    location="East Side Rec Center"
/>
```

The card contains separate rows for:

```text
Date and time
Checked-in players
Location
```

Ionicons were added instead of HTML icon codes because React Native does not support HTML entities such as:

```html
&#xf105;
```

---

# Step 9 - Player Home Screen

Moved the player home screen from:

```text
app/(tabs)/index.tsx
```

to:

```text
app/player/index.tsx
```

The player home screen was placed in the player folder because it belongs specifically to the player flow.

Current screen structure:

```text
Player Home
├── AppHeader
├── Today's Session
├── SessionCard
├── Check In button
├── Upcoming Event
├── SessionCard
├── Upcoming Tournament
└── SessionCard
```

Code snapshot:

```tsx
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/AppHeader";
import AppButton from "@/components/AppButton";
import SessionCard from "@/components/SessionCard";

export default function PlayerHomeScreen() {
    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <AppHeader title="Pickleball" />

                <Text style={styles.sectionTitle}>
                    {"TODAY'S SESSION"}
                </Text>

                <SessionCard
                    date="Today, Tuesday"
                    time="6:30 PM"
                    checkedInPlayers={18}
                    totalPlayers={24}
                    location="East Side Rec Center"
                />

                <View style={styles.checkInButton}>
                    <AppButton
                        title="Check In"
                        onPress={() =>
                            console.log("Check In pressed")
                        }
                    />
                </View>

                <Text style={styles.sectionTitleUpcoming}>
                    {"UPCOMING EVENT"}
                </Text>

                <SessionCard
                    date="August 3, Monday"
                    time="6:30 PM"
                    checkedInPlayers={0}
                    totalPlayers={24}
                    location="East Side Rec Center"
                />

                <Text style={styles.sectionTitleUpcoming}>
                    {"UPCOMING TOURNAMENT"}
                </Text>

                <SessionCard
                    date="August 31, Monday"
                    time="6:30 PM"
                    checkedInPlayers={0}
                    totalPlayers={24}
                    location="East Side Rec Center"
                />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7F3",
        paddingHorizontal: 25,
    },

    sectionTitle: {
        marginTop: 28,
        marginBottom: 12,
        fontSize: 15,
        fontWeight: "600",
        color: "#2C9B3A",
        letterSpacing: 1,
        paddingHorizontal: 3,
    },

    sectionTitleUpcoming: {
        marginTop: 28,
        marginBottom: 12,
        fontSize: 15,
        fontWeight: "600",
        color: "#7A8694",
        letterSpacing: 1,
        paddingHorizontal: 3,
    },

    checkInButton: {
        marginTop: 14,
    },

    scrollView: {
        flex: 1,
    },
});
```

The spacing above the Check In button is controlled by the player screen instead of being hardcoded inside `AppButton`.

---

# Step 10 - Organizer Folder Structure

Created:

```text
app/organizer/
```

Organizer routes include:

```text
app/organizer/index.tsx
app/organizer/playerlist.tsx
app/organizer/scanplayer.tsx
app/organizer/setupteams.tsx
app/organizer/session.tsx
app/organizer/dispute.tsx
```

Organizer-specific reusable components were placed in:

```text
components/organizer/
```

Current organizer component structure:

```text
components/
├── AppButton.tsx
├── AppHeader.tsx
├── EventCard.tsx
├── SessionCard.tsx
│
└── organizer/
    ├── ActionRow.tsx
    ├── ActionButton.tsx
    ├── TeamRow.tsx
    └── CourtCard.tsx
```

Shared components remain in the main `components` folder.

Role-specific components are placed inside:

```text
components/organizer/
```

---

# Step 11 - ActionRow Component

Created:

```text
components/organizer/ActionRow.tsx
```

The ActionRow is a reusable tappable row containing:

- Left icon
- Title
- Right chevron
- Press action

Code:

```tsx
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ActionRowProps = {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress?: () => void;
};

export default function ActionRow({
    iconName,
    title,
    onPress,
}: ActionRowProps) {
    return (
        <Pressable
            style={styles.actionRow}
            onPress={onPress}
        >
            <View style={styles.leftContent}>
                <Ionicons
                    name={iconName}
                    size={22}
                    color="#9B9B9B"
                />

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={20}
                color="#9B9B9B"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    actionRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 55,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    leftContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
    },
});
```

Example usage:

```tsx
<ActionRow
    iconName="list-outline"
    title="Players list"
    onPress={() =>
        router.push("/organizer/playerlist")
    }
/>
```

```tsx
<ActionRow
    iconName="scan-outline"
    title="Scan code"
    onPress={() =>
        router.push("/organizer/scanplayer")
    }
/>
```

```tsx
<ActionRow
    iconName="people-outline"
    title="Set up teams"
    onPress={() =>
        router.push("/organizer/setupteams")
    }
/>
```

The parent screen decides which route opens.

The reusable component only handles:

- Displaying the row
- Detecting the press
- Calling the provided `onPress` function

---

# Step 12 - Organizer Home Screen

Created:

```text
app/organizer/index.tsx
```

The organizer home screen contains:

```text
AppHeader
EventCard
Check-in section
Players list row
Scan code row
Tournament setup section
Set up teams row
Updates section
Let's Start button
```

Code snapshot:

```tsx
import AppButton from "@/components/AppButton";
import AppHeader from "@/components/AppHeader";
import EventCard from "@/components/EventCard";
import ActionRow from "@/components/organizer/ActionRow";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrganizerHomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <AppHeader title="Check-in & Set up" />

                <EventCard
                    eventName="Tuesday Pickleball"
                    format="Doubles"
                    courtCount={3}
                    location="East Side Rec"
                    time="6:30 PM"
                />

                <View style={styles.checkInSection}>
                    <Text style={styles.sectionTitle}>
                        Check-in
                    </Text>

                    <ActionRow
                        iconName="list-outline"
                        title="Players list"
                        onPress={() =>
                            router.push(
                                "/organizer/playerlist"
                            )
                        }
                    />

                    <ActionRow
                        iconName="scan-outline"
                        title="Scan code"
                        onPress={() =>
                            router.push(
                                "/organizer/scanplayer"
                            )
                        }
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Tournament setup
                    </Text>

                    <ActionRow
                        iconName="people-outline"
                        title="Set up teams"
                        onPress={() =>
                            router.push(
                                "/organizer/setupteams"
                            )
                        }
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Updates
                    </Text>

                    <View style={styles.updatesBox}>
                        <Text style={styles.updateText}>
                            Player cancelled: Alex
                        </Text>

                        <Text style={styles.updateText}>
                            Player cancelled: Lina
                        </Text>
                    </View>
                </View>

                <View style={styles.startButton}>
                    <AppButton
                        title="Let's Start"
                        variant="primary"
                        onPress={() =>
                            router.push(
                                "/organizer/session"
                            )
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 12,
    },

    checkInSection: {
        gap: 12,
    },

    section: {
        gap: 12,
        marginTop: 24,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },

    updatesBox: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    updateText: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: "#6B7280",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    startButton: {
        marginTop: "auto",
        paddingBottom: 12,
    },
});
```

The `ScrollView` uses:

```tsx
contentContainerStyle={styles.scrollContent}
```

with:

```tsx
flexGrow: 1
```

This allows the content to:

- Fill the screen when it is short
- Grow when scrolling is required
- Keep the button near the bottom
- Work on different phone sizes

The button wrapper uses:

```tsx
marginTop: "auto"
```

to consume available vertical space above the button.

---

# Step 13 - Organizer Routing

Expo Router creates routes from files inside the `app` folder.

Examples:

```text
app/organizer/index.tsx
→ /organizer
```

```text
app/organizer/playerlist.tsx
→ /organizer/playerlist
```

```text
app/organizer/scanplayer.tsx
→ /organizer/scanplayer
```

```text
app/organizer/setupteams.tsx
→ /organizer/setupteams
```

```text
app/organizer/session.tsx
→ /organizer/session
```

```text
app/organizer/dispute.tsx
→ /organizer/dispute
```

Navigation uses:

```tsx
import { useRouter } from "expo-router";
```

Inside a screen:

```tsx
const router = useRouter();
```

Example:

```tsx
onPress={() =>
    router.push("/organizer/session")
}
```

When a newly created route did not appear immediately, the application was reloaded.

If required, Expo can be restarted with:

```bash
npx expo start -c
```

Typed routing may show an error when navigating to a route file that does not exist yet.

For example:

```tsx
router.push("/organizer/dispute");
```

showed an error until this file was created:

```text
app/organizer/dispute.tsx
```

---

# Step 14 - Placeholder Route Requirement

Expo Router requires each route file to export a React component as the default export.

The following warning appeared:

```text
Route "./organizer/playerlist.tsx" is missing
the required default export.
```

The route was fixed by adding a default component.

Example:

```tsx
import { Text, View } from "react-native";

export default function PlayerListScreen() {
    return (
        <View>
            <Text>Player list coming soon</Text>
        </View>
    );
}
```

Every route file inside `app` must contain:

```tsx
export default function ScreenName() {
    return (
        // JSX
    );
}
```

---

# Step 15 - Organizer Session Screen Shell

Created:

```text
app/organizer/session.tsx
```

The screen currently contains:

- App Header
- Admin and Player role toggle
- Round heading
- Court card container
- ScrollView structure

Code:

```tsx
import AppHeader from "@/components/AppHeader";
import CourtCard from "@/components/organizer/CourtCard";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrganizerSessionScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <AppHeader title="Sessions" />

                <View style={styles.roleTabs}>
                    <Text style={styles.activeRole}>
                        Admin
                    </Text>

                    <Text style={styles.inactiveRole}>
                        Player
                    </Text>
                </View>

                <Text style={styles.roundTitle}>
                    Round 1
                </Text>

                <View style={styles.courts}>
                    <CourtCard
                        courtNumber={1}
                        status="In progress"
                        teamOne="Ana & Melissa"
                        teamTwo="Katy & John K."
                        teamOneScore={10}
                        teamTwoScore={8}
                        actionTitle="Manage court"
                        onPress={() => {}}
                    />

                    <CourtCard
                        courtNumber={2}
                        status="Score dispute reported"
                        teamOne="Simon & John G."
                        teamTwo="Leo & Maria"
                        teamOneScore={5}
                        teamTwoScore={6}
                        actionTitle="Resolve Dispute"
                        variant="dispute"
                        onPress={() =>
                            router.push(
                                "/organizer/dispute"
                            )
                        }
                    />

                    <CourtCard
                        courtNumber={3}
                        status="In progress"
                        teamOne="Omar & Sarah"
                        teamTwo="Sophia & David"
                        teamOneScore={4}
                        teamTwoScore={7}
                        actionTitle="Manage court"
                        onPress={() => {}}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    scrollView: {
        flex: 1,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 16,
    },

    roleTabs: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 16,
        padding: 4,
        borderRadius: 10,
        backgroundColor: "#E6EBF2",
    },

    activeRole: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#21652A",
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    inactiveRole: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        color: "#47526C",
        fontSize: 14,
        fontWeight: "600",
    },

    roundTitle: {
        marginTop: 22,
        marginBottom: 12,
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    courts: {
        gap: 14,
    },
});
```

---

# Step 16 - CourtCard Planning

Created:

```text
components/organizer/CourtCard.tsx
```

The CourtCard represents one active court during the organizer session.

Props:

```tsx
type CourtCardProps = {
    courtNumber: number;
    status: string;
    teamOne: string;
    teamTwo: string;
    teamOneScore: number;
    teamTwoScore: number;
    actionTitle: string;
    variant?: "normal" | "dispute" | "resolved";
    onPress?: () => void;
};
```

Responsibilities:

```text
CourtCard
├── Court number
├── Court status
├── TeamRow
├── TeamRow
└── ActionButton
```

The entire card is not pressable.

Only the action button is interactive.

Examples:

```text
Manage court
Resolve Dispute
```

The card variants support:

```text
normal
dispute
resolved
```

---

# Step 17 - Figma CourtCard Measurements

The CourtCard was inspected in Figma.

Figma values:

```text
Width: 358
Height: 224
Background: White
Border width: 1
Border radius: 16
```

The hardcoded Figma width was not copied because the component should respond to the parent container.

React Native uses:

```tsx
width: "100%"
```

The fixed height was kept because it is part of the component design:

```tsx
height: 224
```

The translated card styles are:

```tsx
card: {
    width: "100%",
    height: 224,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
}
```

Figma positioning values such as:

```text
x
y
top
centerX
```

were ignored because the parent screen and Flexbox control component positioning.

---

# Step 18 - TeamRow Component

Created:

```text
components/organizer/TeamRow.tsx
```

The TeamRow displays:

```text
Team name                           Score
```

Code:

```tsx
import { StyleSheet, Text, View } from "react-native";

type TeamRowProps = {
    teamName: string;
    score: number;
};

export default function TeamRow({
    teamName,
    score,
}: TeamRowProps) {
    return (
        <View style={styles.teamRow}>
            <Text style={styles.teamName}>
                {teamName}
            </Text>

            <Text style={styles.score}>
                {score}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    teamRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    teamName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1E293B",
    },

    score: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },
});
```

The layout uses:

```tsx
flexDirection: "row"
```

to place the team name and score side by side.

It uses:

```tsx
justifyContent: "space-between"
```

to place:

- Team name on the left
- Score on the right

It uses:

```tsx
alignItems: "center"
```

to align both values vertically.

---

# Step 19 - ActionButton Component

Created:

```text
components/organizer/ActionButton.tsx
```

This component is separate from `AppButton`.

`AppButton` is used for large full-width calls to action such as:

```text
Check In
Let's Start
End Session
```

`ActionButton` is used inside organizer cards for smaller actions such as:

```text
Manage court
Resolve Dispute
```

Code:

```tsx
import {
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

type ActionButtonProps = {
    title: string;
    onPress?: () => void;
    variant?: "normal" | "dispute";
};

export default function ActionButton({
    title,
    onPress,
    variant = "normal",
}: ActionButtonProps) {
    const isDispute = variant === "dispute";

    return (
        <Pressable
            style={[
                styles.button,
                isDispute
                    ? styles.disputeButton
                    : styles.normalButton,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonText,
                    isDispute
                        ? styles.disputeText
                        : styles.normalText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 44,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    normalButton: {
        backgroundColor: "#E8F5EA",
    },

    disputeButton: {
        backgroundColor: "#F78D2C",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
    },

    normalText: {
        color: "#21652A",
    },

    disputeText: {
        color: "#FFFFFF",
    },
});
```

The variant determines the visual state.

Normal:

```tsx
variant="normal"
```

Dispute:

```tsx
variant="dispute"
```

---

# Step 20 - Completed CourtCard Component

Updated:

```text
components/organizer/CourtCard.tsx
```

The CourtCard now combines:

- Court header
- Status
- Two TeamRow components
- ActionButton

Code:

```tsx
import ActionButton from "@/components/organizer/ActionButton";
import TeamRow from "@/components/organizer/TeamRow";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type CourtCardProps = {
    courtNumber: number;
    status: string;
    teamOne: string;
    teamTwo: string;
    teamOneScore: number;
    teamTwoScore: number;
    actionTitle: string;
    variant?: "normal" | "dispute" | "resolved";
    onPress?: () => void;
};

export default function CourtCard({
    courtNumber,
    status,
    teamOne,
    teamTwo,
    teamOneScore,
    teamTwoScore,
    actionTitle,
    variant = "normal",
    onPress,
}: CourtCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.courtTitle}>
                    Court {courtNumber}
                </Text>

                <Text style={styles.status}>
                    {status}
                </Text>
            </View>

            <View style={styles.teams}>
                <TeamRow
                    teamName={teamOne}
                    score={teamOneScore}
                />

                <TeamRow
                    teamName={teamTwo}
                    score={teamTwoScore}
                />
            </View>

            <View style={styles.actionArea}>
                <ActionButton
                    title={actionTitle}
                    variant={
                        variant === "dispute"
                            ? "dispute"
                            : "normal"
                    }
                    onPress={onPress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 224,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 16,
    },

    header: {
        gap: 4,
    },

    courtTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    status: {
        fontSize: 14,
        fontWeight: "600",
        color: "#47526C",
    },

    teams: {
        gap: 12,
        marginTop: 18,
    },

    actionArea: {
        marginTop: "auto",
    },
});
```

The action area uses:

```tsx
marginTop: "auto"
```

This pushes the action button to the bottom of the fixed-height card.

---

# Step 21 - Dispute Route Placeholder

Created:

```text
app/organizer/dispute.tsx
```

A placeholder route was created so Expo Router recognizes:

```tsx
router.push("/organizer/dispute");
```

Temporary code:

```tsx
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DisputeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Dispute Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
});
```

The placeholder will be replaced with the full organizer dispute review screen.

---

# Current Application Structure

```text
app/
├── _layout.tsx
├── index.tsx
├── modal.tsx
│
├── player/
│   └── index.tsx
│
└── organizer/
    ├── index.tsx
    ├── playerlist.tsx
    ├── scanplayer.tsx
    ├── setupteams.tsx
    ├── session.tsx
    └── dispute.tsx
```

Components:

```text
components/
├── AppButton.tsx
├── AppHeader.tsx
├── EventCard.tsx
├── SessionCard.tsx
│
└── organizer/
    ├── ActionRow.tsx
    ├── ActionButton.tsx
    ├── TeamRow.tsx
    └── CourtCard.tsx
```

---

# Current Organizer Flow

```text
Organizer Home
      ↓
Let's Start
      ↓
Organizer Session
      ↓
Court 2: Resolve Dispute
      ↓
Organizer Dispute Screen
```

---

# Current Progress

Completed:

```text
Project setup
Expo Router configuration
Safe Area setup
Player route
Organizer route
Player Home screen
Organizer Home screen
Reusable AppHeader
Reusable AppButton
Reusable EventCard
Reusable SessionCard
Reusable ActionRow
Organizer Session screen shell
Reusable TeamRow
Reusable ActionButton
Reusable CourtCard
Court variants
Session court data
Dispute route navigation
```

---

# Next Steps

## Step 22 - Organizer Dispute Screen

Build:

```text
app/organizer/dispute.tsx
```

The screen will include:

```text
Court number
Recorded score
Reported score
Reported by player
Dispute reason
Opponent response
Organizer decision
```

---

## Step 23 - Record Outcome Screen

Create:

```text
app/organizer/record-outcome.tsx
```

The organizer will:

```text
Adjust the final score
Add an optional note
Confirm the final score
```

---

## Step 24 - Dispute Resolved Screen

Create:

```text
app/organizer/dispute-resolved.tsx
```

Display:

```text
Dispute resolved
Both teams notified
Decision logged in history
Back to session
```

---

## Step 25 - End Session Flow

Create:

```text
app/organizer/end-session.tsx
```

Display a confirmation before ending the tournament.

---

## Step 26 - Tournament Results

Create:

```text
app/organizer/final-standings.tsx
```

Display:

```text
Final ranking
Wins
Points
Teams
Close session button
```

---

## Step 27 - Session Closed

Create:

```text
app/organizer/session-closed.tsx
```

Display:

```text
Session closed
All scores logged
Back to Events
```

---

# Important Concepts Learned

## Reusable Components

Instead of repeating the same UI, reusable components receive changing information through props.

Example:

```tsx
<CourtCard
    courtNumber={2}
    status="Score dispute reported"
    teamOne="Simon & John G."
    teamTwo="Leo & Maria"
    teamOneScore={5}
    teamTwoScore={6}
    actionTitle="Resolve Dispute"
    variant="dispute"
    onPress={() =>
        router.push("/organizer/dispute")
    }
/>
```

---

## Optional Props

The question mark makes a prop optional:

```tsx
eventName?: string;
```

The component can be used with or without that value.

---

## Conditional Rendering

```tsx
{eventName && (
    <Text>{eventName}</Text>
)}
```

renders the element only when `eventName` has a value.

---

## Parent and Child Responsibilities

Reusable components control their internal appearance.

Screens control:

```text
Screen spacing
Navigation
Data
Position on the page
```

Example:

```text
AppButton controls button appearance.
PlayerHomeScreen controls space above the button.
```

---

## Flexbox

Place elements horizontally:

```tsx
flexDirection: "row"
```

Push elements apart:

```tsx
justifyContent: "space-between"
```

Vertically align them:

```tsx
alignItems: "center"
```

Fill available space:

```tsx
flex: 1
```

Push an element toward the bottom:

```tsx
marginTop: "auto"
```

Allow ScrollView content to fill the screen:

```tsx
contentContainerStyle={{
    flexGrow: 1,
}}
```

---

## Typed Icon Names

```tsx
iconName: keyof typeof Ionicons.glyphMap;
```

This means TypeScript only accepts valid Ionicons names.

An invalid icon name produces an error before the application runs.

---

## File-Based Routing

Expo Router uses files inside `app` as routes.

```text
app/organizer/session.tsx
```

becomes:

```text
/organizer/session
```

Navigation:

```tsx
router.push("/organizer/session");
```

A route must exist before TypeScript accepts it when typed routes are enabled.

---

## Git Checkpoint

After verifying the organizer session screen and CourtCard components, use:

```bash
git status
git diff --stat
git diff
```

Then stage:

```bash
git add app components
```

Commit:

```bash
git commit -m "Build organizer live session court cards"
```

Push:

```bash
git push
```

---

## Step 28 - Organizer Dispute Review Screen

Created:

```text
app/organizer/dispute.tsx
components/organizer/ScoreSummaryCard.tsx
```

Built the organizer dispute review screen based on the approved Figma wireframe.

Implemented:

- AppHeader
- SafeAreaView
- ScrollView
- Recorded Score section
- Reported Score section
- Waiting for opponent response section
- Dispute history badge
- Organizer note input
- Card based layout
- Responsive spacing

Screen structure:

```tsx
<SafeAreaView>
    <ScrollView>

        <AppHeader />

        <Recorded Score />

        <Reported Score />

        <Waiting Response />

        <Dispute Badge />

        <Organizer Note />

    </ScrollView>
</SafeAreaView>
```

Created the reusable layout using:

```tsx
<SafeAreaView
    style={styles.safeArea}
>
    <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
    >
```

Screen styling:

```tsx
safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
},

scrollView: {
    flex: 1,
},

content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 24,
},
```

---

### Recorded Score

Created a reusable ScoreSummaryCard component.

Created:

```text
components/organizer/ScoreSummaryCard.tsx
```

Props:

```tsx
teamOne
teamTwo
teamOneScore
teamTwoScore
```

Internally displays:

```text
Team One        Score

Team Two        Score
```

Used inside the dispute screen:

```tsx
<ScoreSummaryCard
    teamOne="Simon & John G."
    teamTwo="Leo & Maria"
    teamOneScore={5}
    teamTwoScore={6}
/>
```

---

### Reported Score

Built the reported score review card.

Displays:

- Reported by player
- Correct score submitted
- Reason for dispute

Example:

```tsx
<Text>
    Reported by Simon
</Text>

<Text>
    Says it should be
</Text>

<Text>
    5 - 5
</Text>

<Text>
    Reason:
    Point to wrong team
</Text>
```

Used Figma styling:

```text
Background:
#FFFBEB

Border:
#FEE685

Radius:
13
```

---

### Waiting For Response

Created a waiting status section informing the organizer that the opposing team has not yet responded.

Example:

```tsx
<Text>
    Leo & Maria have not responded
</Text>
```

Used a dashed border container to match the Figma design.

---

### Dispute History Badge

Added a reusable badge displaying dispute history.

Example:

```tsx
<Ionicons
    name="time-outline"
/>

<Text>
    Simon: 1st dispute this session
</Text>
```

Styled using the warning color palette from the design system.

---

### Organizer Notes

Added an input field allowing organizers to leave notes before making a decision.

Example:

```tsx
<TextInput
    placeholder="Add a note about this decision"
/>
```

Styled using:

```text
Height:
50px

Background:
White

Border:
1px

Radius:
14px
```

---

### Figma Design Decisions

Used the component measurements from Figma.

Screen:

```text
Background:
#F9FAFB
```

Recorded Score Card:

```text
Height:
118px

Background:
#F3F4F6
```

Reported Score Card:

```text
Height:
122px

Background:
#FFFBEB

Border:
#FEE685

Radius:
13px
```

Waiting Response:

```text
Height:
94px
```

Dispute Badge:

```text
Height:
37px
```

Organizer Note:

```text
Height:
50px
```

---

### Current Organizer Flow

Current navigation:

```text
Organizer Home

↓

Session

↓

Dispute Review

↓

Record Outcome (Next)

↓

Dispute Resolved

↓

End Session

↓

Final Standings

↓

Session Closed
```

---

## Current Progress

Completed:

- Project setup
- Shared Components
- Organizer Components
- Player Home
- Organizer Home
- Expo Router Navigation
- EventCard
- SessionCard
- ActionRow
- TeamRow
- ActionButton
- CourtCard
- Organizer Session
- ScoreSummaryCard
- Organizer Dispute Review Screen

Next:

- Record Outcome
- Dispute Resolved
- End Session
- Final Standings
- Session Closed
- Final UI polish
---

## Step 29 - Functional Back Navigation

Updated:

```text
components/shared/AppHeader.tsx
```

The shared `AppHeader` originally displayed a back arrow visually, but the button did not perform any navigation.

Added an optional `onBack` prop so each screen can decide what should happen when the back arrow is pressed.

Updated props:

```tsx
type AppHeaderProps = {
    title: string;
    onBack?: () => void;
};
```

Updated the component to receive the callback:

```tsx
export default function AppHeader({
    title,
    onBack,
}: AppHeaderProps) {
```

Connected the callback to the back button:

```tsx
<Pressable
    style={styles.iconButton}
    onPress={onBack}
>
    <MaterialIcons
        name="arrow-back"
        size={30}
        color="#1F1F1F"
    />
</Pressable>
```

Used Expo Vector Icons instead of a manually typed arrow character.

Import:

```tsx
import { MaterialIcons } from "@expo/vector-icons";
```

This gives the application a cleaner and more consistent back icon.

Example usage inside a screen:

```tsx
<AppHeader
    title="Court 2 - Dispute"
    onBack={() => router.back()}
/>
```

The screen first creates the router:

```tsx
const router = useRouter();
```

with:

```tsx
import { useRouter } from "expo-router";
```

For screens where the destination should always be known, navigation can also explicitly return to another route:

```tsx
<AppHeader
    title="Sessions"
    onBack={() => router.replace("/organizer")}
/>
```

This keeps navigation responsibility inside the screen while `AppHeader` remains reusable.

Current navigation pattern:

```text
Organizer Home
      ↓
Sessions
      ↓
Court 2 Dispute
      ↑
Back
```

---

## Step 30 - Organizer DecisionButton Component

Created:

```text
components/organizer/DecisionButton.tsx
```

The existing buttons did not match the Accept and Reject components from the Figma design.

The organizer decision buttons are larger card-style actions that display:

```text
Decision title

Description + score
```

Examples:

```text
Accept
Score becomes 5 - 5
```

and:

```text
Reject
Score stays 5 - 6
```

Created reusable props:

```tsx
type DecisionButtonProps = {
    title: string;
    description: string;
    teamOneScore: number;
    teamTwoScore: number;
    onPress: () => void;
    variant: "accept" | "reject" | "goToCourt";
};
```

Full component:

```tsx
import { Pressable, StyleSheet, Text, View } from "react-native";

type DecisionButtonProps = {
    title: string;
    description: string;
    teamOneScore: number;
    teamTwoScore: number;
    onPress: () => void;
    variant: "accept" | "reject" | "goToCourt";
};

export default function DecisionButton({
    title,
    description,
    teamOneScore,
    teamTwoScore,
    onPress,
    variant,
}: DecisionButtonProps) {

    const getButtonStyle = () => {
        if (variant === "accept") {
            return styles.acceptButton;
        }

        if (variant === "reject") {
            return styles.rejectButton;
        }

        return styles.goToCourtButton;
    };

    const getTitleStyle = () => {
        if (variant === "accept") {
            return styles.acceptText;
        }

        if (variant === "reject") {
            return styles.rejectText;
        }

        return styles.goToCourtText;
    };

    return (
        <Pressable
            style={[
                styles.button,
                getButtonStyle(),
            ]}
            onPress={onPress}
        >
            <View>
                <Text
                    style={[
                        styles.buttonTitle,
                        getTitleStyle(),
                    ]}
                >
                    {title}
                </Text>

                <Text style={styles.descriptionText}>
                    {description} {teamOneScore} - {teamTwoScore}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 71,
        borderRadius: 13,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    acceptButton: {
        backgroundColor: "#E8F5EA",
        borderColor: "#C4E1C8",
    },

    rejectButton: {
        backgroundColor: "#FCF2F2",
        borderColor: "#FFD1CF",
    },

    goToCourtButton: {
        backgroundColor: "#E8F5EA",
        borderColor: "#C4E1C8",
    },

    buttonTitle: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },

    acceptText: {
        color: "#21652A",
    },

    rejectText: {
        color: "#B42318",
    },

    goToCourtText: {
        color: "#21652A",
    },

    descriptionText: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "600",
        color: "#47526C",
        textAlign: "center",
    },
});
```

---

### DecisionButton Figma Measurements

The Accept and Reject components were inspected directly from Figma.

Both use:

```text
Width:
358px

Height:
71px

Border:
1px
```

Instead of hardcoding:

```tsx
width: 358
```

the React Native component uses:

```tsx
width: "100%"
```

so it fills the available screen width responsively.

The fixed height is preserved:

```tsx
height: 71
```

The title uses:

```text
18px
```

and the description / score text uses:

```text
15px
```

Both text lines are centered inside the button.

---

### Accept Variant

Figma design uses a light green confirmation state.

React Native styling:

```tsx
acceptButton: {
    backgroundColor: "#E8F5EA",
    borderColor: "#C4E1C8",
},
```

Title:

```tsx
acceptText: {
    color: "#21652A",
},
```

Example:

```text
Accept
Score becomes 5 - 5
```

---

### Reject Variant

Figma design uses a light red decision state.

React Native styling:

```tsx
rejectButton: {
    backgroundColor: "#FCF2F2",
    borderColor: "#FFD1CF",
},
```

Title:

```tsx
rejectText: {
    color: "#B42318",
},
```

Example:

```text
Reject
Score stays 5 - 6
```

---

### Future Go To Court Variant

The component also prepares for the organizer's later:

```text
Go to Court
```

action.

Added:

```tsx
variant: "accept" | "reject" | "goToCourt";
```

This means the same reusable component can later be used for the Go to Court action without creating another button component.

---

## Step 31 - Add Organizer Decisions to Dispute Screen

Updated:

```text
app/organizer/dispute.tsx
```

Imported the reusable decision component:

```tsx
import DecisionButton from "@/components/organizer/DecisionButton";
```

Added Accept and Reject actions underneath the organizer note field.

Code:

```tsx
<View style={styles.decisions}>
    <DecisionButton
        title="Accept"
        description="Score becomes"
        teamOneScore={5}
        teamTwoScore={5}
        variant="accept"
        onPress={() => {}}
    />

    <DecisionButton
        title="Reject"
        description="Score stays"
        teamOneScore={5}
        teamTwoScore={6}
        variant="reject"
        onPress={() => {}}
    />
</View>
```

Added spacing:

```tsx
decisions: {
    gap: 16,
    marginTop: 16,
},
```

The organizer can now visually choose between:

```text
Accept
Score becomes 5 - 5
```

or:

```text
Reject
Score stays 5 - 6
```

The button callbacks are temporarily:

```tsx
onPress={() => {}}
```

because the next step is connecting both decisions to the Dispute Resolved confirmation flow.

---

## Step 32 - Final Court 2 Dispute Screen Structure

The completed dispute review screen now contains:

```text
Court 2 - Dispute

Recorded Score
    Simon & John G.        5
    Leo & Maria            6

Reported by Simon
    Says it should be      5 - 5
    Reason: Point to wrong team

Opponent Response
    Leo & Maria have not responded

Dispute History
    Simon: 1st dispute this session

Organizer Note
    Add a note about this decision

Organizer Decision
    Accept
    Score becomes 5 - 5

    Reject
    Score stays 5 - 6
```

Current screen component structure:

```text
DisputeScreen
│
├── AppHeader
│
├── Recorded Score Card
│
├── Reported Score Card
│
├── Opponent Response Card
│
├── Dispute History Badge
│
├── TextInput
│
├── DecisionButton
│     └── Accept
│
└── DecisionButton
      └── Reject
```

This completes the main UI for the organizer dispute decision screen.

---

## Updated Organizer Flow

Current working flow:

```text
Organizer Home
      ↓
Let's Start
      ↓
Organizer Session
      ↓
Resolve Dispute
      ↓
Court 2 - Dispute
      ↓
Accept / Reject
      ↓
Dispute Resolved (Next)
```

---

## Current Progress

Completed:

```text
Project Setup
Expo Router
Safe Area support
Player Home
Organizer Home
Shared AppHeader
Shared AppButton
EventCard
SessionCard
ActionRow
TeamRow
ActionButton
CourtCard
Organizer Session
ScoreSummaryCard
Organizer Dispute Review
Functional Back Navigation
Expo Vector Icon Back Arrow
DecisionButton
Accept UI
Reject UI
Organizer Decision Section
```

Next:

```text
Dispute Resolved
Back to Session after resolution
Resolved Court state
Manage Court
Dispute History
End Session
Final Round
Final Standings
Session Closed
Final UI polish
```

---

## Git Checkpoint - Organizer Session and Dispute UI

Before committing, check the changed files:

```bash
git status
```

Review the changes:

```bash
git diff
```

Optional quick summary:

```bash
git diff --stat
```

Stage the current work:

```bash
git add .
```

Commit:

```bash
git commit -m "Build organizer dispute decision flow"
```

Push:

```bash
git push
```

This checkpoint includes:

```text
Organizer Session
CourtCard updates
ActionButton
Back navigation
Dispute review screen
DecisionButton
Accept and Reject UI
```

After pushing, the next feature will start from:

```text
Dispute Resolved
```

---

## Step 33 - Dispute Resolved Screen

Created:

```text
app/organizer/dispute-resolved.tsx
```

Built the confirmation screen displayed after the organizer accepts or rejects a score dispute.

The screen follows the Figma confirmation design and contains:

```text
Confirmation icon
Dispute Resolved heading
Confirmation message
Back to session button
```

---

### Screen Shell

Created the screen using:

```tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
```

Created the screen component:

```tsx
export default function DisputeResolvedScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* Confirmation content */}

            </View>
        </SafeAreaView>
    );
}
```

Base screen styles:

```tsx
safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
},

container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
```

Using:

```tsx
justifyContent: "center"
```

centers the confirmation vertically.

Using:

```tsx
alignItems: "center"
```

centers it horizontally.

---

### Confirmation Icon

Created the circular green confirmation icon.

Code:

```tsx
<View style={styles.iconCircle}>
    <Ionicons
        name="checkmark"
        size={36}
        color="#2E903B"
    />
</View>
```

Styles:

```tsx
iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D1EAD4",
    justifyContent: "center",
    alignItems: "center",
},
```

The Figma circle is:

```text
80px × 80px
```

Because the width and height are both 80px, using:

```tsx
borderRadius: 40
```

creates a perfect circle.

The confirmation colors are:

```text
Background:
#D1EAD4

Checkmark:
#2E903B
```

---

### Confirmation Message

Added the confirmation text underneath the icon.

Code:

```tsx
<View style={styles.messageSection}>
    <Text style={styles.title}>
        Dispute Resolved
    </Text>

    <Text style={styles.message}>
        Both teams notified. Logged in history.
    </Text>
</View>
```

Styles:

```tsx
messageSection: {
    width: 257,
    marginTop: 24,
    gap: 12,
},

title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#47526C",
    textAlign: "center",
},

message: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9099B0",
    textAlign: "center",
},
```

The heading follows the Figma typography:

```text
Size:
22px

Weight:
700

Alignment:
Center
```

The confirmation message uses:

```text
Size:
14px

Weight:
400

Alignment:
Center
```

---

### Component Structure Fix

Initially the message section was accidentally placed inside:

```tsx
<View style={styles.iconCircle}>
```

This caused the text to overlap because the parent was only:

```text
80px × 80px
```

The layout was corrected so the icon and message are siblings.

Correct structure:

```text
container
│
├── iconCircle
│
└── messageSection
```

React Native:

```tsx
<View style={styles.container}>

    <View style={styles.iconCircle}>
        <Ionicons
            name="checkmark"
            size={36}
            color="#2E903B"
        />
    </View>

    <View style={styles.messageSection}>
        <Text style={styles.title}>
            Dispute Resolved
        </Text>

        <Text style={styles.message}>
            Both teams notified. Logged in history.
        </Text>
    </View>

</View>
```

This prevents the confirmation text from being constrained by the icon container.

---

### Back To Session Button

Added the final action:

```text
Back to session
```

Code:

```tsx
<Pressable
    style={styles.backButton}
    onPress={() =>
        router.replace("/organizer/session")
    }
>
    <Text style={styles.backButtonText}>
        Back to session
    </Text>
</Pressable>
```

Styles:

```tsx
backButton: {
    width: 257,
    height: 55,
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1ECF1",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
},

backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
},
```

Figma button measurements:

```text
Width:
257px

Height:
55px

Border Radius:
13px

Background:
#FFFFFF

Border:
#E1ECF1
```

Button typography:

```text
Font Size:
18px

Weight:
600
```

---

### Why router.replace() Was Used

Navigation uses:

```tsx
router.replace("/organizer/session")
```

instead of:

```tsx
router.push("/organizer/session")
```

The resolved screen is a temporary confirmation state.

Using `replace()` removes the confirmation screen from the current navigation position instead of adding another Session screen to the stack.

The user returns directly to:

```text
Organizer Session
```

---

## Step 34 - Connect Dispute Decisions To Resolved Screen

Updated:

```text
app/organizer/dispute.tsx
```

The Accept and Reject buttons previously used:

```tsx
onPress={() => {}}
```

They were connected to:

```text
/organizer/dispute-resolved
```

Accept:

```tsx
<DecisionButton
    title="Accept"
    description="Score becomes"
    teamOneScore={5}
    teamTwoScore={5}
    variant="accept"
    onPress={() =>
        router.push("/organizer/dispute-resolved")
    }
/>
```

Reject:

```tsx
<DecisionButton
    title="Reject"
    description="Score stays"
    teamOneScore={5}
    teamTwoScore={6}
    variant="reject"
    onPress={() =>
        router.push("/organizer/dispute-resolved")
    }
/>
```

Both actions currently display the same resolved confirmation screen.

The actual score state can be connected later when application data/state is implemented.

---

## Completed Dispute Flow

The organizer dispute flow is now fully clickable:

```text
Organizer Session
        ↓
Resolve Dispute
        ↓
Court 2 - Dispute
        ↓
Accept / Reject
        ↓
Dispute Resolved
        ↓
Back to session
        ↓
Organizer Session
```

Implemented routes:

```text
/organizer/session
/organizer/dispute
/organizer/dispute-resolved
```

---

## Current Progress

Completed:

```text
Organizer Home
Organizer Session
Court Cards
Resolve Dispute navigation
Dispute Review
Recorded Score
Reported Score
Opponent Response
Dispute History Badge
Organizer Note
DecisionButton
Accept Decision
Reject Decision
Dispute Resolved Confirmation
Back to Session navigation
```

Next organizer features:

```text
Resolved Court state
Manage Court
Dispute History
End Session
Final Round
Final Standings
Session Closed
```

---

## Git Checkpoint - Complete Dispute Flow

Check the working tree:

```bash
git status
```

Review what changed:

```bash
git diff --stat
git diff
```

Stage the current work:

```bash
git add .
```

Commit:

```bash
git commit -m "Complete organizer dispute resolution flow"
```

Push:

```bash
git push
```

This commit includes:

```text
DecisionButton
Accept and Reject actions
Dispute Resolved screen
Confirmation UI
Back to Session navigation
Completed organizer dispute flow
```

---

## Step 35 - Store Court Data in Session State

Updated:

```text
app/organizer/session.tsx
```

Previously, each `CourtCard` was written separately with hardcoded data.

The court information was moved into a `courts` state array:

```tsx
const [courts, setCourts] = useState([
    {
        courtNumber: 1,

        teamOne: "Ana & Melissa",
        teamTwo: "Katy & John K.",

        teamOneScore: 10,
        teamTwoScore: 8,

        reportedTeamOneScore: 10,
        reportedTeamTwoScore: 8,

        hasDispute: false,
    },
    {
        courtNumber: 2,

        teamOne: "Simon & John G.",
        teamTwo: "Leo & Maria",

        teamOneScore: 5,
        teamTwoScore: 6,

        reportedTeamOneScore: 5,
        reportedTeamTwoScore: 5,

        hasDispute: true,
    },
    {
        courtNumber: 3,

        teamOne: "Omar & Sarah",
        teamTwo: "Sophia & David",

        teamOneScore: 4,
        teamTwoScore: 7,

        reportedTeamOneScore: 5,
        reportedTeamTwoScore: 7,

        hasDispute: true,
    },
]);
```

Each court now stores:

```text
Court number
Team names
Current score
Reported score
Dispute state
```

Court 1 currently has no dispute.

Court 2 and Court 3 have disputes for the prototype.

---

## Step 36 - Generate Court Cards From Court Data

Instead of manually creating three separate `CourtCard` components, the Session screen now uses:

```tsx
courts.map()
```

Code:

```tsx
<View style={styles.courts}>
    {courts.map((court) => (
        <CourtCard
            key={court.courtNumber}
            courtNumber={court.courtNumber}
            status={
                court.hasDispute
                    ? "Score dispute reported"
                    : "In progress"
            }
            teamOne={court.teamOne}
            teamTwo={court.teamTwo}
            teamOneScore={court.teamOneScore}
            teamTwoScore={court.teamTwoScore}
            actionTitle={
                court.hasDispute
                    ? "Resolve Dispute"
                    : "Manage Court"
            }
            variant={
                court.hasDispute
                    ? "dispute"
                    : "normal"
            }
            onPress={() => {
                if (court.hasDispute) {
                    // Open dispute
                }
            }}
        />
    ))}
</View>
```

This allows the same `CourtCard` component to display every court.

The UI is now controlled by:

```tsx
court.hasDispute
```

When:

```tsx
hasDispute: true
```

the court displays:

```text
Score dispute reported
Resolve Dispute
```

When:

```tsx
hasDispute: false
```

the court displays:

```text
In progress
Manage Court
```

The status and button therefore come from the same dispute state instead of being stored separately.

---

## Step 37 - Pass Selected Court Data to Dispute Screen

Updated navigation from:

```text
app/organizer/session.tsx
```

The dispute screen previously contained information specifically for Court 2.

The selected court information is now passed through Expo Router parameters.

```tsx
onPress={() => {
    if (court.hasDispute) {
        router.push({
            pathname: "/organizer/dispute",
            params: {
                courtNumber: court.courtNumber,
                teamOne: court.teamOne,
                teamTwo: court.teamTwo,
                teamOneScore: court.teamOneScore,
                teamTwoScore: court.teamTwoScore,
                reportedTeamOneScore:
                    court.reportedTeamOneScore,
                reportedTeamTwoScore:
                    court.reportedTeamTwoScore,
            },
        });
    }
}}
```

This means one dispute screen can now be reused for different courts.

Current prototype disputes:

```text
Court 2
Court 3
```

---

## Step 38 - Read Court Parameters on Dispute Screen

Updated:

```text
app/organizer/dispute.tsx
```

Imported:

```tsx
import {
    useLocalSearchParams,
    useRouter
} from "expo-router";
```

Received the selected court information:

```tsx
const {
    courtNumber,
    teamOne,
    teamTwo,
    teamOneScore,
    teamTwoScore,
    reportedTeamOneScore,
    reportedTeamTwoScore,
} = useLocalSearchParams();
```

The dispute screen header is now dynamic:

```tsx
<AppHeader
    title={`Court ${courtNumber} - Dispute`}
    onBack={() => router.back()}
/>
```

Instead of always displaying:

```text
Court 2 - Dispute
```

the screen displays the court that the organizer selected.

---

## Step 39 - Make Recorded Score Dynamic

Removed the hardcoded team names and scores from the Recorded Score section.

Team One:

```tsx
<View style={styles.scoreRow}>
    <Text style={styles.teamName}>
        {String(teamOne)}
    </Text>

    <Text style={styles.smallScore}>
        {Number(teamOneScore)}
    </Text>
</View>
```

Team Two:

```tsx
<View style={styles.scoreRow}>
    <Text style={styles.teamName}>
        {String(teamTwo)}
    </Text>

    <Text style={styles.smallScore}>
        {Number(teamTwoScore)}
    </Text>
</View>
```

The same dispute screen can therefore display the recorded score for either Court 2 or Court 3.

---

## Step 40 - Make Reported Score Dynamic

The reported score now comes from the selected court.

```tsx
<Text style={styles.reportedScore}>
    {Number(reportedTeamOneScore)} - {Number(reportedTeamTwoScore)}
</Text>
```

The opponent response also uses the selected team:

```tsx
<Text style={styles.responseText}>
    {String(teamTwo)} have not responded
</Text>
```

This removes more Court 2 specific information from the screen.

---

## Step 41 - Make Accept and Reject Scores Dynamic

The reusable `DecisionButton` now receives the scores from the selected court.

Accept uses the reported score:

```tsx
<DecisionButton
    title="Accept"
    description="Score becomes"
    teamOneScore={Number(reportedTeamOneScore)}
    teamTwoScore={Number(reportedTeamTwoScore)}
    variant="accept"
    onPress={() =>
        router.push("/organizer/dispute-resolved")
    }
/>
```

Reject uses the current recorded score:

```tsx
<DecisionButton
    title="Reject"
    description="Score stays"
    teamOneScore={Number(teamOneScore)}
    teamTwoScore={Number(teamTwoScore)}
    variant="reject"
    onPress={() =>
        router.push("/organizer/dispute-resolved")
    }
/>
```

Decision logic:

```text
Accept
→ use reported score

Reject
→ keep recorded score
```

This allows the organizer to clearly see what will happen before selecting a decision.

---

## Step 42 - Update Court After Resolving a Dispute

The dispute resolution flow was extended so the selected court can return to the Session screen as resolved.

The intended state change is:

```text
Before Resolution

hasDispute: true

Score dispute reported
Resolve Dispute
```

After Resolution:

```text
hasDispute: false

In progress
Manage Court
```

If the organizer accepts the dispute:

```text
Reported score becomes the court score.
```

If the organizer rejects the dispute:

```text
The original court score remains.
```

This gives the prototype a more realistic dispute resolution interaction.

---

## Step 43 - Prototype State Limitation

The court information currently uses local React state:

```tsx
useState()
```

This project is an interactive prototype and does not currently use a backend database or persistent tournament state.

Because the Session screen can be recreated during navigation, previously changed local court state may return to its initial values when another dispute is resolved.

For the current prototype, this is acceptable because the main goal is to demonstrate the organizer dispute workflow.

A production implementation could later store this information using:

```text
Shared application state
API
Database
```

The current prototype successfully demonstrates:

```text
Organizer Session
        ↓
Select Court With Dispute
        ↓
Dynamic Dispute Screen
        ↓
Review Recorded Score
        ↓
Review Reported Score
        ↓
Accept / Reject
        ↓
Dispute Resolved
        ↓
Back to Session
        ↓
Resolved Court → Manage Court
```

---

## Current Progress

Completed:

```text
Organizer Home
Organizer Session
Court Cards
Dynamic Court Data
Court Dispute State
Court 2 Dispute
Court 3 Dispute
Dynamic Dispute Navigation
Dynamic Recorded Scores
Dynamic Reported Scores
DecisionButton
Accept Decision
Reject Decision
Dispute Resolved Confirmation
Resolved Court State
Back to Session
Manage Court State
```

Next:

```text
Manage Court
End Session
Final Round
Final Standings
Session Closed
Final UI polish
```

---

## Git Checkpoint - Dynamic Dispute State

Check changes:

```bash
git status
git diff --stat
git diff
```

Stage:

```bash
git add .
```

Commit:

```bash
git commit -m "Add dynamic court dispute state"
```

Push:

```bash
git push
```

---
