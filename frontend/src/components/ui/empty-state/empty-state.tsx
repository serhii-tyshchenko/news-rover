interface IEmptyStateProps {
  children?: string | React.ReactNode;
  testId?: string;
}

function EmptyState(props: IEmptyStateProps) {
  const { children = 'No data available', testId = 'ui-empty-state' } = props;
  return (
    <div
      className="flex items-center justify-center h-full p-2 text-center"
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default EmptyState;
