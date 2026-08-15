import { Pressable, StyleSheet, Text, View } from "react-native";

type DecisionButtonProps = {
    title: string;
    description: string;
    teamOneScore: number;
    teamTwoScore: number;
    onPress: () => void;
    variant: "accept" | "reject" | "goToCourt";
};

export default function DecisionButton({
    title,
    description,
    teamOneScore,
    teamTwoScore,
    onPress,
    variant,
}: DecisionButtonProps) {

    const getButtonStyle = () => {
        if (variant === "accept") {
            return styles.acceptButton;
        }

        if (variant === "reject") {
            return styles.rejectButton;
        }

        return styles.goToCourtButton;
    };

    const getTitleStyle = () => {
        if (variant === "accept") {
            return styles.acceptText;
        }

        if (variant === "reject") {
            return styles.rejectText;
        }

        return styles.goToCourtText;
    };

    return (
        <Pressable
            style={[styles.button, getButtonStyle()]}
            onPress={onPress}
        >
            <View>
                <Text style={[styles.buttonTitle, getTitleStyle()]}>
                    {title}
                </Text>


                <Text style={styles.descriptionText}>
                    {description} {teamOneScore} - {teamTwoScore}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 71,
        borderRadius: 13,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    acceptButton: {
        backgroundColor: "#E8F5EA",
        borderColor: "#C4E1C8",
    },

    rejectButton: {
        backgroundColor: "#FCF2F2",
        borderColor: "#FFD1CF",
    },

    goToCourtButton: {
        backgroundColor: "#E8F5EA",
        borderColor: "#C4E1C8",
    },
    acceptText: {
        color: "#21652A",
    },

    rejectText: {
        color: "#B42318",
    },

    goToCourtText: {
        color: "#21652A",
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },

    descriptionText: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "600",
        color: "#47526C",
        textAlign: "center",
    },
});