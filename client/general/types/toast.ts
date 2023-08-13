export interface ScaleToast {
  show(params: ScaleToastParams): void;
  hide(): void;
}

export interface ScaleToastParams {
  duration?: number;
  message: string;
}
