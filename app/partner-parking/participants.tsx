import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useState } from 'react';
import { UserPlus, X, ArrowRight, Mail, Phone, Car } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Participant {
  id: string;
  name: string;
  contact: string;
  vehicleId: string;
  notify: boolean;
}

export default function ParticipantsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const numSpaces = Number(params.numSpaces) || 2;
  const layoutPreference = params.layoutPreference as string || 'side-by-side';

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    contact: '',
    vehicleId: '',
    notify: true,
  });

  const handleAddParticipant = () => {
    if (newParticipant.name.trim()) {
      setParticipants([
        ...participants,
        {
          ...newParticipant,
          id: Date.now().toString(),
        },
      ]);
      setNewParticipant({
        name: '',
        contact: '',
        vehicleId: '',
        notify: true,
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleContinue = () => {
    router.push({
      pathname: '/partner-parking/locations',
      params: {
        numSpaces,
        layoutPreference,
        participants: JSON.stringify(participants),
      },
    } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Participants</Text>
        <Text style={styles.headerSubtitle}>
          Invite up to {numSpaces - 1} guests to join your parking group
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
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <Text style={[styles.progressLabel, styles.progressLabelActive]}>Participants</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressDot} />
            <Text style={styles.progressLabel}>Location</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Group ({participants.length + 1}/{numSpaces})</Text>
            <Text style={styles.sectionSubtitle}>
              You're reserving {numSpaces} spaces total
            </Text>
          </View>

          <View style={styles.hostCard}>
            <View style={styles.hostBadge}>
              <Text style={styles.hostBadgeText}>Host</Text>
            </View>
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>You (Organizer)</Text>
              <Text style={styles.participantDetail}>Primary reservation holder</Text>
            </View>
          </View>

          {participants.map((participant) => (
            <View key={participant.id} style={styles.participantCard}>
              <View style={styles.participantMain}>
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>{participant.name}</Text>
                  {participant.contact && (
                    <View style={styles.participantDetailRow}>
                      <Mail size={14} color={theme.colors.textLight} />
                      <Text style={styles.participantDetail}>{participant.contact}</Text>
                    </View>
                  )}
                  {participant.vehicleId && (
                    <View style={styles.participantDetailRow}>
                      <Car size={14} color={theme.colors.textLight} />
                      <Text style={styles.participantDetail}>{participant.vehicleId}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveParticipant(participant.id)}>
                  <X size={20} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
              {participant.notify && (
                <View style={styles.notifyBadge}>
                  <Text style={styles.notifyBadgeText}>Will be notified</Text>
                </View>
              )}
            </View>
          ))}

          {participants.length < numSpaces - 1 && !showAddForm && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(true)}
              activeOpacity={0.7}>
              <UserPlus size={20} color={theme.colors.accent} />
              <Text style={styles.addButtonText}>Add Participant</Text>
            </TouchableOpacity>
          )}

          {showAddForm && (
            <View style={styles.addForm}>
              <Text style={styles.formTitle}>New Participant</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={newParticipant.name}
                  onChangeText={(text) => setNewParticipant({ ...newParticipant, name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact (Optional)</Text>
                <View style={styles.inputWithIcon}>
                  <Phone size={16} color={theme.colors.textMuted} />
                  <TextInput
                    style={styles.inputWithIconText}
                    placeholder="Phone or email"
                    placeholderTextColor={theme.colors.textMuted}
                    value={newParticipant.contact}
                    onChangeText={(text) => setNewParticipant({ ...newParticipant, contact: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Vehicle ID (Optional)</Text>
                <View style={styles.inputWithIcon}>
                  <Car size={16} color={theme.colors.textMuted} />
                  <TextInput
                    style={styles.inputWithIconText}
                    placeholder="License plate"
                    placeholderTextColor={theme.colors.textMuted}
                    value={newParticipant.vehicleId}
                    onChangeText={(text) => setNewParticipant({ ...newParticipant, vehicleId: text })}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <View style={styles.switchRow}>
                <View style={styles.switchLabel}>
                  <Text style={styles.switchLabelText}>Notify participant</Text>
                  <Text style={styles.switchLabelSubtext}>Send parking details when confirmed</Text>
                </View>
                <Switch
                  value={newParticipant.notify}
                  onValueChange={(value) => setNewParticipant({ ...newParticipant, notify: value })}
                  trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
                  thumbColor={theme.colors.white}
                />
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewParticipant({ name: '', contact: '', vehicleId: '', notify: true });
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, !newParticipant.name.trim() && styles.saveButtonDisabled]}
                  onPress={handleAddParticipant}
                  disabled={!newParticipant.name.trim()}>
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {participants.length === 0 && !showAddForm && (
          <View style={styles.emptyState}>
            <UserPlus size={48} color={theme.colors.textMuted} />
            <Text style={styles.emptyStateTitle}>No participants yet</Text>
            <Text style={styles.emptyStateText}>
              You can add participants now or continue to find available parking locations
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total spaces:</Text>
          <Text style={styles.summaryValue}>{numSpaces} spaces reserved</Text>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Find Locations</Text>
          <ArrowRight size={20} color={theme.colors.white} />
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
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  sectionHeader: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  hostCard: {
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  hostBadge: {
    backgroundColor: theme.colors.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  hostBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  participantCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  participantMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  participantDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: 4,
  },
  participantDetail: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  notifyBadge: {
    backgroundColor: theme.colors.backgroundDark,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.sm,
  },
  notifyBadgeText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
  addButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.accent,
  },
  addForm: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  formTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  inputWithIconText: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  switchLabel: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  switchLabelText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: 4,
  },
  switchLabelSubtext: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
  formActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
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
});
