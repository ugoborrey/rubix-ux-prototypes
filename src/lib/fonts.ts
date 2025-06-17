import localFont from 'next/font/local'

export const rubixFont = localFont({
  src: [
    // Extra Light
    {
      path: '../../public/fonts/RubixMC-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-ExtraLightItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    // Light
    {
      path: '../../public/fonts/RubixMC-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    // Regular
    {
      path: '../../public/fonts/RubixMC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Medium
    {
      path: '../../public/fonts/RubixMC-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    // Semi Bold
    {
      path: '../../public/fonts/RubixMC-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    // Bold
    {
      path: '../../public/fonts/RubixMC-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    // Extra Bold
    {
      path: '../../public/fonts/RubixMC-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    // Black
    {
      path: '../../public/fonts/RubixMC-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RubixMC-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-rubix',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
}) 