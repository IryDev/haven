import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop",
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.95)"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <View style={styles.topBar}>
          <BlurView intensity={80} tint="light" style={styles.logoContainer}>
            <Text style={styles.logo}>Haven</Text>
          </BlurView>
          <TouchableOpacity style={styles.helpButton}>
            <BlurView intensity={80} tint="light" style={styles.iconBlur}>
              <Ionicons name="help-circle-outline" size={24} color="#6741D9" />
            </BlurView>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome to{"\n"}Your Smart Home</Text>
          <Text style={styles.subtitle}>
            Experience the future of comfort and control
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <LinearGradient
                colors={["#FF6B6B", "#FF8787"]}
                style={styles.featureIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="thermometer-outline" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.featureTitle}>Temp Control</Text>
              <Text style={styles.featureDescription}>
                Perfect temperature.
              </Text>
            </View>
            <View style={styles.feature}>
              <LinearGradient
                colors={["#4ECDC4", "#45B7AF"]}
                style={styles.featureIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="sunny-outline" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.featureTitle}>Smart Lighting</Text>
              <Text style={styles.featureDescription}>
                Set the perfect mood
              </Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <LinearGradient
                colors={["#FFD93D", "#FFB302"]}
                style={styles.featureIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color="#fff"
                />
              </LinearGradient>
              <Text style={styles.featureTitle}>Security</Text>
              <Text style={styles.featureDescription}>Peace of mind, 24/7</Text>
            </View>
            <View style={styles.feature}>
              <LinearGradient
                colors={["#6C5CE7", "#5849BE"]}
                style={styles.featureIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="analytics-outline" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.featureTitle}>Analytics</Text>
              <Text style={styles.featureDescription}>
                Smart insights daily
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home")}
          >
            <LinearGradient
              colors={["#6741D9", "#8465DC"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <BlurView
              intensity={80}
              tint="light"
              style={styles.secondaryButtonContent}
            >
              <Text style={styles.secondaryButtonText}>Learn More</Text>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#6741D9"
              />
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 48,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 50 : 30,
  },
  logoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "none",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6741D9",
  },
  helpButton: {
    width: 44,
    height: 44,
  },
  iconBlur: {
    flex: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  header: {
    marginTop: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    lineHeight: 24,
  },
  featuresContainer: {
    marginTop: 48,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  feature: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  bottomContent: {
    marginTop: "auto",
    gap: 16,
  },
  button: {
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#6741D9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  secondaryButton: {
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  secondaryButtonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6741D9",
  },
});
