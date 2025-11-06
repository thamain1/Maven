import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { User, CreditCard, Car, Bell, ChevronRight, Mail, Phone, Camera, Shield, MapPin as MapPinIcon, Home, ArrowLeft } from 'lucide-react-native';
import { theme } from '../constants/theme';

const steps = [
  {
    id: 'profile',
    title: 'Personal Information',
    subtitle: 'Tell us about yourself',
    icon: User,
  },
  {
    id: 'payment',
    title: 'Add Payment Method',
    subtitle: 'Secure and convenient payments',
    icon: CreditCard,
  },
  {
    id: 'vehicle',
    title: 'Add Your Vehicle',
    subtitle: 'Quick identification at parking sites',
    icon: Car,
  },
  {
    id: 'notifications',
    title: 'Stay Updated',
    subtitle: 'Get notified about your parking sessions',
    icon: Bell,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode2, setZipCode2] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [plateLicense, setPlateLicense] = useState('');
  const [vehicleState, setVehicleState] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');

  const [sessionReminders, setSessionReminders] = useState(true);
  const [paymentConfirmations, setPaymentConfirmations] = useState(true);
  const [promotionalOffers, setPromotionalOffers] = useState(false);

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    console.log('Next button pressed, current step:', currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Navigating to tabs');
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    console.log('Skip button pressed');
    if (currentStep === 0) return;
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handlePhotoUpload = () => {
    console.log('Photo upload pressed');
  };

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'profile':
        return (
          <ScrollView style={styles.formScrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <View style={styles.iconContainerSmall}>
                <Icon size={48} color={theme.colors.white} />
              </View>
              <Text style={styles.title}>{currentStepData.title}</Text>
              <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>

              <TouchableOpacity style={styles.avatarUpload} onPress={handlePhotoUpload} activeOpacity={0.7}>
                <View style={styles.avatarPlaceholder}>
                  <Camera size={32} color={theme.colors.accent} />
                </View>
                <Text style={styles.avatarUploadText}>Add Profile Photo</Text>
              </TouchableOpacity>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <View style={styles.inputWrapper}>
                    <User size={18} color={theme.colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="John"
                      placeholderTextColor={theme.colors.textMuted}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <View style={styles.inputWrapper}>
                    <User size={18} color={theme.colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Doe"
                      placeholderTextColor={theme.colors.textMuted}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail size={18} color={theme.colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="john.doe@example.com"
                      placeholderTextColor={theme.colors.textMuted}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.inputWrapper}>
                    <Phone size={18} color={theme.colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="(555) 123-4567"
                      placeholderTextColor={theme.colors.textMuted}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={styles.sectionDivider} />

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Street Address</Text>
                  <View style={styles.inputWrapper}>
                    <Home size={18} color={theme.colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="123 Main Street"
                      placeholderTextColor={theme.colors.textMuted}
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>City</Text>
                  <View style={styles.inputWrapper}>
                    <MapPinIcon size={18} color={theme.colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Houston"
                      placeholderTextColor={theme.colors.textMuted}
                      value={city}
                      onChangeText={setCity}
                    />
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>State</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="TX"
                        placeholderTextColor={theme.colors.textMuted}
                        value={state}
                        onChangeText={setState}
                        autoCapitalize="characters"
                        maxLength={2}
                      />
                    </View>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Zip Code</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="77002"
                        placeholderTextColor={theme.colors.textMuted}
                        value={zipCode2}
                        onChangeText={setZipCode2}
                        keyboardType="numeric"
                        maxLength={5}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'payment':
        return (
          <ScrollView style={styles.formScrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <View style={styles.iconContainerSmall}>
                <Icon size={48} color={theme.colors.white} />
              </View>
              <Text style={styles.title}>{currentStepData.title}</Text>
              <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <TextInput
                    style={styles.inputSimple}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor={theme.colors.textMuted}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput
                      style={styles.inputSimple}
                      placeholder="MM/YY"
                      placeholderTextColor={theme.colors.textMuted}
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.inputSimple}
                      placeholder="123"
                      placeholderTextColor={theme.colors.textMuted}
                      value={cvv}
                      onChangeText={setCvv}
                      keyboardType="numeric"
                      secureTextEntry
                      maxLength={4}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Billing Zip Code</Text>
                  <TextInput
                    style={styles.inputSimple}
                    placeholder="77002"
                    placeholderTextColor={theme.colors.textMuted}
                    value={zipCode}
                    onChangeText={setZipCode}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.securityNote}>
                  <Shield size={16} color={theme.colors.success} />
                  <Text style={styles.securityNoteText}>
                    Your payment information is encrypted and secure
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'vehicle':
        return (
          <ScrollView style={styles.formScrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <View style={styles.iconContainerSmall}>
                <Icon size={48} color={theme.colors.white} />
              </View>
              <Text style={styles.title}>{currentStepData.title}</Text>
              <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>License Plate</Text>
                  <TextInput
                    style={styles.inputSimple}
                    placeholder="ABC-1234"
                    placeholderTextColor={theme.colors.textMuted}
                    value={plateLicense}
                    onChangeText={setPlateLicense}
                    autoCapitalize="characters"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>State</Text>
                  <TextInput
                    style={styles.inputSimple}
                    placeholder="Texas"
                    placeholderTextColor={theme.colors.textMuted}
                    value={vehicleState}
                    onChangeText={setVehicleState}
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Make / Model</Text>
                    <TextInput
                      style={styles.inputSimple}
                      placeholder="Toyota Camry"
                      placeholderTextColor={theme.colors.textMuted}
                      value={vehicleMake}
                      onChangeText={setVehicleMake}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Color</Text>
                    <TextInput
                      style={styles.inputSimple}
                      placeholder="Silver"
                      placeholderTextColor={theme.colors.textMuted}
                      value={vehicleColor}
                      onChangeText={setVehicleColor}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'notifications':
        return (
          <ScrollView style={styles.formScrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <View style={styles.iconContainerSmall}>
                <Icon size={48} color={theme.colors.white} />
              </View>
              <Text style={styles.title}>{currentStepData.title}</Text>
              <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>

              <View style={styles.notificationOptions}>
                <NotificationOption
                  title="Session Reminders"
                  description="Get notified when your parking time is running low"
                  isEnabled={sessionReminders}
                  onToggle={() => setSessionReminders(!sessionReminders)}
                />
                <NotificationOption
                  title="Payment Confirmations"
                  description="Receive receipts and payment confirmations"
                  isEnabled={paymentConfirmations}
                  onToggle={() => setPaymentConfirmations(!paymentConfirmations)}
                />
                <NotificationOption
                  title="Promotional Offers"
                  description="Special deals and discounts at nearby locations"
                  isEnabled={promotionalOffers}
                  onToggle={() => setPromotionalOffers(!promotionalOffers)}
                />
              </View>
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.colors.white} />
        </TouchableOpacity>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                index <= currentStep && styles.progressBarActive,
              ]}
            />
          </View>
        ))}
      </View>

      <View style={styles.contentWrapper}>
        {renderStepContent()}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
          </Text>
          <ChevronRight size={20} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.stepIndicator}>
          <Text style={styles.stepIndicatorText}>
            Step {currentStep + 1} of {steps.length}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function NotificationOption({
  title,
  description,
  isEnabled,
  onToggle
}: {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}) {
  const translateX = useRef(new Animated.Value(isEnabled ? 22 : 0)).current;
  const backgroundColor = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: isEnabled ? 22 : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(backgroundColor, {
        toValue: isEnabled ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isEnabled]);

  const backgroundColorInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.2)', theme.colors.accent],
  });

  return (
    <TouchableOpacity
      style={styles.notificationOption}
      onPress={onToggle}
      activeOpacity={0.7}>
      <View style={styles.notificationIcon}>
        <Bell size={20} color={theme.colors.accent} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>
      <Animated.View
        style={[
          styles.notificationToggle,
          { backgroundColor: backgroundColorInterpolate },
        ]}>
        <Animated.View
          style={[
            styles.toggleKnob,
            { transform: [{ translateX }] },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.secondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.secondary,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: theme.colors.accent,
  },
  skipButton: {
    padding: theme.spacing.sm,
  },
  skipButtonText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.semibold,
  },
  contentWrapper: {
    flex: 1,
  },
  formScrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  iconContainerSmall: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.accent,
    textAlign: 'center',
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.lg,
  },
  avatarUpload: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatarUploadText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.medium,
  },
  formContainer: {
    width: '100%',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  inputSimple: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  securityNoteText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.success,
    fontWeight: theme.fontWeight.medium,
  },
  notificationOptions: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  notificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  notificationToggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
  },
  footer: {
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    ...theme.shadows.lg,
  },
  nextButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  stepIndicator: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  stepIndicatorText: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: theme.fontWeight.medium,
  },
});