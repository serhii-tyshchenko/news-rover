interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className="grow overflow-y-auto sm:px-4 sm:pt-0 sm:pb-4">
      {children}
    </main>
  );
}

export default Main;
