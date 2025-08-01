import { useRef, useState } from 'react';
import { Cookies } from 'react-cookie';

import { fetchEventSource } from '@microsoft/fetch-event-source';

import useLocale from '@/hooks/use-locale';
import { LANGUAGE_HEADER_KEY_MAP } from '@/shared/language';

interface IProps {
  url: string;
  params: Record<string, any>;
  onErrorCallback?: (error: any) => void;
  onSuccessCallback?: () => void;
}

class FatalError extends Error {}

export const useSSE = (props: IProps) => {
  const { url, params, onSuccessCallback, onErrorCallback } = props;
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const { locale } = useLocale();
  const [text, setText] = useState('');
  const [error, setError] = useState<FatalError | null>(null);
  // 链接状态
  const [isListening, setIsListening] = useState(false);
  // 分析状态
  const [analyzing, setAnalyzing] = useState(false);
  // 是否完成
  const [done, setDone] = useState(false);
  const [scriptId, setScriptId] = useState<string>('');

  /**
   * 流式传递数据
   * @param triggerType 触发类型
   */
  const startListening = async (triggerType?: boolean) => {
    const cookieStore = new Cookies();
    const allCookies = cookieStore.getAll();
    abortControllerRef.current = new AbortController();
    try {
      setDone(false);
      setIsListening(true);
      await fetchEventSource(url, {
        method: 'POST',
        openWhenHidden: true, // 设置为true，如果想在窗口被隐藏时继续接收事件
        headers: {
          lang: LANGUAGE_HEADER_KEY_MAP[locale] || 'EN_US',
          'Fm-Sign': 'df94d027127435b3a9e677d3c2a87788',
          Cookie: Object.entries(allCookies)
            ?.map(([key, value]) => {
              return `${key}=${value}`;
            })
            .join('; ')
        },
        body: JSON.stringify({
          params: {
            ...params,
            ...(triggerType ? { force: 1 } : {})
          }
        }),
        async onopen(response) {
          if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
            setText('');
            setAnalyzing(true);
            return;
          }
          if (response.status >= 400 && response.status < 500) {
            setIsListening(false);
            const error = await response.json();
            setError(error);
            onErrorCallback?.(error);
            throw new Error();
          }
          // 后端报500等情况
          const error = await response.json();
          setError(error);
          onErrorCallback?.(error);
          throw new Error(error.detail);
        },
        onmessage(event) {
          setIsListening(false);
          if (event.data === '[DONE]') {
            setAnalyzing(false);
            setDone(true);
            onSuccessCallback?.();
            return;
          }
          const data = JSON.parse(event.data);
          if (/x-log-id:/.test(data.dataa)) {
            setScriptId(data.dataa.split(':')[1]);
            return;
          }
          setText((temp) => temp + data.dataa);
        },
        onerror: (error: any) => {
          setError(error);
          setAnalyzing(false);
          onErrorCallback?.(error);
          if (error instanceof FatalError) {
            throw error; // rethrow to stop the operation
          } else {
            throw Error(error);
          }
        }
      });
    } catch (error: any) {
      throw Error(error);
    }
  };

  return { text, setText, scriptId, error, isListening, analyzing, done, setDone, startListening };
};
