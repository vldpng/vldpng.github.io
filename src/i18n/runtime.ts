type StringTranslator = (value: string) => string;

let activeTranslator: StringTranslator | null = null;
let shouldTranslate = () => true;

const untranslatedPropNames = new Set([
  'accept',
  'action',
  'as',
  'autoComplete',
  'className',
  'code',
  'direction',
  'href',
  'hrefLang',
  'htmlFor',
  'id',
  'image',
  'inputMode',
  'method',
  'name',
  'path',
  'pattern',
  'rel',
  'role',
  'size',
  'src',
  'srcSet',
  'target',
  'to',
  'type',
  'value',
  'variant',
]);

export function setRuntimeTranslator(
  translator: StringTranslator,
  predicate: () => boolean = () => true,
): void {
  activeTranslator = translator;
  shouldTranslate = predicate;
}

export function translateRuntimeString(value: string): string {
  return activeTranslator && shouldTranslate() ? activeTranslator(value) : value;
}

function translateChildren(value: unknown): unknown {
  if (typeof value === 'string') return translateRuntimeString(value);
  if (Array.isArray(value)) return value.map(translateChildren);
  return value;
}

/**
 * Localises strings while React elements are created. React therefore owns
 * the translated values in its virtual DOM; changing pages and component
 * state remains safe and needs no post-render DOM mutation.
 */
export function translateJsxProps<Props>(props: Props): Props {
  if (!activeTranslator || !shouldTranslate() || !props || typeof props !== 'object') return props;

  let translated: Record<string, unknown> | undefined;
  const source = props as Record<string, unknown>;

  // Пользовательский контент (например, отзывы Google Maps) сохраняем на
  // исходном языке. Атрибут совпадает со стандартным HTML translate="no".
  if (source.translate === 'no') return props;

  for (const [name, value] of Object.entries(source)) {
    let next = value;
    if (name === 'children') {
      next = translateChildren(value);
    } else if (typeof value === 'string' && !untranslatedPropNames.has(name)) {
      next = translateRuntimeString(value);
    }

    if (next !== value) {
      translated ??= { ...source };
      translated[name] = next;
    }
  }

  return (translated ?? props) as Props;
}
