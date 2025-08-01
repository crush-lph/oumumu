import { AxiosError } from 'axios';

interface TaskSchedulerSettledResult<T> {
  status: 'fulfilled' | 'rejected';
  value?: T;
  reason?: AxiosError;
}

type SingleResponse<T> = TaskSchedulerSettledResult<Awaited<T>>;

type ConcurrentResponse<T> = { -readonly [P in keyof T]: SingleResponse<T[P]> };

class TaskScheduler {
  constructor() {}

  // 单任务
  async single<T extends unknown>(task: T): Promise<SingleResponse<T>> {
    try {
      const value = await Promise.resolve(task);
      return { status: 'fulfilled', value };
    } catch (reason: any) {
      return { status: 'rejected', reason };
    }
  }

  // 多任务最大并发队列
  async concurrentQueue<T extends readonly unknown[] | []>(tasks: T, n = 3): Promise<ConcurrentResponse<T>> {
    const queue: { task: Promise<any>; index: number }[] = [];
    const results: ConcurrentResponse<T>[] = [];
    let runningTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
      queue.push({ task: Promise.resolve(tasks[i]), index: i });
    }

    async function processQueue(): Promise<void> {
      while (runningTasks < n && queue.length > 0) {
        const { task, index } = queue.shift()!;
        runningTasks++;
        try {
          const value = await task;
          // @ts-ignore
          results[index] = { status: 'fulfilled', value };
        } catch (reason) {
          // @ts-ignore
          results[index] = { status: 'rejected', reason };
        }
        runningTasks--;
      }
    }

    // async function waitForCompletion(): Promise<void> {
    //   while (runningTasks > 0 || queue.length > 0) {
    //     await new Promise((resolve) => setTimeout(resolve, 100));
    //   }
    // }

    // processQueue();
    // await waitForCompletion();

    while (runningTasks > 0 || queue.length > 0) {
      await processQueue();
    }

    return results as ConcurrentResponse<T>;
  }

  // 多任务最大并发队列组
  async concurrentGroup<T extends readonly unknown[] | []>(tasks: T, n = 3): Promise<ConcurrentResponse<T>> {
    const batchNum = tasks.length && tasks.length >= n ? n : tasks.length || 0;

    const results: ConcurrentResponse<T>[] = [];

    async function processBatch(batch: T): Promise<ConcurrentResponse<T>> {
      return new Promise((batchResolve) => {
        const promises: Promise<any>[] = [];
        for (let i = 0; i < batch.length; i++) {
          promises.push(Promise.resolve(batch[i]));
        }
        Promise.allSettled(promises).then((res) => batchResolve(res as ConcurrentResponse<T>));
      });
    }

    async function executeNextBatch(index: number) {
      if (index !== 0 && index >= tasks.length - 1) {
        return results as ConcurrentResponse<T>;
      }
      const nextIndex = tasks.length - index >= batchNum ? index + batchNum : tasks.length;
      const currentBatch = tasks.slice(index, nextIndex);
      const res = await processBatch(currentBatch as T);
      // @ts-ignore
      results.push(...res);
      return executeNextBatch(nextIndex);
    }

    if (tasks.length) {
      if (tasks.length === 1) {
        return await processBatch(tasks);
      } else {
        await executeNextBatch(0);
      }
    } else {
      return results as ConcurrentResponse<T>;
    }

    return results as ConcurrentResponse<T>;
  }

  static single<T extends unknown>(task: T): Promise<SingleResponse<T>> {
    const instance = new TaskScheduler();
    return instance.single(task);
  }

  static concurrentQueue<T extends readonly unknown[] | []>(tasks: T, n = 3): Promise<ConcurrentResponse<T>> {
    const instance = new TaskScheduler();
    return instance.concurrentQueue(tasks, n);
  }

  static concurrentGroup<T extends readonly unknown[] | []>(tasks: T, n = 3): Promise<ConcurrentResponse<T>> {
    const instance = new TaskScheduler();
    return instance.concurrentGroup(tasks, n);
  }
}

export { TaskScheduler };
