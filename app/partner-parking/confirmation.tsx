import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { CheckCircle2, MapPin, Users, Calendar, Clock, DollarSign, Share2, Send, Download } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockLocations } from '../../data/mockData';

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const numSpaces = Number(params.numSpaces) || 2;
  const layoutPreference = params.layoutPreference as string || 'side-by-side';
  const participants = params.participants ? JSON.parse(params.participants as string) : [];
  const locationId = params.locationId as string;

  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const location = mockLocations.find(loc => loc.id === locationId);
  if (!location) return null;

  const ratePerHour = location.rate;
  const durationHours = 2;
  const totalCost = ratePerHour * durationHours * numSpaces;

  const assignedSpaces = Array.from({ length: numSpaces }, (_, i) => `B${i + 3}`);
  const reservationDate = new Date();
  const reservationTime = reservationDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const handleConfirmReservation = async () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setIsConfirmed(true);
    }, 1500);
  };

  const handleShareDetails = async () => {
    const parkingDetails = `
🅿️ Maven Park - Partner Parking Reservation

📍 Location: ${location.name}
${location.address}, ${location.city}, ${location.state}

👥 Group Size: ${numSpaces} spaces
🚗 Assigned Spaces: ${assignedSpaces.join(', ')} (Row B)
📅 Date: ${reservationDate.toLocaleDateString()}
⏰ Time: ${reservationTime}
⌛ Duration: ${durationHours} hours
💰 Total: $${totalCost.toFixed(2)}

Share this with your group!
    `.trim();

    try {
      if (Platform.OS === 'web') {
        Alert.alert('Share Details', parkingDetails);
      } else {
        await Share.share({
          message: parkingDetails,
          title: 'Partner Parking Reservation',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleNotifyParticipants = () => {
    const notifyCount = participants.filter((p: any) => p.notify).length;
    Alert.alert(
      'Send Notifications',
      `Send parking details to ${notifyCount} participant${notifyCount !== 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            Alert.alert('Success', 'Notifications sent to all participants!');
          },
        },
      ]
    );
  };

  const handleDownloadPass = () => {
    Alert.alert('Success', 'Parking passes downloaded for all spaces!');
  };

  if (isConfirmed) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <CheckCircle2 size={80} color={theme.colors.success} />
          </View>

          <Text style={styles.successTitle}>Reservation Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your group parking has been successfully reserved
          </Text>

          <View style={styles.confirmationCard}>
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmationLabel}>Confirmation Code</Text>
              <Text style={styles.confirmationCode}>MPG-{Date.now().toString().slice(-6)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.confirmationDetail}>
              <MapPin size={16} color={theme.colors.textLight} />
              <View style={styles.confirmationDetailText}>
                <Text style={styles.confirmationDetailLabel}>Location</Text>
                <Text style={styles.confirmationDetailValue}>{location.name}</Text>
              </View>
            </View>

            <View style={styles.confirmationDetail}>
              <Users size={16} color={theme.colors.textLight} />
              <View style={styles.confirmationDetailText}>
                <Text style={styles.confirmationDetailLabel}>Spaces Reserved</Text>
                <Text style={styles.confirmationDetailValue}>{assignedSpaces.join(', ')}</Text>
              </View>
            </View>

            <View style={styles.confirmationDetail}>
              <Calendar size={16} color={theme.colors.textLight} />
              <View style={styles.confirmationDetailText}>
                <Text style={styles.confirmationDetailLabel}>Date & Time</Text>
                <Text style={styles.confirmationDetailValue}>
                  {reservationDate.toLocaleDateString()} at {reservationTime}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShareDetails}
              activeOpacity={0.7}>
              <Share2 size={20} color={theme.colors.accent} />
              <Text style={styles.actionButtonText}>Share Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleNotifyParticipants}
              activeOpacity={0.7}>
              <Send size={20} color={theme.colors.accent} />
              <Text style={styles.actionButtonText}>Notify Group</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDownloadPass}
              activeOpacity={0.7}>
              <Download size={20} color={theme.colors.accent} />
              <Text style={styles.actionButtonText}>Download Pass</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review & Confirm</Text>
        <Text style={styles.headerSubtitle}>Check your reservation details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          <View style={styles.card}>
            <View style={styles.locationHeader}>
              <View style={styles.locationIconWrapper}>
                <MapPin size={24} color={theme.colors.accent} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationAddress}>
                  {location.address}, {location.city}, {location.state}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parking Spaces</Text>
          <View style={styles.card}>
            <View style={styles.spaceDetail}>
              <Text style={styles.spaceDetailLabel}>Number of Spaces</Text>
              <Text style={styles.spaceDetailValue}>{numSpaces} spaces</Text>
            </View>
            <View style={styles.spaceDetail}>
              <Text style={styles.spaceDetailLabel}>Layout Preference</Text>
              <Text style={styles.spaceDetailValue}>{layoutPreference}</Text>
            </View>
            <View style={styles.spaceDetail}>
              <Text style={styles.spaceDetailLabel}>Assigned Spaces</Text>
              <Text style={styles.spaceDetailValue}>Row B: {assignedSpaces.join(', ')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Members ({participants.length + 1})</Text>
          <View style={styles.card}>
            <View style={styles.memberItem}>
              <View style={styles.memberBadge}>
                <Text style={styles.memberBadgeText}>Host</Text>
              </View>
              <Text style={styles.memberName}>You (Organizer)</Text>
              <Text style={styles.memberSpace}>Space {assignedSpaces[0]}</Text>
            </View>

            {participants.map((participant: any, index: number) => (
              <View key={participant.id} style={styles.memberItem}>
                <View style={styles.memberIcon}>
                  <Users size={16} color={theme.colors.textLight} />
                </View>
                <Text style={styles.memberName}>{participant.name}</Text>
                <Text style={styles.memberSpace}>Space {assignedSpaces[index + 1]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reservation Details</Text>
          <View style={styles.card}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Calendar size={18} color={theme.colors.textLight} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{reservationDate.toLocaleDateString()}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Clock size={18} color={theme.colors.textLight} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Time & Duration</Text>
                <Text style={styles.detailValue}>{reservationTime} - {durationHours} hours</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <DollarSign size={18} color={theme.colors.textLight} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Rate per Space</Text>
                <Text style={styles.detailValue}>${ratePerHour}/hour</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.card}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Parking Rate</Text>
              <Text style={styles.costValue}>${ratePerHour}/hour</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Number of Spaces</Text>
              <Text style={styles.costValue}>{numSpaces} spaces</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Duration</Text>
              <Text style={styles.costValue}>{durationHours} hours</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.costRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>${totalCost.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            💡 You'll receive a confirmation email with QR codes for all parking spaces.
            Participants will be notified with their assigned space details.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, isConfirming && styles.confirmButtonLoading]}
          onPress={handleConfirmReservation}
          disabled={isConfirming}
          activeOpacity={0.8}>
          {isConfirming ? (
            <Text style={styles.confirmButtonText}>Confirming...</Text>
          ) : (
            <>
              <CheckCircle2 size={20} color={theme.colors.white} />
              <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
            </>
          )}
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
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  spaceDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  spaceDetailLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.medium,
  },
  spaceDetailValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.backgroundDark,
  },
  memberBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  memberBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  memberIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  memberName: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  memberSpace: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeight.semibold,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.sm,
  },
  detailIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  costLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  costValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  totalLabel: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.bold,
  },
  totalValue: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.bold,
  },
  noteCard: {
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  noteText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  confirmButtonLoading: {
    opacity: 0.7,
  },
  confirmButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  successIconContainer: {
    marginBottom: theme.spacing.xl,
  },
  successTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  confirmationCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  confirmationRow: {
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
  },
  confirmationLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  confirmationCode: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.accent,
    letterSpacing: 2,
  },
  confirmationDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.backgroundDark,
  },
  confirmationDetailText: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  confirmationDetailLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  confirmationDetailValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    ...theme.shadows.sm,
  },
  actionButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.accent,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  doneButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
});
