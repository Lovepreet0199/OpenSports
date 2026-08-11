import { Pressable, StyleSheet, Text, View } from "react-native";

type DecisionButtonProps = {
    title: string;
    onPress: () => void;
    variant: "accept" | "reject" | "goToCourt";
}

export default function DecisionButton({
    title,
    onPress,
    variant
}: DecisionButtonProps) {

    const getButtonStyle = () => {
        if (variant === "accept") {
            return styles.acceptButton;
        }

        if (variant === "reject") {
            return styles.rejectButton;
        }

        if (variant === "goToCourt") {
            return styles.goToCourtButton;
        }
    }

    return (
        <Pressable
            style={[styles.button, getButtonStyle()]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 55,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
    },

    acceptButton: {
        backgroundColor: "#2E903B",
    },

    rejectButton: {
        backgroundColor: "#F78D2C",

    },

    goToCourtButton: {
        backgroundColor: "#2E903B",

    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});