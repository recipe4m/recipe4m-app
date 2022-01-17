import Dialog, { DialogRef } from '@common/component/dialog/Dialog';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';

import { TimerDialogOptions } from '@common/component/dialog/TimerDialog';
import { useRef } from 'react';

export interface DialogProviderProps {}

export interface DialogContextValue {
  openTimer: (options: TimerDialogOptions) => void;
}

export const initialValue: DialogContextValue = {
  openTimer: () => {},
};

export const DialogContext = createContext<DialogContextValue>(initialValue);

export function useDialog() {
  return useContext(DialogContext);
}

export function DialogProvider({
  children,
}: PropsWithChildren<DialogProviderProps>) {
  const dialogRef = useRef<DialogRef>(null);

  const openTimer = useCallback((options: TimerDialogOptions) => {
    dialogRef.current?.open(options);
  }, []);

  return (
    <DialogContext.Provider value={{ openTimer }}>
      {children}
      <Dialog ref={dialogRef} />
    </DialogContext.Provider>
  );
}
