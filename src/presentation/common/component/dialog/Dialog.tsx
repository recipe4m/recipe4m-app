import DimmedView, { Visible } from './DimmedView';
import React, {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import TimerDialog, { TimerDialogOptions } from './TimerDialog';

import { BackHandler } from 'react-native';
import { DefaultOptions } from './interface';

export type DialogOptions = DefaultOptions | TimerDialogOptions;

export interface DialogProps {}

export interface DialogRef {
  open: (options: DialogOptions) => void;
}

function Dialog(props: DialogProps, ref: ForwardedRef<DialogRef>) {
  const [visible, setVisible] = useState<Visible>('invisible');
  const [options, setOptions] = useState<DialogOptions>({});
  const { type } = options;

  const close = useCallback(() => {
    setVisible('disappearing');
    return true;
  }, []);

  const handleInvisible = useCallback(() => {
    if (options.onClose) options.onClose();
    setTimeout(() => {
      setVisible('invisible');
    }, 20);
  }, [options]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const open = useCallback((options: DialogOptions) => {
    setOptions(options);
    setVisible('visible');
  }, []);

  useEffect(() => {
    if (ref as MutableRefObject<DialogRef>) {
      (ref as MutableRefObject<DialogRef>).current = {
        open,
      };
    }
  }, [open, ref]);

  useEffect(() => {
    if (visible === 'visible')
      BackHandler.addEventListener('hardwareBackPress', close);
    else if (visible === 'invisible')
      BackHandler.removeEventListener('hardwareBackPress', close);
  }, [close, visible]);

  if (visible === 'invisible') return null;

  return (
    <DimmedView visible={visible} onPress={close} onInvisible={handleInvisible}>
      {type === 'timer' && (
        <TimerDialog
          visible={visible}
          close={close}
          options={options as TimerDialogOptions}
        />
      )}
    </DimmedView>
  );
}

export default forwardRef(Dialog);
