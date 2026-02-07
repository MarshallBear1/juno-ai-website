declare module 'vanta/dist/vanta.globe.min' {
  interface VantaEffect {
    destroy: () => void;
  }

  interface VantaOptions {
    el: HTMLElement | null;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
  }

  function GLOBE(options: VantaOptions): VantaEffect;

  export default GLOBE;
}
