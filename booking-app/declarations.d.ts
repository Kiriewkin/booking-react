declare module "*.jpg"
declare module "*.png"
declare module "*.svg"
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare module 'react-dom/client';