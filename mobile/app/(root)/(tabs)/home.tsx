import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface SensorData {
  id: number;
  humidity: number;
  temperature: number;
  light: number;
  motion: boolean;
}

export default function Home() {
  const router = useRouter();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/sensors");
      const data = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch sensor data");
      console.error(err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#F8F9FE"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => setMenuOpen(true)}
            style={styles.menuButton}
          >
            <BlurView intensity={80} tint="light" style={styles.iconBlur}>
              <Ionicons name="menu" size={24} color="#6741D9" />
            </BlurView>
          </TouchableOpacity>
          <Text style={styles.logo}>Haven</Text>
          <TouchableOpacity style={styles.profileButton}>
            <BlurView intensity={80} tint="light" style={styles.iconBlur}>
              <Ionicons name="person" size={20} color="#6741D9" />
            </BlurView>
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back, Alex</Text>
          <Text style={styles.title}>Home Dashboard</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6741D9"
          />
        }
      >
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.overview}>
              <LinearGradient
                colors={["#6741D9", "#8465DC"]}
                style={styles.overviewCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.overviewHeader}>
                  <Text style={styles.overviewTitle}>Home Status</Text>
                  <TouchableOpacity style={styles.moreButton}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.overviewContent}>
                  <View style={styles.statusItem}>
                    <View
                      style={[styles.statusDot, { backgroundColor: "#4ECDC4" }]}
                    />
                    <Text style={styles.statusText}>
                      All systems running smoothly
                    </Text>
                  </View>
                  <Text style={styles.lastUpdate}>Updated just now</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.grid}>
              <View style={styles.card}>
                <LinearGradient
                  colors={["#FF6B6B", "#FF8787"]}
                  style={styles.cardIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="thermometer-outline" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.cardTitle}>Temperature</Text>
                <Text style={styles.cardValue}>
                  {sensorData?.temperature ?? "--"}°C
                </Text>
                <Text style={styles.cardTrend}>+1.2° from yesterday</Text>
              </View>

              <View style={styles.card}>
                <LinearGradient
                  colors={["#4ECDC4", "#45B7AF"]}
                  style={styles.cardIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="water-outline" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.cardTitle}>Humidity</Text>
                <Text style={styles.cardValue}>
                  {sensorData
                    ? `${(sensorData.humidity * 100).toFixed(0)}%`
                    : "--"}
                </Text>
                <Text style={styles.cardTrend}>Optimal range</Text>
              </View>

              <View style={styles.card}>
                <LinearGradient
                  colors={["#FFD93D", "#FFB302"]}
                  style={styles.cardIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="sunny-outline" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.cardTitle}>Light</Text>
                <Text style={styles.cardValue}>
                  {sensorData
                    ? `${(sensorData.light * 100).toFixed(0)}%`
                    : "--"}
                </Text>
                <Text style={styles.cardTrend}>Natural light</Text>
              </View>

              <View style={styles.card}>
                <LinearGradient
                  colors={["#6C5CE7", "#5849BE"]}
                  style={styles.cardIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="walk-outline" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.cardTitle}>Motion</Text>
                <Text style={styles.cardValue}>
                  {sensorData?.motion ? "Active" : "Clear"}
                </Text>
                <Text style={styles.cardTrend}>Living room</Text>
              </View>
            </View>

            <View style={styles.quickActions}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity>
                  <LinearGradient
                    colors={["#FF6B6B", "#FF8787"]}
                    style={styles.actionButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="power" size={24} color="#fff" />
                    <Text style={styles.actionText}>All Off</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                  <LinearGradient
                    colors={["#4ECDC4", "#45B7AF"]}
                    style={styles.actionButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="shield-checkmark" size={24} color="#fff" />
                    <Text style={styles.actionText}>Away Mode</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                  <LinearGradient
                    colors={["#FFD93D", "#FFB302"]}
                    style={styles.actionButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="notifications" size={24} color="#fff" />
                    <Text style={styles.actionText}>Alerts</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuButton: {
    width: 44,
    height: 44,
  },
  iconBlur: {
    flex: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  profileButton: {
    width: 44,
    height: 44,
  },
  headerContent: {
    marginTop: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  overview: {
    marginBottom: 24,
  },
  overviewCard: {
    borderRadius: 24,
    padding: 24,
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  overviewContent: {
    gap: 8,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 16,
    color: "#fff",
  },
  lastUpdate: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  card: {
    width: "47%",
    aspectRatio: 1,
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
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 8,
  },
  cardTrend: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    height: 100,
    width: 100,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#FEE2E2",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#DC2626",
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});
