import { Pressable, StyleSheet, Text } from "react-native";

type AppButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
};

export default function AppButton({
    title,
    onPress,
    variant = "primary",
}: AppButtonProps) {

    const isPrimary = variant === "primary";

    return (

        <Pressable
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
            ]}
            onPress={onPress}>
            <Text
                style={[
                    styles.buttonText,
                    isPrimary ? styles.primaryText : styles.secondaryText,
                ]}>
                {title}
            </Text>
        </Pressable>

    );

}

const styles = StyleSheet.create({
    button: {
        minHeight: 60,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    primaryButton: {
        backgroundColor: "#2E903B",
    },

    secondaryButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E2E2",
    },

    buttonText: {
        fontSize: 18,
        fontWeight: "700",
    },

    primaryText: {
        color: "#FFFFFF",
    },

    secondaryText: {
        color: "#111111",
    },
});
