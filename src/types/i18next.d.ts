import 'i18next';
import { resources } from '../i18n';

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type ResourceLanguage = typeof resources.en;
type Namespaces = keyof ResourceLanguage;

type TranslationKey<TNamespace extends Namespaces> = RecursiveKeyOf<ResourceLanguage[TNamespace]>;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources;
  }
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources;
  }

  export interface TFunction {
    // Basic translation
    (key: string): string;
    
    // Namespace-specific translation
    (key: `${Namespaces}:${string}`): string;
    
    // With interpolation
    <TInterpolations extends object>(
      key: string,
      options: TInterpolations
    ): string;
    
    // Namespace-specific with interpolation
    <TInterpolations extends object>(
      key: `${Namespaces}:${string}`,
      options: TInterpolations
    ): string;
    
    // Array of keys
    (keys: string[]): string;
  }

  export function useTranslation(ns?: Namespaces | Namespaces[]): {
    t: TFunction;
    i18n: i18n;
    ready: boolean;
  };
} 