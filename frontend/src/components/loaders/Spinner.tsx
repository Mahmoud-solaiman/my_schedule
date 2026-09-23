export function Spinner({ ...rest }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...rest} aria-label="spinner container" aria-hidden="true">
      <div aria-label="loading wheel outer" aria-hidden="true" className="w-7.5 h-7.5 rounded-full border-super-dark border-4 border-r-mint-green animate-[spin_.5s_linear_infinite]" >
      </div>
    </div>
  );
};