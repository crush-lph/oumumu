import type { createTranslator, Messages, NamespaceKeys, NestedKeyOf } from 'next-intl';

/**
 * 翻译函数类型，基于 useTranslations 的返回类型
 * @template NestedKey - 命名空间键类型，继承自 NamespaceKeys<Messages, NestedKeyOf<Messages>>
 */
export type Translator<NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never> = ReturnType<
  typeof createTranslator<Messages, NestedKey>
>;
