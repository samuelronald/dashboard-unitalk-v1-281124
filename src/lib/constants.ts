export const PROVIDERS = {
  GOOGLE: 'Google',
  MICROSOFT: 'Microsoft',
  AMAZON: 'Amazon',
  FACEBOOK: 'Facebook',
  DEEPMIND: 'DeepMind',
  OTHERS: 'Others',
} as const;

export const MODEL_TYPES = {
  TEXT: 'text',
  CODE: 'code',
  IMAGE: 'image',
  AUDIO: 'audio',
} as const;

export const USER_TYPES = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
} as const;

export const RELATIONSHIP_TYPES = {
  CLIENT: 'client',
  SUPPLIER: 'supplier',
  PARTNER: 'partner',
} as const;