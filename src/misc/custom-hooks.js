import { useState } from 'react';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}
