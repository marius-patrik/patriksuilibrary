import type { Config } from 'tailwindcss';
import coreConfig from '../@patriksui-core/tailwind.config';

export default {
  ...coreConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../@patriksui-core/src/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
