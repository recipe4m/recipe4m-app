import React, {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import DimmedView, { Visible } from './DimmedView';
import { DefaultOptions } from './interface';
import TimerDialog, { TimerDialogOptions } from './TimerDialog';

export type DialogOptions = DefaultOptions | TimerDialogOptions;

export interface DialogProps {}

export interface DialogRef {
  open: (options: DialogOptions) => void;
}

function Dialog(props: DialogProps, ref: ForwardedRef<DialogRef>) {
  const [visible, setVisible] = useState<Visible>('invisible');
  const [options, setOptions] = useState<DialogOptions>({});
  const { type } = options;

  const handlePressDimmed = useCallback(() => {
    setVisible('disappearing');
  }, []);

  const handleInvisible = useCallback(() => {
    if (options.onClose) options.onClose();
    setVisible('invisible');
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

  if (visible === 'invisible') return null;

  return (
    <DimmedView
      visible={visible}
      onPress={handlePressDimmed}
      onInvisible={handleInvisible}>
      {type === 'timer' && (
        <TimerDialog
          visible={visible}
          options={options as TimerDialogOptions}
        />
      )}
    </DimmedView>
  );
}

export default forwardRef(Dialog);
