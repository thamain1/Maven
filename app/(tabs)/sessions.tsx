import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Calendar, DollarSign } from 'lucide-react-native';
import { theme } from '../../constants/theme';

const mockSession = {
  id: '1',
  locationName: 'Downtown Business Center',
  address: '500 Main St, Houston, TX 77002',
  startTime: '2:30 PM',
  duration: '1h 24m',
  currentCost: 4.20,
  vehiclePlate: 'ABC-1234',
};

export default function SessionsScreen() {
  const hasActiveSession = true;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sessions</Text>
        <Text style={styles.headerSubtitle}>Manage your parking sessions</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!hasActiveSession ? (
          <View style={styles.emptyState}>
            <Clock size={48} color={theme.colors.textMuted} />
            <Text style={styles.emptyStateText}>No active sessions</Text>
            <Text style={styles.emptyStateSubtext}>Start parking to see your session here</Text>
            <TouchableOpacity style={styles.findParkingButton}>
              <Text style={styles.findParkingButtonText}>Find Parking</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.activeSessionContainer}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active Session</Text>
            </View>

            <View style={styles.sessionCard}>
              <View style={styles.locationHeader}>
                <View style={styles.locationIcon}>
                  <MapPin size={24} color={theme.colors.white} />
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.locationName}>{mockSession.locationName}</Text>
                  <Text style={styles.locationAddress}>{mockSession.address}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.sessionDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.detailLabel}>
                    <Clock size={16} color={theme.colors.textLight} />
                    <Text style={styles.detailLabelText}>Start Time</Text>
                  </View>
                  <Text style={styles.detailValue}>{mockSession.startTime}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailLabel}>
                    <Calendar size={16} color={theme.colors.textLight} />
                    <Text style={styles.detailLabelText}>Duration</Text>
                  </View>
                  <Text style={styles.detailValue}>{mockSession.duration}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailLabel}>
                    <DollarSign size={16} color={theme.colors.textLight} />
                    <Text style={styles.detailLabelText}>Current Cost</Text>
                  </View>
                  <Text style={[styles.detailValue, styles.costValue]}>
                    ${mockSession.currentCost.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleLabel}>Vehicle</Text>
                <Text style={styles.vehiclePlate}>{mockSession.vehiclePlate}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.extendButton}>
                <Text style={styles.extendButtonText}>Extend Time</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.endButton}>
                <Text style={styles.endButtonText}>End Session</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.historySection}>
              <Text style={styles.historyTitle}>Recent Sessions</Text>
              <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyLocationName}>Riverside Plaza</Text>
                  <Text style={styles.historyDate}>Yesterday</Text>
                </View>
                <View style={styles.historyMeta}>
                  <Text style={styles.historyMetaText}>2h 15m</Text>
                  <Text style={styles.historyMetaText}>•</Text>
                  <Text style={styles.historyMetaText}>$10.12</Text>
                </View>
              </View>

              <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyLocationName}>Tech District Parking</Text>
                  <Text style={styles.historyDate}>2 days ago</Text>
                </View>
                <View style={styles.historyMeta}>
                  <Text style={styles.historyMetaText}>3h 45m</Text>
                  <Text style={styles.historyMetaText}>•</Text>
                  <Text style={styles.historyMetaText}>$9.38</Text>
                </View>
              </View>
            </View>
          </View>
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
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
    paddingHorizontal: theme.spacing.lg,
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
  },
  findParkingButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
  },
  findParkingButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  activeSessionContainer: {
    padding: theme.spacing.lg,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.success,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  sessionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  sessionDetails: {
    gap: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  detailLabelText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  detailValue: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  costValue: {
    color: theme.colors.success,
  },
  vehicleInfo: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  vehiclePlate: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  extendButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  extendButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
  },
  endButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  endButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  historySection: {
    marginTop: theme.spacing.xl,
  },
  historyTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  historyCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  historyLocationName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  historyDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
  historyMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  historyMetaText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
});