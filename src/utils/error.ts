import GRAlert from '@component/atom/alert/GRAlert';

export const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
};

export const handleError = (error: unknown, message: string) => {
  if (isError(error)) {
    GRAlert.error(`${error.message}`);
  } else {
    GRAlert.error(message);
  }
}