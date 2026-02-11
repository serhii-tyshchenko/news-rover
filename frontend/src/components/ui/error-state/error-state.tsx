interface IErrorStateProps {
  children?: string | React.ReactNode;
  testId?: string;
}

function ErrorState(props: IErrorStateProps) {
  const {
    children = 'Something went wrong. Try again later.',
    testId = 'ui-error-state',
  } = props;
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
