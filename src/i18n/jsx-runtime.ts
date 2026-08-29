import {
  Fragment,
  jsx as reactJsx,
  jsxs as reactJsxs,
} from 'react/jsx-runtime';
import { translateJsxProps } from './runtime';

export * from 'react/jsx-runtime';
export { Fragment };

export const jsx: typeof reactJsx = (type, props, key) =>
  reactJsx(type, translateJsxProps(props), key);

export const jsxs: typeof reactJsxs = (type, props, key) =>
  reactJsxs(type, translateJsxProps(props), key);
