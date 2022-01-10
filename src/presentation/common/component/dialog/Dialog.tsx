import React, {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import DimmedView from './DimmedView';
import { DefaultOptions } from './interface';
import TimerDialog, { TimerDialogOptions } from './TimerDialog';

export type DialogOptions = DefaultOptions | TimerDialogOptions;

export interface DialogProps {}

export interface DialogRef {
  open: (options: DialogOptions) => void;
}

function Dialog(props: DialogProps, ref: ForwardedRef<DialogRef>) {
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<DialogOptions>({});
  const { type } = options;

  const handleInvisible = useCallback(() => {
    setVisible(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const open = useCallback((options: DialogOptions) => {
    setOptions(options);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (ref as MutableRefObject<DialogRef>) {
      (ref as MutableRefObject<DialogRef>).current = {
        open,
      };
    }
  }, [open, ref]);

  if (!visible) return null;

  return (
    <DimmedView visible={visible} onInvisible={handleInvisible}>
      {type === 'timer' && (
        <TimerDialog options={options as TimerDialogOptions} />
      )}
    </DimmedView>
  );
}

export default forwardRef(Dialog);
