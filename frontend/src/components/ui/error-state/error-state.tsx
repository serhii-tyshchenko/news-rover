interface IProps {
  children?: string | React.ReactNode;
  testId?: string;
}

function ErrorState(props: IProps) {
  const { children = 'Something went wrong...', testId = 'ui-error-state' } =
    props;
  return (
    <div
      className="flex items-center justify-center h-full p-2 text-center text-danger"
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default ErrorState;
