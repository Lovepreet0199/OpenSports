import AppHeader from "@/components/shared/AppHeader";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourtCard from "@/components/organizer/CourtCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function OrganizerSessionScreen() {
    const router = useRouter();

    /*
        When the organizer finishes resolving a dispute, the resolved screen
        sends information back to this Session screen through route parameters.

        We use these values to know:
        - which court was resolved
        - what the final score should be
    */
    const {
        resolvedCourt,
        decision,
        resolvedTeamOneScore,
        resolvedTeamTwoScore,
    } = useLocalSearchParams();

    /*
        Court information is stored in state instead of writing every CourtCard
        separately.

        This makes the UI easier to update because each court's data lives in
        one place and the cards can be generated from this array.
    */
    const [courts, setCourts] = useState([
        {
            courtNumber: 1,

            teamOne: "Ana & Melissa",
            teamTwo: "Katy & John K.",

            teamOneScore: 10,
            teamTwoScore: 8,

            /*
                The reported score is stored separately from the current score
                so a dispute can compare the existing score with the score
                submitted by the player.
            */
            reportedTeamOneScore: 10,
            reportedTeamTwoScore: 8,

            reportedBy: "",

            /*
                hasDispute is used as the main value that controls the court state.

                false means:
                - In progress
                - Manage Court button

                true means:
                - Score dispute reported
                - Resolve Dispute button
            */
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

            reportedBy: "Simon",

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

            reportedBy: "Omar",

            hasDispute: true,
        },
    ]);

    /*
        This runs when the Session screen receives a resolved court number.

        We use useEffect instead of calling setCourts directly in the component
        because updating state during rendering could cause repeated renders.
    */
    useEffect(() => {
        /*
            If the Session screen was opened normally and no dispute was just
            resolved, there is nothing to update.
        */
        if (!resolvedCourt) {
            return;
        }

        /*
            We map through all courts so we can update only the court that was
            resolved while leaving every other court unchanged.
        */
        setCourts((currentCourts) =>
            currentCourts.map((court) => {
                if (court.courtNumber === Number(resolvedCourt)) {
                    return {
                        /*
                            Spread keeps all the court's existing information,
                            such as team names and reported score.
                        */
                        ...court,

                        /*
                            The resolved screen sends back the final score.

                            If the organizer accepted the dispute, this will be
                            the reported score.

                            If the organizer rejected it, this will be the
                            original recorded score.
                        */
                        teamOneScore: Number(resolvedTeamOneScore),
                        teamTwoScore: Number(resolvedTeamTwoScore),

                        /*
                            Once the dispute is finished, setting this to false
                            automatically changes the card back to the normal
                            Manage Court state.
                        */
                        hasDispute: false,
                    };
                }

                /*
                    Courts that were not resolved are returned without changes.
                */
                return court;
            })
        );
    }, [resolvedCourt]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/*
                    We explicitly return to Organizer Home because this screen
                    may be reopened using route replacement during the prototype,
                    so router.back() may not always have the expected history.
                */}
                <AppHeader
                    onBack={() => router.replace("/organizer")}
                    title="Sessions"
                />

                {/*
                    The Admin / Player tabs are currently visual controls for
                    the prototype. Admin is the active organizer view.
                */}
                <View style={styles.roleTabs}>
                    <Text style={styles.activeRole}>Admin</Text>
                    <Text style={styles.inactiveRole}>Player</Text>
                </View>

                <Text style={styles.roundTitle}>Round 1</Text>

                <View style={styles.courts}>
                    {/*
                        Instead of writing CourtCard three times manually,
                        map() creates one CourtCard for every court object.

                        This keeps the UI connected to the court data and makes
                        the same approach reusable if more courts are added later.
                    */}
                    {courts.map((court) => (
                        <CourtCard
                            key={court.courtNumber}
                            courtNumber={court.courtNumber}

                            /*
                                We do not store a separate status value because
                                that could become inconsistent with hasDispute.

                                Instead, the status is calculated from the current
                                dispute state.
                            */
                            status={
                                court.hasDispute
                                    ? "Score dispute reported"
                                    : "In progress"
                            }

                            teamOne={court.teamOne}
                            teamTwo={court.teamTwo}
                            teamOneScore={court.teamOneScore}
                            teamTwoScore={court.teamTwoScore}

                            /*
                                The same hasDispute value also decides which action
                                the organizer sees.
                            */
                            actionTitle={
                                court.hasDispute
                                    ? "Resolve Dispute"
                                    : "Manage Court"
                            }

                            /*
                                The variant changes the visual style of the button.

                                Dispute courts use the orange dispute styling.
                                Normal courts use the regular Manage Court styling.
                            */
                            variant={
                                court.hasDispute
                                    ? "dispute"
                                    : "normal"
                            }

                            onPress={() => {
                                /*
                                    Only courts that currently have a dispute open
                                    the dispute review screen here.

                                    Manage Court will receive its own route later.
                                */
                                if (court.hasDispute) {
                                    router.push({
                                        pathname: "/organizer/dispute",

                                        /*
                                            We pass the selected court data through
                                            Expo Router so one dispute screen can be
                                            reused instead of building separate screens
                                            for Court 2 and Court 3.
                                        */
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
                                            reportedBy: court.reportedBy,
                                        },
                                    });
                                }
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /*
        SafeAreaView prevents the organizer screen from being covered by
        device areas such as the Dynamic Island.
    */
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    /*
        Court cards can extend beyond the device height, so the page needs
        to remain scrollable.
    */
    scrollView: {
        flex: 1,
    },

    /*
        flexGrow allows the ScrollView content to fill the available screen
        while still growing when more court cards need vertical space.
    */
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 16,
    },

    /*
        The role selector is centered and laid out horizontally to match
        the Admin / Player control from the Figma design.
    */
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
        fontWeight: "500",
        color: "#1b284798",
    },

    /*
        gap controls the spacing between CourtCards in one place instead
        of putting margins inside the reusable CourtCard component.
    */
    courts: {
        gap: 14,
    },
});