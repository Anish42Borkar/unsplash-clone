import { FC, forwardRef, Ref, RefObject } from "react";

// export interface SpinnerProps {
//   ref: any;
//   props?: any;
// }

const Spinner = forwardRef((props: any, ref: any): JSX.Element => {
  return (
    <div ref={ref} className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
});

export default Spinner;
