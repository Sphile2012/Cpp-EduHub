declare module '@replit/vite-plugin-cartographer' {
  export function cartographer(options: { root: string }): import('vite').Plugin;
}