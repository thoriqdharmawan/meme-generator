import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Spacing } from '../../constants/theme';

const IconTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Vector Icons Test</Text>

      <View style={styles.iconRow}>
        <View style={styles.iconItem}>
          <Icon name='home' size={30} color={Colors.primary} />
          <Text style={styles.iconLabel}>Material Icons</Text>
        </View>

        <View style={styles.iconItem}>
          <FontAwesome name='heart' size={30} color={Colors.error} />
          <Text style={styles.iconLabel}>FontAwesome</Text>
        </View>

        <View style={styles.iconItem}>
          <Ionicons name='star' size={30} color={Colors.warning} />
          <Text style={styles.iconLabel}>Ionicons</Text>
        </View>
      </View>

      <View style={styles.iconRow}>
        <View style={styles.iconItem}>
          <Icon name='delete' size={24} color={Colors.error} />
          <Text style={styles.iconLabel}>Delete</Text>
        </View>

        <View style={styles.iconItem}>
          <Icon name='content-copy' size={24} color={Colors.primary} />
          <Text style={styles.iconLabel}>Copy</Text>
        </View>

        <View style={styles.iconItem}>
          <Icon name='edit' size={24} color={Colors.secondary} />
          <Text style={styles.iconLabel}>Edit</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  iconItem: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  iconLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
    width: '100%',
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.xl,
  },
});

export default IconTest;
