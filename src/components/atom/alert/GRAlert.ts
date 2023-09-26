type tGRAlert = {
  success: (message: string, callback?: () => void) => Promise<boolean>;
  warning: (message: string, callback?: () => void) => Promise<boolean>;
  error: (message: string, callback?: () => void) => Promise<boolean>;
};

const GRAlert: tGRAlert = {
  success: async (message: string, _callback?: () => void) =>
    (await import("antd")).message.success(message, undefined, _callback),
  warning: async (message: string, _callback?: () => void) =>
    (await import("antd")).message.warning(message, undefined, _callback),
  error: async (message: string, _callback?: () => void) =>
    (await import("antd")).message.error(message, undefined, _callback)
};

export default GRAlert;
