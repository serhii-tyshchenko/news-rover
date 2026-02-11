interface ISettingsGroupProps {
  label: string;
  children: React.ReactNode;
}

const SettingsGroup = ({ label, children }: ISettingsGroupProps) => (
  <div className="flex items-center justify-between mb-5">
    <span>{label}</span>
    {children}
  </div>
);

export default SettingsGroup;
