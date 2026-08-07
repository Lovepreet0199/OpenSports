import TeamRow from "@/components/organizer/TeamRow";
import { StyleSheet, View } from "react-native";

type ScoreSummaryCardProps = {
    teamOne: string;
    teamTwo: string;
    teamOneScore: number;
    teamTwoScore: number;
};

export default function ScoreSummaryCard({
    teamOne,
    teamTwo,
    teamOneScore,
    teamTwoScore,
}: ScoreSummaryCardProps) {
    return (
        <View style={styles.card}>
            <TeamRow
                teamName={teamOne}
                score={teamOneScore}
            />

            <TeamRow
                teamName={teamTwo}
                score={teamTwoScore}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: 14,
    },
});