import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

/*
    The score control is reusable because both teams need the
    same minus, score, and plus controls.

    Instead of creating the same UI twice inside Manage Court,
    we pass each team's score and functions into this component.
*/
type ScoreControlProps = {
    score: number;
    onDecrease: () => void;
    onIncrease: () => void;
};

export default function ScoreControl({
    score,
    onDecrease,
    onIncrease,
}: ScoreControlProps) {
    return (
        <View style={styles.container}>

            {/*
                The parent screen controls what happens to the score.
                This component only calls onDecrease when the organizer
                presses the minus button.
            */}
            <Pressable
                style={styles.decreaseButton}
                onPress={onDecrease}
            >
                <Ionicons
                    name="remove"
                    size={20}
                    color="#364153"
                />
            </Pressable>

            {/*
                The score is received as a prop so the same component
                can display either team's current score.
            */}
            <Text style={styles.score}>
                {score}
            </Text>

            {/*
                Like the decrease button, the actual score change stays
                in the Manage Court screen where the score state is stored.
            */}
            <Pressable
                style={styles.increaseButton}
                onPress={onIncrease}
            >
                <Ionicons
                    name="add"
                    size={20}
                    color="#FFFFFF"
                />
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    /*
        The three pieces are kept in one horizontal row to create
        the minus -> score -> plus layout from the Figma design.
    */
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },

    /*
        The controls use 44x44 touch areas to keep them easy
        to tap on a mobile device.
    */
    decreaseButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DC",
        borderRadius: 10,
    },

    /*
        A fixed width prevents the buttons from moving when the
        score changes from one digit to two digits.
    */
    score: {
        width: 42,
        fontSize: 24,
        fontWeight: "700",
        color: "#1E293B",
        textAlign: "center",
    },

    /*
        Green is used for increasing the score because it is the
        primary action style shown in the Manage Court Figma design.
    */
    increaseButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2E903B",
        borderRadius: 10,
    },
});