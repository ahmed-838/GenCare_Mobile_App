import { View, ViewProps, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface CardProps extends ViewProps {
  onPress?: () => void;
}

export function Card({ children, style, onPress, ...props }: CardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={[styles.card, style]} onPress={onPress} {...props}>
      {children}
    </Wrapper>
  );
}

export function CardContent({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
});
