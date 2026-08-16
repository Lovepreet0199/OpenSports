import AppHeader from "@/components/shared/AppHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import ScoreControl from "@/components/organizer/ScoreControl";
import AppButton from "@/components/shared/AppButton";

export default function RecordOutcomeScreen() {
    const router = useRouter();

    /*
        The court information is passed from the dispute screen.
        This lets the organizer record the final result for the
        contested match.
    */
    const {
        courtNumber,
        teamOne,
        teamTwo,
        teamOneScore,
        teamTwoScore,
    } = useLocalSearchParams();

    /*
        We keep the final scores in state because the organizer
        can change them before confirming the outcome.
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

                <AppHeader
                    title="Record outcome"
                    onBack={() => router.back()}
                />

                <Text style={styles.sectionTitle}>
                    Court {courtNumber} - set the final score
                </Text>
                {/*
    We reuse the ScoreControl component from Manage Court.

    These scores start with the currently recorded score, but the
    organizer can change them after speaking with both teams.
*/}
                <View style={styles.scoreCard}>

                    <View style={styles.teamRow}>
                        <Text style={styles.teamName}>
                            {String(teamOne)}
                        </Text>

                        <ScoreControl
                            score={scoreOne}
                            onDecrease={() => {
                                if (scoreOne > 0) {
                                    setScoreOne(scoreOne - 1);
                                }
                            }}
                            onIncrease={() => {
                                if (scoreOne < 11) {
                                    setScoreOne(scoreOne + 1);
                                }
                            }}
                        />
                    </View>

                    <View style={styles.divider} />

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
                                if (scoreTwo < 11) {
                                    setScoreTwo(scoreTwo + 1);
                                }
                            }}
                        />
                    </View>

                </View>

                {/*
                    The organizer can optionally add a note explaining
                    why this final score was chosen.
                */}
                <View style={styles.noteSection}>
                    <Text style={styles.noteTitle}>
                        Add note
                    </Text>

                    <TextInput
                        style={styles.noteInput}
                        placeholder="Add a note about this decision"
                        placeholderTextColor="#99A1AF"
                    />
                </View>

                {/*
                    This button confirms the organizer's final ruling.

                    We pass the selected court and the final scores to the
                    resolved screen so the Session screen can update that court.
                */}
                <View style={styles.confirmButton}>
                    <AppButton
                        title="Confirm final score"
                        variant="primary"
                        onPress={() =>
                            router.push({
                                pathname: "/organizer/dispute-resolved",
                                params: {
                                    courtNumber: courtNumber,
                                    decision: "manual",
                                    teamOneScore: scoreOne,
                                    teamTwoScore: scoreTwo,
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
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    container: {
        flex: 1,
        paddingHorizontal: 15,
    },

    sectionTitle: {
        marginTop: 12,
        marginBottom: 10,
        fontSize: 17,
        fontWeight: "600",
        color: "#9099B0",
    },
    scoreCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 13,
        overflow: "hidden",
    },

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

    divider: {
        height: 1,
        backgroundColor: "#E1ECF1",
    },
    noteSection: {
        marginTop: 24,
    },

    noteTitle: {
        marginBottom: 8,
        fontSize: 17,
        fontWeight: "600",
        color: "#9099B0",
    },

    noteInput: {
        width: "100%",
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 13,
        fontSize: 16,
        color: "#1E2939",
    },

    /*
    marginTop: "auto" pushes the confirmation button toward
    the bottom of the screen while keeping the rest of the
    Record Outcome content near the top.
*/
    confirmButton: {
        marginTop: "auto",
        paddingHorizontal: 22,
        paddingBottom: 12,
    },
});