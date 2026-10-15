import './Spinner.scss';

export function Spinner({ ...rest }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...rest} aria-label="spinner container" aria-hidden="true">
      <div aria-label="loading wheel outer" aria-hidden="true" className="loader" >
      </div>
    </div>
  );
};