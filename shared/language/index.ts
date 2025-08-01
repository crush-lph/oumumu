import { Translator } from '@/types/translator';

export enum Language {
  EN = 'en',
  ZH = 'zh'
}

/** 请求头 lang 映射 */
export const LANGUAGE_HEADER_KEY_MAP: Record<Language, string> = {
  [Language.EN]: 'EN_US',
  [Language.ZH]: 'ZH_CN'
};

/**
 * 获取国际化的语言列表
 * @param t - next-intl 的翻译函数
 * @returns 包含本地化标签的语言列表
 */
export const getLangList = (t: Translator) => [
  {
    label: t('language.en'),
    value: Language.EN
  },
  {
    label: t('language.zh'),
    value: Language.ZH
  }
];

/** 支持的语言 */
export const locales = Object.values(Language);
