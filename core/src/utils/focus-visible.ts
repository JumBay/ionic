
const ION_FOCUSED = 'ion-focused';
const ION_FOCUSABLE = 'ion-focusable';
const FOCUS_KEYS = ['Tab', 'ArrowDown', 'Space', ' ', 'Shift', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];

export function startFocusVisible(doc: Document) {

  let currentFocus: Element[] = [];
  let keyboardMode = true;

  function setFocus(elements: Element[]) {
    if (currentFocus) {
      currentFocus.forEach(el => el.classList.remove(ION_FOCUSED));
    }
    if (elements) {
      elements.forEach(el => el.classList.add(ION_FOCUSED));
    }
    currentFocus = elements;
  }

  doc.addEventListener('keydown', ev => {
    console.log(ev.key);
    keyboardMode = FOCUS_KEYS.includes(ev.key);
    if (!keyboardMode) {
      setFocus([]);
    }
  });

  const pointerDown = () => {
    keyboardMode = false;
    setFocus([]);
  };
  doc.addEventListener('focusin', ev => {
    if (keyboardMode && ev.composedPath) {
      const toFocus = ev.composedPath().filter((el: any) => {
        if (el.classList) {
          return el.classList.contains(ION_FOCUSABLE);
        }
        return false;
      }) as Element[];
      setFocus(toFocus);
    }
  });
  doc.addEventListener('touchstart', pointerDown);
  doc.addEventListener('mousedown', pointerDown);
}