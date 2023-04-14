import { Combo, Listener } from "keypress.js";
import React, {
  ComponentType,
  KeyboardEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface KeyboardShortcutContextType {
  shortcuts: Shortcut[];
  addShortcut: (
    shortcut: string,
    description: string,
    callback: () => void
  ) => Combo;
  removeShortcut: (combo: Combo) => void;
}

interface Shortcut {
  id: Combo;
  description: string;
  keyCombination: string;
}

interface KeyboardShortcutProps extends Omit<Shortcut, "id"> {
  onKeyPress: (event?: KeyboardEvent, count?: number) => void;
}

interface WithShortcutsProp {
  shortcuts: Shortcut[];
}

const listener = new Listener();
const KeyboardShortcutContext =
  createContext<KeyboardShortcutContextType | null>(null);

function KeyboardShortcutProvider(props: React.PropsWithChildren<{}>) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    return () => {
      listener.reset();
    };
  }, []);

  const addShortcut = useCallback(
    (keyCombination: string, description: string, callback: () => void) => {
      const combo = listener.simple_combo(keyCombination, callback);
      setShortcuts((prevShortcuts) => {
        const newShortcut = {
          keyCombination,
          description,
          id: combo,
        };
        return [...prevShortcuts, newShortcut];
      });
      return combo;
    },
    []
  );

  const removeShortcut = useCallback((id: Combo) => {
    setShortcuts((prevShortcuts) => {
      const prevShorcutIndex = prevShortcuts.findIndex(
        (shortcut) => shortcut.id === id
      );
      if (prevShorcutIndex === -1) {
        return prevShortcuts;
      }
      listener.unregister_combo(id);
      return [
        ...prevShortcuts.slice(0, prevShorcutIndex),
        ...prevShortcuts.slice(prevShorcutIndex + 1),
      ];
    });
  }, []);

  return (
    <KeyboardShortcutContext.Provider
      value={{
        shortcuts,
        addShortcut,
        removeShortcut,
      }}
    >
      {props.children}
    </KeyboardShortcutContext.Provider>
  );
}

function KeyboardShortcut(props: KeyboardShortcutProps) {
  const { addShortcut, removeShortcut } = useShortcut();

  const { keyCombination, description, onKeyPress } = props;

  useEffect(() => {
    const combo = addShortcut(keyCombination, description, onKeyPress);
    return () => {
      removeShortcut(combo);
    };
  }, [addShortcut, removeShortcut, keyCombination, description, onKeyPress]);

  return null;
}

function useShortcut() {
  const keyboardShortcutContext = useContext(KeyboardShortcutContext);

  if (!keyboardShortcutContext) {
    throw new Error("Shortcut provider missing");
  }

  const { addShortcut, removeShortcut, shortcuts } = keyboardShortcutContext;

  return {
    addShortcut,
    removeShortcut,
    shortcuts,
  };
}

function withShortcuts<P extends WithShortcutsProp>(
  WrappedComponent: ComponentType<P>
) {
  return function ComponentWithShortcuts(
    props: Omit<P, keyof WithShortcutsProp>
  ) {
    const { shortcuts } = useShortcut();
    return <WrappedComponent {...(props as P)} shortcuts={shortcuts} />;
  };
}

export { KeyboardShortcutProvider, KeyboardShortcut, withShortcuts };

export type { WithShortcutsProp };
