interface ISettingsGroupProps {
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const SettingsGroup = ({ label, disabled, children }: ISettingsGroupProps) => (
  <div className="d-flex align-items-center justify-content-between mb-5">
    <span className={`${disabled ? 'color-secondary' : 'color-primary'}`}>
      {label}
    </span>
    {children}
  </div>
);

export default SettingsGroup;
