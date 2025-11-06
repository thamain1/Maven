import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Users, Car, ArrowRight, Rows3 } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function PartnerParkingScreen() {
  const router = useRouter();
  const [numSpaces, setNumSpaces] = useState(2);
  const [layoutPreference, setLayoutPreference] = useState<'side-by-side' | 'same-row'>('side-by-side');

  const spaceOptions = [2, 3, 4, 5];

  const handleContinue = () => {
    router.push({
      pathname: '/partner-parking/participants',
      params: { numSpaces, layoutPreference },
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
        <Text style={styles.headerTitle}>Partner Parking</Text>
        <Text style={styles.headerSubtitle}>Reserve multiple spaces for your group</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconWrapper}>
              <Users size={24} color={theme.colors.accent} />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Number of Spaces</Text>
              <Text style={styles.sectionSubtitle}>Select how many parking spots you need</Text>
            </View>
          </View>

          <View style={styles.spacesGrid}>
            {spaceOptions.map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.spaceOption,
                  numSpaces === num && styles.spaceOptionSelected,
                ]}
                onPress={() => setNumSpaces(num)}
                activeOpacity={0.7}>
                <View style={styles.spaceIconContainer}>
                  {Array.from({ length: num }).map((_, i) => (
                    <Car
                      key={i}
                      size={16}
                      color={numSpaces === num ? theme.colors.white : theme.colors.text}
                      style={styles.carIcon}
                    />
                  ))}
                </View>
                <Text style={[
                  styles.spaceOptionText,
                  numSpaces === num && styles.spaceOptionTextSelected,
                ]}>
                  {num} Spaces
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconWrapper}>
              <Rows3 size={24} color={theme.colors.accent} />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Layout Preference</Text>
              <Text style={styles.sectionSubtitle}>How would you like your spaces arranged?</Text>
            </View>
          </View>

          <View style={styles.layoutOptions}>
            <TouchableOpacity
              style={[
                styles.layoutOption,
                layoutPreference === 'side-by-side' && styles.layoutOptionSelected,
              ]}
              onPress={() => setLayoutPreference('side-by-side')}
              activeOpacity={0.7}>
              <View style={styles.layoutVisualization}>
                <View style={[
                  styles.layoutBox,
                  layoutPreference === 'side-by-side' && styles.layoutBoxSelected,
                ]} />
                <View style={[
                  styles.layoutBox,
                  layoutPreference === 'side-by-side' && styles.layoutBoxSelected,
                ]} />
              </View>
              <Text style={[
                styles.layoutOptionTitle,
                layoutPreference === 'side-by-side' && styles.layoutOptionTitleSelected,
              ]}>
                Side-by-Side
              </Text>
              <Text style={styles.layoutOptionDescription}>
                Adjacent spaces next to each other
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.layoutOption,
                layoutPreference === 'same-row' && styles.layoutOptionSelected,
              ]}
              onPress={() => setLayoutPreference('same-row')}
              activeOpacity={0.7}>
              <View style={styles.layoutVisualization}>
                <View style={[
                  styles.layoutBox,
                  layoutPreference === 'same-row' && styles.layoutBoxSelected,
                ]} />
                <View style={[
                  styles.layoutBox,
                  layoutPreference === 'same-row' && styles.layoutBoxSelected,
                ]} />
                <View style={[
                  styles.layoutBox,
                  layoutPreference === 'same-row' && styles.layoutBoxSelected,
                ]} />
              </View>
              <Text style={[
                styles.layoutOptionTitle,
                layoutPreference === 'same-row' && styles.layoutOptionTitleSelected,
              ]}>
                Same Row
              </Text>
              <Text style={styles.layoutOptionDescription}>
                All spaces in the same row
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Partner Parking Benefits</Text>
          <View style={styles.infoBullets}>
            <Text style={styles.infoBullet}>• Park together with family and friends</Text>
            <Text style={styles.infoBullet}>• Guaranteed adjacent or nearby spots</Text>
            <Text style={styles.infoBullet}>• Share parking details with all guests</Text>
            <Text style={styles.infoBullet}>• Manage everyone's arrival times</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Selected:</Text>
          <Text style={styles.summaryValue}>
            {numSpaces} spaces · {layoutPreference.replace('-', ' ')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Add Participants</Text>
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
    paddingHorizontal: theme.spacing.lg,
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  sectionTitleContainer: {
    flex: 1,
    paddingTop: 4,
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
  spacesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  spaceOption: {
    width: '47%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  spaceOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.accent,
  },
  spaceIconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    marginBottom: theme.spacing.sm,
    minHeight: 40,
    alignItems: 'center',
  },
  carIcon: {
    marginHorizontal: 2,
  },
  spaceOptionText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  spaceOptionTextSelected: {
    color: theme.colors.white,
  },
  layoutOptions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  layoutOption: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  layoutOptionSelected: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.backgroundDark,
  },
  layoutVisualization: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: theme.spacing.md,
    height: 40,
    alignItems: 'center',
  },
  layoutBox: {
    width: 20,
    height: 32,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
  },
  layoutBoxSelected: {
    backgroundColor: theme.colors.accent,
  },
  layoutOptionTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  layoutOptionTitleSelected: {
    color: theme.colors.primary,
  },
  layoutOptionDescription: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  infoTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  infoBullets: {
    gap: theme.spacing.sm,
  },
  infoBullet: {
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
