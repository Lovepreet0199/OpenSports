import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

/*
    Both actions on the Manage Court screen use the same row layout.

    Making this reusable means we only need to provide the title
    and what should happen when the organizer presses the row.
*/
type CourtActionRowProps = {
    title: string;
    onPress: () => void;
};

export default function CourtActionRow({
    title,
    onPress,
}: CourtActionRowProps) {
    return (
        <Pressable
            style={styles.actionRow}
            onPress={onPress}
        >
            <Text style={styles.actionText}>
                {title}
            </Text>

            {/*
                The arrow shows that pressing this row will take
                the organizer to another action or screen.
            */}
            <Ionicons
                name="chevron-forward"
                size={20}
                color="#47526C"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    /*
        space-between keeps the action title on the left
        and the navigation arrow on the right.
    */
    actionRow: {
        minHeight: 62,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },

    actionText: {
        fontSize: 17,
        fontWeight: "500",
        color: "#1E293B",
    },
});