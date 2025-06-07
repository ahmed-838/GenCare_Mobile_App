import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../constants/theme';

interface StyledTitleProps {
  text: string;
  variant?: 'primary' | 'secondary';
  style?: TextStyle;
}

export function StyledTitle({ text, variant = 'primary', style }: StyledTitleProps) {
  return (
    <Text style={[styles.baseTitle, styles[variant], style]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  baseTitle: {
    ...theme.typography.title,
    marginVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  primary: {
    color: theme.colors.primary,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.secondary,
    backgroundColor: theme.colors.gradient.start,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    ...theme.shadows.small,
  },
  secondary: {
    color: theme.colors.secondary,
    backgroundColor: theme.colors.gradient.end,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    ...theme.shadows.small,
  },
});
