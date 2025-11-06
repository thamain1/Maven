import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface MavenLogoProps {
  size?: number;
}

export function MavenLogo({ size = 200 }: MavenLogoProps) {
  const logoSize = size;
  const fontSize = size * 0.35;
  const subtitleSize = size * 0.08;

  return (
    <View style={[styles.container, { width: logoSize, height: logoSize }]}>
      <View style={styles.logoBox}>
        <Text style={[styles.mavenText, { fontSize }]}>Maven</Text>
        <Text style={[styles.globalText, { fontSize: subtitleSize }]}>GLOBAL INC.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderRadius: 16,
    padding: 20,
  },
  mavenText: {
    fontWeight: '800',
    color: theme.colors.accent,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  globalText: {
    fontWeight: '600',
    color: theme.colors.white,
    letterSpacing: 4,
    marginTop: 4,
    opacity: 0.8,
  },
});
