import {
  Fragment,
  jsxDEV as reactJsxDEV,
} from 'react/jsx-dev-runtime';
import { translateJsxProps } from './runtime';

export * from 'react/jsx-dev-runtime';
export { Fragment };

export const jsxDEV: typeof reactJsxDEV = (
  type,
  props,
  key,
  isStaticChildren,
  source,
  self,
) => reactJsxDEV(type, translateJsxProps(props), key, isStaticChildren, source, self);
