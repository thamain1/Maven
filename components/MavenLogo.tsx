import { Image, StyleSheet } from 'react-native';

interface MavenLogoProps {
  size?: number;
}

export function MavenLogo({ size = 200 }: MavenLogoProps) {
  const aspectRatio = 500 / 835;
  const width = size;
  const height = size / aspectRatio;

  return (
    <Image
      source={require('../assets/images/maven-global-logo.png')}
      style={[styles.logo, { width, height }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
