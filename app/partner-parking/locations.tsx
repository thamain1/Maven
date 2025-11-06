import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { MapPin, DollarSign, Navigation, Grid3x3, CheckCircle2, ArrowRight, X } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockLocations } from '../../data/mockData';

export default function LocationsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const numSpaces = Number(params.numSpaces) || 2;
  const layoutPreference = params.layoutPreference as string || 'side-by-side';
  const participants = params.participants ? JSON.parse(params.participants as string) : [];

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showLotLayout, setShowLotLayout] = useState(false);
  const [viewingLocationId, setViewingLocationId] = useState<string | null>(null);

  const eligibleLocations = mockLocations.filter(
    loc => loc.availableSpaces >= numSpaces
  );

  const handleViewLayout = (locationId: string) => {
    setViewingLocationId(locationId);
    setShowLotLayout(true);
  };

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleContinue = () => {
    if (selectedLocation) {
      router.push({
        pathname: '/partner-parking/confirmation',
        params: {
          numSpaces,
          layoutPreference,
          participants: JSON.stringify(participants),
          locationId: selectedLocation,
        },
      } as any);
    }
  };

  const renderLotLayout = () => {
    const location = mockLocations.find(loc => loc.id === viewingLocationId);
    if (!location) return null;

    const rows = ['A', 'B', 'C', 'D', 'E'];
    const spacesPerRow = 8;

    return (
      <Modal
        visible={showLotLayout}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLotLayout(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>{location.name}</Text>
              <Text style={styles.modalSubtitle}>Lot Layout Preview</Text>
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowLotLayout(false)}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.layoutLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.spaceAvailable]} />
                <Text style={styles.legendText}>Available</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.spaceGroupSelected]} />
                <Text style={styles.legendText}>Your Group</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.spaceOccupied]} />
                <Text style={styles.legendText}>Occupied</Text>
              </View>
            </View>

            <View style={styles.lotContainer}>
              <Text style={styles.lotLabel}>← Entrance</Text>

              {rows.map((row, rowIndex) => (
                <View key={row} style={styles.lotRow}>
                  <Text style={styles.rowLabel}>{row}</Text>
                  <View style={styles.lotSpaces}>
                    {Array.from({ length: spacesPerRow }).map((_, spaceIndex) => {
                      const isGroupSpace = rowIndex === 1 && spaceIndex >= 2 && spaceIndex < 2 + numSpaces;
                      const isOccupied = Math.random() > 0.6 && !isGroupSpace;

                      return (
                        <View
                          key={spaceIndex}
                          style={[
                            styles.parkingSpace,
                            isGroupSpace && styles.spaceGroupSelected,
                            isOccupied && !isGroupSpace && styles.spaceOccupied,
                            !isGroupSpace && !isOccupied && styles.spaceAvailable,
                          ]}>
                          <Text style={[
                            styles.spaceNumber,
                            isGroupSpace && styles.spaceNumberSelected,
                          ]}>
                            {spaceIndex + 1}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}

              <Text style={styles.lotLabel}>Exit →</Text>
            </View>

            <View style={styles.layoutInfo}>
              <View style={styles.layoutInfoRow}>
                <Text style={styles.layoutInfoLabel}>Your Spaces:</Text>
                <Text style={styles.layoutInfoValue}>Row B, Spaces 3-{2 + numSpaces}</Text>
              </View>
              <View style={styles.layoutInfoRow}>
                <Text style={styles.layoutInfoLabel}>Layout:</Text>
                <Text style={styles.layoutInfoValue}>{layoutPreference}</Text>
              </View>
              <View style={styles.layoutInfoRow}>
                <Text style={styles.layoutInfoLabel}>Total Spaces:</Text>
                <Text style={styles.layoutInfoValue}>{numSpaces} adjacent</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.modalSelectButton}
              onPress={() => {
                handleSelectLocation(location.id);
                setShowLotLayout(false);
              }}
              activeOpacity={0.8}>
              <CheckCircle2 size={20} color={theme.colors.white} />
              <Text style={styles.modalSelectButtonText}>Select This Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Locations</Text>
        <Text style={styles.headerSubtitle}>
          {eligibleLocations.length} locations can fit your group
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressIndicator}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotCompleted]} />
            <Text style={styles.progressLabel}>Spaces</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotCompleted]} />
            <Text style={styles.progressLabel}>Participants</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <Text style={[styles.progressLabel, styles.progressLabelActive]}>Location</Text>
          </View>
        </View>

        <View style={styles.filterBar}>
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>{numSpaces} spaces</Text>
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>{layoutPreference}</Text>
          </View>
        </View>

        <View style={styles.section}>
          {eligibleLocations.map((location) => (
            <View key={location.id} style={styles.locationCard}>
              <View style={styles.locationImagePlaceholder}>
                <MapPin size={32} color={theme.colors.white} />
              </View>

              <View style={styles.locationContent}>
                <View style={styles.locationHeader}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  {selectedLocation === location.id && (
                    <View style={styles.selectedBadge}>
                      <CheckCircle2 size={16} color={theme.colors.success} />
                    </View>
                  )}
                </View>

                <Text style={styles.locationAddress}>
                  {location.address}, {location.city}, {location.state}
                </Text>

                <View style={styles.locationMeta}>
                  <View style={styles.metaItem}>
                    <Navigation size={14} color={theme.colors.textLight} />
                    <Text style={styles.metaText}>{location.distance}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <DollarSign size={14} color={theme.colors.textLight} />
                    <Text style={styles.metaText}>${location.rate}/hr</Text>
                  </View>
                </View>

                <View style={styles.groupSpaceBadge}>
                  <CheckCircle2 size={16} color={theme.colors.success} />
                  <Text style={styles.groupSpaceBadgeText}>
                    Can accommodate {numSpaces} adjacent spaces
                  </Text>
                </View>

                <View style={styles.locationActions}>
                  <TouchableOpacity
                    style={styles.viewLayoutButton}
                    onPress={() => handleViewLayout(location.id)}
                    activeOpacity={0.7}>
                    <Grid3x3 size={16} color={theme.colors.accent} />
                    <Text style={styles.viewLayoutButtonText}>View Lot Layout</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.selectButton,
                      selectedLocation === location.id && styles.selectButtonSelected,
                    ]}
                    onPress={() => handleSelectLocation(location.id)}
                    activeOpacity={0.7}>
                    <Text style={[
                      styles.selectButtonText,
                      selectedLocation === location.id && styles.selectButtonTextSelected,
                    ]}>
                      {selectedLocation === location.id ? 'Selected' : 'Select'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {eligibleLocations.length === 0 && (
            <View style={styles.emptyState}>
              <MapPin size={48} color={theme.colors.textMuted} />
              <Text style={styles.emptyStateTitle}>No Available Locations</Text>
              <Text style={styles.emptyStateText}>
                There are no parking locations that can accommodate {numSpaces} adjacent spaces at this time.
                Try reducing the number of spaces or adjusting your layout preference.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {selectedLocation && (
        <View style={styles.footer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Selected location:</Text>
            <Text style={styles.summaryValue}>
              {mockLocations.find(loc => loc.id === selectedLocation)?.name}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Review & Confirm</Text>
            <ArrowRight size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      )}

      {renderLotLayout()}
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
  },
  backButton: {
    marginBottom: theme.spacing.sm,
  },
  backText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.medium,
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
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.xs,
  },
  progressDotActive: {
    backgroundColor: theme.colors.accent,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  progressDotCompleted: {
    backgroundColor: theme.colors.success,
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.sm,
    marginBottom: 18,
  },
  progressLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  progressLabelActive: {
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  filterBar: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    backgroundColor: theme.colors.backgroundDark,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  filterChipText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  locationImagePlaceholder: {
    width: 100,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContent: {
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
  selectedBadge: {
    marginLeft: theme.spacing.sm,
  },
  locationAddress: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  locationMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
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
  groupSpaceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundDark,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  groupSpaceBadgeText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.success,
    fontWeight: theme.fontWeight.medium,
    flex: 1,
  },
  locationActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  viewLayoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundDark,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  viewLayoutButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.accent,
  },
  selectButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  selectButtonSelected: {
    backgroundColor: theme.colors.success,
  },
  selectButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  selectButtonTextSelected: {
    color: theme.colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  emptyStateTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  summaryLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  summaryValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
    flex: 1,
    textAlign: 'right',
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  continueButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  modalCloseButton: {
    padding: theme.spacing.xs,
  },
  modalContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  layoutLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  spaceAvailable: {
    backgroundColor: theme.colors.backgroundDark,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  spaceGroupSelected: {
    backgroundColor: theme.colors.accent,
  },
  spaceOccupied: {
    backgroundColor: theme.colors.textMuted,
  },
  lotContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  lotLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
    marginVertical: theme.spacing.sm,
  },
  lotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  rowLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    width: 30,
  },
  lotSpaces: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  parkingSpace: {
    flex: 1,
    aspectRatio: 0.8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  spaceNumber: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  spaceNumberSelected: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
  },
  layoutInfo: {
    backgroundColor: theme.colors.backgroundDark,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
  },
  layoutInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  layoutInfoLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  layoutInfoValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  modalFooter: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  modalSelectButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  modalSelectButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
});
