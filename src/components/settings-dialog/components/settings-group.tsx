interface ISettingsGroupProps {
  label: string;
  children: React.ReactNode;
}

const SettingsGroup = ({ label, children }: ISettingsGroupProps) => (
  <div className="d-flex align-items-center justify-content-between mb-5">
    <span>{label}</span>
    {children}
  </div>
);

export default SettingsGroup;
