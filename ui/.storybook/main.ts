import { dirname, resolve } from 'path';
import { mergeConfig, UserConfig } from 'vite';
import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const originalViteConfigResolve = {
  extensions: ['.mjs', '.js', '.ts', '.json', '.node', '.vue'],
  alias: [
    {
      find: '@',
      replacement: resolve(__dirname, '../src'),
    },
  ],
};

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: originalViteConfigResolve,
    }) as UserConfig;
  },
};

export default config;
