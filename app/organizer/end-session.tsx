import AppButton from "@/components/shared/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EndSessionScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/*
                    Ending the session affects both teams and closes
                    the current session, so we ask the organizer to
                    confirm before continuing.
                */}
                <View style={styles.warningSection}>

                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={40}
                            color="#EE3835"
                        />
                    </View>

                    <View style={styles.messageSection}>
                        <Text style={styles.title}>
                            Are you sure?
                        </Text>

                        <Text style={styles.message}>
                            Both teams will be notified.
                        </Text>
                    </View>

                    {/*
                        Go back cancels the action.

                        End session confirms it and moves to the
                        final Session Ended confirmation screen.
                    */}
                    <View style={styles.actions}>
                        <View style={styles.backButton}>
                            <AppButton
                                title="Go back"
                                variant="secondary"
                                onPress={() => router.back()}
                            />
                        </View>

                        <View style={styles.endButton}>
                            <AppButton
                                title="End session"
                                variant="danger"
                                onPress={() =>
                                    router.replace("/organizer/session-ended")
                                }
                            />
                        </View>
                    </View>

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
        justifyContent: "center",
        alignItems: "center",
    },

    warningSection: {
        width: 275,
        alignItems: "center",
        gap: 24,
    },

    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FAE2E1",
        justifyContent: "center",
        alignItems: "center",
    },

    messageSection: {
        width: 270,
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

    actions: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 24,
    },

    backButton: {
        width: 110,
    },

    endButton: {
        width: 141,
    },
});