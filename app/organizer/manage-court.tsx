import AppHeader from "@/components/shared/AppHeader";
import ScoreControl from "@/components/organizer/ScoreControl";
import CourtActionRow from "@/components/organizer/CourtActionRow";
import AppButton from "@/components/shared/AppButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";


export default function ManageCourtScreen() {
    const router = useRouter();

    /*
        The Session screen sends information about the selected court
        when the organizer presses "Manage Court".

        This lets us reuse one Manage Court screen for any court
        instead of creating a separate screen for Court 1, 2, and 3.
    */
    const {
        courtNumber,
        teamOne,
        teamTwo,
        teamOneScore,
        teamTwoScore,
        reportedTeamOneScore,
        reportedTeamTwoScore,
        reportedBy,
        isContested,
        reviewedBy,
    } = useLocalSearchParams();


    /*
        We copy the scores received from Session into state because
        the organizer needs to be able to increase or decrease them.

        Number() converts the route parameters into numbers so we
        can perform calculations such as scoreOne + 1.
    */
    const [scoreOne, setScoreOne] = useState(
        Number(teamOneScore)
    );

    const [scoreTwo, setScoreTwo] = useState(
        Number(teamTwoScore)
    );


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/*
                    The header uses the court number received from Session,
                    so the same screen can display Court 1, Court 2, etc.
                */}
                <AppHeader
                    title={`Court ${courtNumber}`}
                    onBack={() => router.back()}
                />


                {/* Enter Score Section */}

                <Text style={styles.sectionTitle}>
                    Enter score
                </Text>


                {/*
                    Both teams are grouped inside the same score card.

                    ScoreControl is reusable, so we don't need to build
                    separate minus, score, and plus buttons for each team.
                */}
                <View style={styles.scoreCard}>

                    {/* Team One */}
                    <View style={styles.teamRow}>
                        <Text style={styles.teamName}>
                            {String(teamOne)}
                        </Text>

                        <ScoreControl
                            score={scoreOne}

                            /*
                                We prevent the score from going below 0
                                because a match cannot have a negative score.
                            */
                            onDecrease={() => {
                                if (scoreOne > 0) {
                                    setScoreOne(scoreOne - 1);
                                }
                            }}

                            /*
                                Increasing the score updates the state,
                                which automatically updates the number shown
                                inside ScoreControl.
                            */
                            onIncrease={() => {
                                // Stop the score at 11 because this prototype
                                // uses 11 as the maximum match score.
                                if (scoreOne < 11) {
                                    setScoreOne(scoreOne + 1);
                                }
                            }}
                        />
                    </View>


                    {/* Separates the two teams inside the same card */}
                    <View style={styles.divider} />


                    {/* Team Two */}
                    <View style={styles.teamRow}>
                        <Text style={styles.teamName}>
                            {String(teamTwo)}
                        </Text>

                        <ScoreControl
                            score={scoreTwo}

                            onDecrease={() => {
                                if (scoreTwo > 0) {
                                    setScoreTwo(scoreTwo - 1);
                                }
                            }}

                            onIncrease={() => {
                                // Do not allow the score to go higher than 11.
                                if (scoreTwo < 11) {
                                    setScoreTwo(scoreTwo + 1);
                                }
                            }}
                        />
                    </View>

                </View>


                {/* Court Actions Section */}

                {/*
                    Court actions are outside scoreCard because Figma
                    displays them as a separate section and card.
                */}
                <Text style={styles.actionsTitle}>
                    Court actions
                </Text>


                <View style={styles.actionsCard}>

                    {/*
                        Finish Match will eventually allow the organizer
                        to complete the match.

                        We are leaving the action empty for now because
                        we will build that interaction separately.
                    */}
                    <CourtActionRow
                        title="Finish match"
                        onPress={() => {
                            // Finish Match functionality will be added next.
                        }}
                    />


                    <View style={styles.divider} />


                    {/*
                        Dispute History opens a separate screen showing
                        previous disputes for this court.

                        We pass courtNumber so the history screen knows
                        which court the organizer is viewing.
                    */}
                    <CourtActionRow
                        title="Dispute history"
                        onPress={() =>
                            router.push({
                                pathname: "/organizer/dispute-history",
                                params: {
                                    courtNumber: courtNumber,
                                    teamOne: teamOne,
                                    teamTwo: teamTwo,

                                    recordedTeamOneScore: teamOneScore,
                                    recordedTeamTwoScore: teamTwoScore,

                                    /*
                                        These values represent what the player originally
                                        claimed during the dispute.
                                    */
                                    reportedTeamOneScore: reportedTeamOneScore,
                                    reportedTeamTwoScore: reportedTeamTwoScore,

                                    /*
                                        scoreOne and scoreTwo represent the score currently
                                        shown on the Manage Court screen.
                                    */
                                    finalTeamOneScore: scoreOne,
                                    finalTeamTwoScore: scoreTwo,

                                    reportedBy: reportedBy,

                                    isContested: isContested,
                                    reviewedBy: reviewedBy,
                                },
                            })
                        }
                    />

                </View>
                {/*
                    The Save Changes button stays near the bottom of the screen.

                    The score changes currently exist only in local state.
                    Later, pressing this button can send the updated scores
                    back to the Session screen.
                */}
                <View style={styles.saveButton}>
                    <AppButton
                        title="Save changes"
                        variant="primary"
                        onPress={() =>
                            router.replace({
                                pathname: "/organizer/session",
                                params: {
                                    resolvedCourt: courtNumber,
                                    resolvedTeamOneScore: scoreOne,
                                    resolvedTeamTwoScore: scoreTwo,
                                },
                            })
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    /*
        SafeAreaView keeps the content away from device areas
        such as the Dynamic Island and bottom system area.
    */
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },


    /*
        Horizontal padding keeps the screen content aligned
        consistently with the rest of the organizer screens.
    */
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },


    /*
        Used for the "Enter score" section heading.
    */
    sectionTitle: {
        marginTop: 12,
        marginBottom: 10,
        paddingLeft: 16,
        fontSize: 17,
        fontWeight: "600",
        color: "#9099B0",
    },


    /*
        Both teams are placed inside one bordered card,
        matching the grouped score section from Figma.
    */
    scoreCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 14,
        overflow: "hidden",
    },


    /*
        Each row places the team name on the left and
        its ScoreControl on the right.
    */
    teamRow: {
        minHeight: 76,
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },


    teamName: {
        fontSize: 17,
        fontWeight: "500",
        color: "#101828",
    },


    /*
        The same divider can be reused between the score rows
        and between the two Court Action rows.
    */
    divider: {
        height: 1,
        backgroundColor: "#E1ECF1",
    },


    /*
        Court actions starts farther below the score card
        because it is a separate section in the Figma design.
    */
    actionsTitle: {
        marginTop: 24,
        marginBottom: 10,
        paddingLeft: 16,
        fontSize: 17,
        fontWeight: "600",
        color: "#9099B0",
    },


    /*
        Finish Match and Dispute History are grouped into
        their own card instead of being inside scoreCard.
    */
    actionsCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 13,
        overflow: "hidden",
    },

    /*
    marginTop: "auto" uses the remaining screen space and pushes
    the Save Changes button toward the bottom, matching the Figma.

    We still leave some space underneath so the button does not
    sit directly against the bottom of the screen.
*/
    saveButton: {
        marginTop: "auto",
        paddingHorizontal: 22,
        paddingBottom: 12,
    },
});