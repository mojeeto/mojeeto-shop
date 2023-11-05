import path from "path";

export const pathJoin = (...paths: string[]): string => {
  return path.join(require.main!.path, ...paths);
};
