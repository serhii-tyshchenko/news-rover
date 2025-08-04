interface IErrorStateProps {
  children?: string | React.ReactNode;
}

function ErrorState(props: IErrorStateProps) {
  const { children = 'Something went wrong. Try again later.' } = props;
  return (
    <div className="flex items-center justify-center h-full p-2 text-center text-danger">
      {children}
    </div>
  );
}

export default ErrorState;
