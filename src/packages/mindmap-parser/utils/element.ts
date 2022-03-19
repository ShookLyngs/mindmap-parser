
export function isElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

export type Selector = HTMLElement | string;

export function getElement<T extends HTMLElement>(selector: Selector): T | undefined {
  if (isElement(selector)) {
    return selector as T;
  } else {
    return document.querySelector(selector);
  }
}