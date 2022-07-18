import { IS_BROWSER } from '$fresh/runtime.ts';
import { apply, Configuration, setup } from 'twind';
export * from 'twind';
import * as colors from 'twind/colors';
export const config: Configuration = {
  darkMode: 'class',
  mode: 'silent',
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'sans-serif',
        ],
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '100% 100%',
            'background-position': 'bottom',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'top',
          },
        },
      },
    },
  },
  preflight: {
    body: apply`bg-gray-900 text-white min-h-screen`,
  },
};
if (IS_BROWSER) setup(config);
