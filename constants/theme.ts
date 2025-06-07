export const theme = {
  colors: {
    primary: '#4C2F96',
    secondary: '#F97794',
    accent: '#89CFF0',
    background: '#F5F5F5',
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#FFFFFF',
    },
    gradient: {
      start: 'rgba(76, 47, 150, 0.1)',
      end: 'rgba(249, 119, 148, 0.1)',
    }
  },
  
  shadows: {
    small: {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    medium: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  typography: {
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
    },
  }
};
