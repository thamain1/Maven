import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { Clock, MapPin, Calendar, DollarSign, X, Plus } from 'lucide-react-native';
import { theme } from '../../constants/theme';

const mockSession = {
  id: '1',
  locationName: 'Downtown Business Center',
  address: '500 Main St, Houston, TX 77002',
  startTime: '2:30 PM',
  duration: '1h 24m',
  currentCost: 4.20,
  vehiclePlate: 'ABC-1234',
  hourlyRate: 3.00,
};

const extensionOptions = [
  { duration: 30, label: '30 minutes', price: 1.50 },
  { duration: 60, label: '1 hour', price: 3.00 },
  { duration: 120, label: '2 hours', price: 6.00 },
  { duration: 180, label: '3 hours', price: 9.00 },
];

export default function SessionsScreen() {
  const hasActiveSession = true;
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState<number | null>(null);

  const handleExtendSession = () => {
    if (selectedExtension !== null) {
      const option = extensionOptions[selectedExtension];
      Alert.alert(
        'Extend Session',
        `Extend your parking by ${option.label} for $${option.price.toFixed(2)}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: () => {
              setShowExtendModal(false);
              setSelectedExtension(null);
              Alert.alert('Success', `Your session has been extended by ${option.label}!`);
            },
          },
        ]
      );
    }
  };

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
              <TouchableOpacity
                style={styles.extendButton}
                onPress={() => setShowExtendModal(true)}
                activeOpacity={0.7}>
                <Text style={styles.extendButtonText}>Extend Time</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.endButton} activeOpacity={0.7}>
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

      <Modal
        visible={showExtendModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowExtendModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Extend Parking Time</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setShowExtendModal(false);
                setSelectedExtension(null);
              }}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.currentSessionInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Current Session</Text>
                <Text style={styles.infoValue}>{mockSession.locationName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Current Duration</Text>
                <Text style={styles.infoValue}>{mockSession.duration}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Current Cost</Text>
                <Text style={styles.infoValue}>${mockSession.currentCost.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.extensionOptionsContainer}>
              <Text style={styles.optionsTitle}>Select Extension</Text>
              {extensionOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.extensionOption,
                    selectedExtension === index && styles.extensionOptionSelected,
                  ]}
                  onPress={() => setSelectedExtension(index)}
                  activeOpacity={0.7}>
                  <View style={styles.extensionOptionLeft}>
                    <View style={[
                      styles.radioButton,
                      selectedExtension === index && styles.radioButtonSelected,
                    ]}>
                      {selectedExtension === index && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <View style={styles.extensionOptionInfo}>
                      <Text style={[
                        styles.extensionOptionLabel,
                        selectedExtension === index && styles.extensionOptionLabelSelected,
                      ]}>
                        {option.label}
                      </Text>
                      <View style={styles.extensionPriceRow}>
                        <Plus size={12} color={theme.colors.textLight} />
                        <Text style={styles.extensionPrice}>${option.price.toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                  {selectedExtension === index && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>Selected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {selectedExtension !== null && (
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Current Cost</Text>
                  <Text style={styles.summaryValue}>${mockSession.currentCost.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Extension Cost</Text>
                  <Text style={styles.summaryValue}>
                    +${extensionOptions[selectedExtension].price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryTotalLabel}>New Total</Text>
                  <Text style={styles.summaryTotalValue}>
                    ${(mockSession.currentCost + extensionOptions[selectedExtension].price).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.confirmExtendButton,
                selectedExtension === null && styles.confirmExtendButtonDisabled,
              ]}
              onPress={handleExtendSession}
              disabled={selectedExtension === null}
              activeOpacity={0.8}>
              <Clock size={20} color={theme.colors.white} />
              <Text style={styles.confirmExtendButtonText}>
                {selectedExtension !== null
                  ? `Extend by ${extensionOptions[selectedExtension].label}`
                  : 'Select an option'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  modalCloseButton: {
    padding: theme.spacing.xs,
  },
  modalContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  currentSessionInfo: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  infoValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  extensionOptionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  optionsTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  extensionOption: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  extensionOptionSelected: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.backgroundDark,
  },
  extensionOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  radioButtonSelected: {
    borderColor: theme.colors.accent,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.accent,
  },
  extensionOptionInfo: {
    flex: 1,
  },
  extensionOptionLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  extensionOptionLabelSelected: {
    color: theme.colors.primary,
  },
  extensionPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  extensionPrice: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  selectedBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  selectedBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  summaryTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  summaryValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  summaryTotalValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.accent,
  },
  modalFooter: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  confirmExtendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  confirmExtendButtonDisabled: {
    opacity: 0.5,
  },
  confirmExtendButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
});