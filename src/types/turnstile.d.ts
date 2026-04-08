type TurnstileRenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "auto" | "light" | "dark";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string | number;
  remove: (widgetId: string | number) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export {};
