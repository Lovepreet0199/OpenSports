import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function DisputeResolvedScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeArea}>
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

                <Pressable
                    style={styles.backButton}
                    onPress={() => router.replace("/organizer/session")}
                >
                    <Text style={styles.backButtonText}>
                        Back to session
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView >
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
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#D1EAD4",
        justifyContent: "center",
        alignItems: "center",
    },
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
});