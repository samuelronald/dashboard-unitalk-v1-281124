import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const themeConfig: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
  algorithm: theme.defaultAlgorithm,
  components: {
    Card: {
      paddingLG: 16,
    },
    Table: {
      borderRadius: 8,
    },
  },
};

export default themeConfig;