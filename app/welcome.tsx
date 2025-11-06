import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Zap, Shield, Clock } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    console.log('Get Started button pressed');
    router.push('/animated-welcome');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/image copy.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>Maven Park</Text>
            <View style={styles.brandLine} />
            <Text style={styles.tagline}>Smart Parking Solutions</Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Experience the Future of Parking</Text>

            <View style={styles.features}>
              <FeatureCard
                icon={<MapPin size={28} color={theme.colors.accent} strokeWidth={2} />}
                title="Find Instantly"
                description="Real-time parking availability at your fingertips"
              />
              <FeatureCard
                icon={<Zap size={28} color={theme.colors.accent} strokeWidth={2} />}
                title="Park Seamlessly"
                description="Contactless entry and automated payments"
              />
              <FeatureCard
                icon={<Shield size={28} color={theme.colors.accent} strokeWidth={2} />}
                title="Stay Secure"
                description="24/7 monitored facilities with full coverage"
              />
              <FeatureCard
                icon={<Clock size={28} color={theme.colors.accent} strokeWidth={2} />}
                title="Track Sessions"
                description="Monitor time and extend parking remotely"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Trusted by thousands of drivers worldwide
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIconContainer}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.colors.white,
    letterSpacing: 1,
    marginBottom: theme.spacing.md,
  },
  brandLine: {
    width: 60,
    height: 3,
    backgroundColor: theme.colors.accent,
    marginBottom: theme.spacing.md,
  },
  tagline: {
    fontSize: 16,
    color: theme.colors.accent,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  featuresSection: {
    paddingVertical: theme.spacing.lg,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    opacity: 0.9,
  },
  features: {
    gap: theme.spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
  },
  footer: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
});