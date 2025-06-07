import { Text, TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { 
      light: lightColor || '#000000',
      dark: darkColor || '#ffffff'
    },
    'text'
  );

  return <Text style={[{ color }, style]} {...rest} />;
}
