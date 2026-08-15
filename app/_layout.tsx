import { Stack } from "expo-router";
import {
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

export default function OrganizerLayout() {
  const { width, height } = useWindowDimensions();

  if (Platform.OS === "web") {
    const horizontalSpace = 40;
    const verticalSpace = 80;

    const scaleX = (width - horizontalSpace) / 393;
    const scaleY = (height - verticalSpace) / 852;

    const scale = Math.min(scaleX, scaleY, 1);

    return (
      <View style={styles.webPage}>
        <View
          style={[
            styles.phoneFrame,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mobileFrame}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  phoneFrame: {
    width: 393,
    height: 852,
    backgroundColor: "#F9FAFB",
    borderRadius: 40,
    overflow: "hidden",

    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  mobileFrame: {
    flex: 1,
    width: "100%",
  },
});