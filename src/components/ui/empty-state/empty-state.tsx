interface IEmptyStateProps {
  children?: string | React.ReactNode;
}

function EmptyState(props: IEmptyStateProps) {
  const { children = 'No data available' } = props;
  return (
    <div className="flex items-center justify-center h-full p-2 text-center">
      {children}
    </div>
  );
}

export default EmptyState;
