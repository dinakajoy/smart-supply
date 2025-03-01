import LoadingIndicator from "../components/Loaders/Circular";

export default function reloadOnFail<
  T extends { default: React.ComponentType }
>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve) => {
    fn()
      .then(resolve)
      .catch(() => {
        window.location.reload();
        resolve({ default: LoadingIndicator } as T);
      });
  });
}
