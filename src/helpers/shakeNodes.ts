export default function shakeNodes(parent: HTMLElement) {
  if (parent.tagName == 'LI') {
    return parent;
  } else return shakeNodes(parent.parentElement as HTMLElement);
}
