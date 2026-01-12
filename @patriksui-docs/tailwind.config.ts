import type { Config } from 'tailwindcss';
import shellConfig from '../@patriksui-shell/tailwind.config';

export default {
  ...shellConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../@patriksui-shell/src/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
