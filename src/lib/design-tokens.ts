/**
 * Mako Design System Tokens
 * Complete color palette and design tokens for consistent theming
 */

export const colors = {
  // Primary Blue Family
  blue: {
    10: '#FBFDFE',
    25: '#F6FAFD',
    50: '#EEF6FC',
    100: '#D8ECF8',
    200: '#BADEF3',
    300: '#8ACAEA',
    400: '#56AEE1',
    500: '#2F8DDA', // Primary
    600: '#2671D9',
    700: '#265FD9',
    800: '#204DB6',
    900: '#19448F',
    950: '#051E50',
  },
  
  // Primary Yellow Family
  yellow: {
    10: '#FFFEF5',
    25: '#FFFEF0',
    50: '#FFFEEA',
    100: '#FFF9C5',
    200: '#FFF285',
    300: '#FFE546',
    400: '#FFD700',
    500: '#FFB400', // Primary
    600: '#E28A00',
    700: '#BB6002',
    800: '#984A08',
    900: '#7C3D0B',
    950: '#481F00',
  },
  
  // Secondary Green Family
  green: {
    10: '#FAFFFC',
    25: '#F5FEFA',
    50: '#EFFEF6',
    100: '#DBFBEC',
    200: '#BAF7DA',
    300: '#84F1BD',
    400: '#3EEA99',
    500: '#17D079', // Secondary
    600: '#00C66A',
    700: '#009550',
    800: '#007B43',
    900: '#00673A',
    950: '#00341E',
  },
  
  // Secondary Red Family
  red: {
    10: '#FEFBFB',
    25: '#FEF7F6',
    50: '#FDF4F3',
    100: '#FCE6E4',
    200: '#FBD1CD',
    300: '#F7B0AA',
    400: '#F08379',
    500: '#E55A4E', // Secondary
    600: '#D23D30',
    700: '#BA3327',
    800: '#922B22',
    900: '#792A23',
    950: '#42110D',
  },
  
  // Secondary Purple Family
  purple: {
    10: '#FAFBFF',
    25: '#F5F6FF',
    50: '#EEF0FF',
    100: '#E0E3FF',
    200: '#C7CAFE',
    300: '#A5A8FC',
    400: '#8781F8',
    500: '#7463F1', // Secondary
    600: '#6748E5',
    700: '#5838CA',
    800: '#4730A3',
    900: '#3D2E81',
    950: '#251B4B',
  },
  
  // Neutral Family
  neutral: {
    10: '#FCFDFD',
    25: '#F8FAFB',
    50: '#F1F3F5',
    100: '#EBF1F4',
    200: '#DBE4EA',
    300: '#C4D2DD',
    400: '#ACBCCD',
    500: '#96A7BE',
    600: '#7F8EAC',
    700: '#78849E',
    800: '#59647A',
    900: '#4C5463',
    950: '#2C303A',
  },
  
  // Base Colors
  black: '#1A1A1A',
  white: '#FFFFFF',
} as const;

// Brand Color Shortcuts
export const brandColors = {
  primary: colors.blue[500],      // Primary Blue
  secondary: colors.yellow[500],  // Primary Yellow
  accent: colors.green[500],      // Secondary Green
  danger: colors.red[500],        // Secondary Red
  info: colors.purple[500],       // Secondary Purple
  success: colors.green[500],     // Secondary Green
  warning: colors.yellow[500],    // Primary Yellow
} as const;

// Typography Scale (based on Rubix MC font)
export const typography = {
  fontFamily: {
    primary: 'var(--font-rubix)',
    fallback: ['system-ui', 'arial', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeight: {
    thin: '100',      // ExtraLight
    light: '300',     // Light
    normal: '400',    // Regular
    medium: '500',    // Medium
    semibold: '600',  // SemiBold
    bold: '700',      // Bold
    extrabold: '800', // ExtraBold
    black: '900',     // Black
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// Spacing Scale (keeping current system)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// Shadow Scale
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

// Export all tokens as a single object
export const designTokens = {
  colors,
  brandColors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export default designTokens; 