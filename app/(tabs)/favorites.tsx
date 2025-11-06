import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, MapPin, Navigation, DollarSign } from 'lucide-react-native';
import { theme } from '../../constants/theme';

const mockFavorites = [
  {
    id: '1',
    name: 'Downtown Business Center',
    address: '500 Main St, Houston, TX 77002',
    distance: '0.3 miles',
    rate: 3.00,
  },
  {
    id: '2',
    name: 'Riverside Plaza',
    address: '888 Westheimer Rd, Houston, TX 77006',
    distance: '0.8 miles',
    rate: 4.50,
  },
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>Your saved parking locations</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockFavorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={48} color={theme.colors.textMuted} />
            <Text style={styles.emptyStateText}>No favorites yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Save your frequently used parking locations for quick access
            </Text>
          </View>
        ) : (
          mockFavorites.map((location) => (
            <TouchableOpacity key={location.id} style={styles.favoriteCard} activeOpacity={0.7}>
              <View style={styles.favoriteIcon}>
                <MapPin size={24} color={theme.colors.white} />
              </View>
              <View style={styles.favoriteInfo}>
                <View style={styles.favoriteHeader}>
                  <Text style={styles.favoriteName}>{location.name}</Text>
                  <TouchableOpacity style={styles.heartButton}>
                    <Heart size={20} color={theme.colors.error} fill={theme.colors.error} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.favoriteAddress}>{location.address}</Text>
                <View style={styles.favoriteMeta}>
                  <View style={styles.metaItem}>
                    <Navigation size={14} color={theme.colors.textLight} />
                    <Text style={styles.metaText}>{location.distance}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <DollarSign size={14} color={theme.colors.textLight} />
                    <Text style={styles.metaText}>${location.rate}/hr</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyStateText: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
    overflow: 'hidden',
  },
  favoriteIcon: {
    width: 80,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteInfo: {
    flex: 1,
    padding: theme.spacing.md,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  favoriteName: {
    flex: 1,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  heartButton: {
    padding: theme.spacing.xs,
  },
  favoriteAddress: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  favoriteMeta: {
    flexDirection: 'row',
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
});