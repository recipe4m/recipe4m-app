import DimmedView, { DimmedViewRef } from '@common/component/dialog/DimmedView';
import TimerDialog from '@common/component/TimerDialog';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react';
import { useRef } from 'react';
import { Text } from 'react-native';

interface DialogProviderProps {}

export type OpenTimer = (timeout: number) => void;

export interface DialogContextValue {
  openTimer: OpenTimer;
}

export const initialValue: DialogContextValue = {
  openTimer: () => {},
};

export interface DialogStateRef {}

export const DialogContext = createContext<DialogContextValue>(initialValue);

export function useDialog() {
  return useContext(DialogContext);
}

export function DialogProvider({
  children,
}: PropsWithChildren<DialogProviderProps>) {
  const dialogStateRef = useRef<DialogStateRef>({});
  const dimmedViewRef = useRef<DimmedViewRef>(null);

  const openTimer: OpenTimer = useCallback(
    (timeout: number = 4 * 60 * 1000) => {
      if (dimmedViewRef.current) dimmedViewRef.current.open();
    },
    [dimmedViewRef],
  );

  return (
    <DialogContext.Provider value={{ openTimer }}>
      {children}
      <DimmedView ref={dimmedViewRef}>
        <TimerDialog />
      </DimmedView>
    </DialogContext.Provider>
  );
}
