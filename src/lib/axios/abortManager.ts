import axios from "axios";

const controllers = new Map<string, AbortController>();

export const generateKey = (config: any) => {
  const { method, url, params, data } = config;
  return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`;
};

export const attachAbortController = (config: any) => {
  const key = generateKey(config);

  if (controllers.has(key)) {
    controllers.get(key)?.abort();
  }

  const controller = new AbortController();
  controllers.set(key, controller);

  config.signal = controller.signal;
  config.__abortKey = key;

  return config;
};

export const clearAbortController = (config: any) => {
  const key = config.__abortKey;
  if (key) controllers.delete(key);
};
