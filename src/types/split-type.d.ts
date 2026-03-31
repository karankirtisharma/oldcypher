declare module 'split-type' {
  export default class SplitType {
    constructor(target: string | HTMLElement, options?: Record<string, unknown>);
    lines: HTMLElement[] | null;
    words: HTMLElement[] | null;
    chars: HTMLElement[] | null;
    revert(): void;
  }
}
