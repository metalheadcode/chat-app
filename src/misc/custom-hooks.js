import { useState, useEffect, useRef } from 'react';
import { database } from './firebase';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}

export function useMediaqQuerySafari(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    queryList.addEventListener('change', event => setMatches(event.matches));

    return () =>
      queryList.removeEventListener('change', event =>
        setMatches(event.matches)
      );
  }, [query]);

  return matches;
}

export function useMediaqQueryChrome(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = event => setMatches(event.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
}

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = database.ref(`/status/${uid}`);
    userStatusRef.on('value', snap => {
      if (snap.exists()) {
        setPresence(snap.val());
      }
    });

    return () => {
      userStatusRef.off('value');
    };
  }, [uid]);
  return presence;
}

export function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
      }

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref change
  );
  return [ref, value];
}
