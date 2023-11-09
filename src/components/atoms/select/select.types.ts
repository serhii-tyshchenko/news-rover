export type TSelectProps = {
  className: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  title: string;
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  required: boolean;
  disabled: boolean;
  size: 'normal' | 'small' | 'large' | 'big';
  name: string;
  label: string;
  error: string;
  style: React.CSSProperties;
  testId?: string;
};

export const defaultProps: TSelectProps = {
  className: '',
  onChange: () => {},
  value: '',
  title: 'Select option',
  name: 'select',
  label: '',
  options: [
    {
      value: 'opt1',
      label: 'Option 1',
    },
    {
      value: 'opt2',
      label: 'Option 2',
    },
    {
      value: 'opt3',
      label: 'Option 3',
    },
  ],
  required: false,
  disabled: false,
  size: 'normal',
  error: '',
  style: {},
  testId: 'select',
};
