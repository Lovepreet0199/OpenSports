import AppHeader from "@/components/shared/AppHeader";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourtCard from "@/components/organizer/CourtCard";
import { useRouter } from "expo-router";

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
                    <Text style={styles.activeRole}>Admin</Text>
                    <Text style={styles.inactiveRole}>Player</Text>
                </View>

                <Text style={styles.roundTitle}>Round 1</Text>

                <View style={styles.courts}>
                    <CourtCard
                        courtNumber={1}
                        status="In progress"
                        teamOne="Ana & Melissa"
                        teamTwo="Katy & John K."
                        teamOneScore={10}
                        teamTwoScore={8}
                        actionTitle="Manage court"
                        onPress={() => { }}
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
                        onPress={() => router.push("/organizer/dispute")}
                    />

                    <CourtCard
                        courtNumber={3}
                        status="In progress"
                        teamOne="Omar & Sarah"
                        teamTwo="Sophia & David"
                        teamOneScore={4}
                        teamTwoScore={7}
                        actionTitle="Manage court"
                        onPress={() => { }}
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
        fontWeight: "500",
        color: "#1b284798",
    },

    courts: {
        gap: 14,
    },
});