import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Star, Navigation, Users } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { mockLocations } from '../../data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Maven Park</Text>
        <Text style={styles.headerSubtitle}>Find your perfect parking spot</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Search size={20} color={theme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.partnerParkingBanner}
          onPress={() => router.push('/partner-parking')}
          activeOpacity={0.8}>
          <View style={styles.partnerParkingIconWrapper}>
            <Users size={28} color={theme.colors.accent} />
          </View>
          <View style={styles.partnerParkingContent}>
            <Text style={styles.partnerParkingTitle}>Partner Parking</Text>
            <Text style={styles.partnerParkingSubtitle}>Reserve multiple spaces for your group</Text>
          </View>
          <Navigation size={20} color={theme.colors.accent} style={{ transform: [{ rotate: '-90deg' }] }} />
        </TouchableOpacity>

        <View style={styles.mapPlaceholder}>
          <MapPin size={32} color={theme.colors.accent} />
          <Text style={styles.mapPlaceholderText}>Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>Showing nearby parking locations</Text>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>Nearby Parking</Text>
          <Text style={styles.listHeaderCount}>{mockLocations.length} locations</Text>
        </View>

        {mockLocations.slice(0, 5).map((location) => (
          <TouchableOpacity
            key={location.id}
            style={styles.locationCard}
            onPress={() => router.push(`/location/${location.id}` as any)}
            activeOpacity={0.7}>
            <View style={styles.locationImagePlaceholder}>
              <MapPin size={24} color={theme.colors.white} />
            </View>
            <View style={styles.locationInfo}>
              <View style={styles.locationHeader}>
                <Text style={styles.locationName}>{location.name}</Text>
                <View style={styles.ratingBadge}>
                  <Star size={12} color={theme.colors.accent} fill={theme.colors.accent} />
                  <Text style={styles.ratingText}>{location.rating}</Text>
                </View>
              </View>
              <Text style={styles.locationAddress}>{`${location.address}, ${location.city}, ${location.state}`}</Text>
              <View style={styles.locationMeta}>
                <View style={styles.metaItem}>
                  <Navigation size={14} color={theme.colors.textLight} />
                  <Text style={styles.metaText}>{location.distance}</Text>
                </View>
                <View style={styles.metaItem}>
                  <DollarSign size={14} color={theme.colors.textLight} />
                  <Text style={styles.metaText}>${location.rate}/hr</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={14} color={theme.colors.success} />
                  <Text style={[styles.metaText, styles.availableText]}>
                    {location.availableSpaces} spaces
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  partnerParkingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    ...theme.shadows.md,
  },
  partnerParkingIconWrapper: {
    width: 56,
    height: 56,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  partnerParkingContent: {
    flex: 1,
  },
  partnerParkingTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
    marginBottom: 4,
  },
  partnerParkingSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.medium,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: theme.colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  mapPlaceholderText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  mapPlaceholderSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  listHeaderTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  listHeaderCount: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    ...theme.shadows.md,
    overflow: 'hidden',
  },
  locationImagePlaceholder: {
    width: 100,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
    padding: theme.spacing.md,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  locationName: {
    flex: 1,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundDark,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  },
  ratingText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginLeft: 4,
  },
  locationAddress: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  locationMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  availableText: {
    color: theme.colors.success,
  },
});