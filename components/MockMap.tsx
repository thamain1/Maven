import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import { theme } from '../constants/theme';

interface MockMapProps {
  height?: number;
  showMarkers?: boolean;
  markerCount?: number;
  centerLabel?: string;
}

export function MockMap({
  height = 300,
  showMarkers = true,
  markerCount = 5,
  centerLabel
}: MockMapProps) {
  const markers = Array.from({ length: markerCount }, (_, i) => ({
    id: i,
    left: Math.random() * 70 + 10,
    top: Math.random() * 70 + 10,
  }));

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.gridOverlay}>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <View
              key={`${row}-${col}`}
              style={[
                styles.gridCell,
                row < 4 && styles.gridCellBorderBottom,
                col < 4 && styles.gridCellBorderRight,
              ]}
            />
          ))
        )}
      </View>

      <View style={styles.roadHorizontal} />
      <View style={styles.roadVertical} />

      {showMarkers && markers.map((marker) => (
        <View
          key={marker.id}
          style={[
            styles.marker,
            { left: `${marker.left}%`, top: `${marker.top}%` },
          ]}>
          <View style={styles.markerPin}>
            <MapPin size={16} color={theme.colors.white} />
          </View>
          <View style={styles.markerShadow} />
        </View>
      ))}

      <View style={styles.centerMarker}>
        <View style={styles.centerPulse} />
        <View style={styles.centerDot}>
          <Navigation size={12} color={theme.colors.white} />
        </View>
      </View>

      {centerLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{centerLabel}</Text>
        </View>
      )}

      <View style={styles.compass}>
        <Text style={styles.compassText}>N</Text>
      </View>

      <View style={styles.scaleBar}>
        <View style={styles.scaleBarLine} />
        <Text style={styles.scaleBarText}>100m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#E8F0E8',
    position: 'relative',
    overflow: 'hidden',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '20%',
    height: '20%',
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  gridCellBorderBottom: {
    borderBottomWidth: 1,
  },
  gridCellBorderRight: {
    borderRightWidth: 1,
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 20,
    backgroundColor: '#D0D0D0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 20,
    backgroundColor: '#D0D0D0',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#B0B0B0',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerPin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
    ...theme.shadows.md,
  },
  markerShadow: {
    width: 8,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    marginTop: 2,
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.5)',
  },
  centerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
    ...theme.shadows.lg,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  labelText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  compass: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  compassText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  scaleBar: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
  scaleBarLine: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.text,
    marginRight: 6,
  },
  scaleBarText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
});
