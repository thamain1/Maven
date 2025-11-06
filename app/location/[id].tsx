import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Clock,
  Navigation as NavigationIcon,
  Wifi,
  Zap,
  Shield,
  Accessibility,
  DollarSign,
  Home
} from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { mockLocations } from '../../data/mockData';

export default function LocationDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const location = mockLocations.find(loc => loc.id === params.id) || mockLocations[0];

  const amenities = [
    { icon: Wifi, label: 'WiFi', available: location.amenities.wifi },
    { icon: Zap, label: 'EV Charging', available: location.amenities.evCharging },
    { icon: Shield, label: 'Security', available: location.amenities.security },
    { icon: Accessibility, label: 'Accessible', available: location.amenities.accessible },
    { icon: Home, label: 'Covered', available: location.amenities.covered },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.imageContent}>
          <MapPin size={48} color={theme.colors.white} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.availabilityBadge}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>Available Now</Text>
          </View>

          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.locationAddress}>{`${location.address}, ${location.city}, ${location.state}`}</Text>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Star size={16} color={theme.colors.accent} fill={theme.colors.accent} />
              <Text style={styles.ratingText}>{location.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({location.reviews} reviews)</Text>
            <Text style={styles.separator}>•</Text>
            <NavigationIcon size={14} color={theme.colors.textLight} />
            <Text style={styles.distanceText}>{location.distance}</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{location.availableSpaces}/{location.totalSpaces}</Text>
            <Text style={styles.statLabel}>Spaces Available</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${location.rate}/hr</Text>
            <Text style={styles.statLabel}>Hourly Rate</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{location.hours.includes('24/7') ? '24/7' : 'Limited'}</Text>
            <Text style={styles.statLabel}>Hours</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return amenity.available ? (
                <View key={index} style={styles.amenityItem}>
                  <View style={styles.amenityIcon}>
                    <Icon size={20} color={theme.colors.text} />
                  </View>
                  <Text style={styles.amenityLabel}>{amenity.label}</Text>
                </View>
              ) : null;
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Secure parking facility in the heart of downtown. Easy access to major business
            districts and public transportation. Features include 24/7 security monitoring,
            covered parking, and EV charging stations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours of Operation</Text>
          <View style={styles.hoursCard}>
            <Clock size={20} color={theme.colors.success} />
            <Text style={styles.hoursText}>{location.hours}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.directionsButton}>
          <NavigationIcon size={20} color={theme.colors.primary} />
          <Text style={styles.directionsButtonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.parkButton}>
          <Text style={styles.parkButtonText}>Park Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageHeader: {
    height: 240,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  headerSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.success,
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.white,
    marginRight: theme.spacing.sm,
  },
  availabilityText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  locationName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  locationAddress: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundDark,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    gap: 4,
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  reviewsText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  separator: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  distanceText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  statValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  section: {
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  amenityItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  amenityIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  description: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textLight,
    lineHeight: 24,
  },
  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundDark,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  hoursText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
    ...theme.shadows.lg,
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    gap: theme.spacing.sm,
  },
  directionsButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
  },
  parkButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parkButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
});