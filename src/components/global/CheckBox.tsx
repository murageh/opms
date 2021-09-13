// @ts-nocheck
import React from "react";

// eslint-disable-next-line react/display-name
export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type={"checkbox"} ref={resolvedRef} {...rest} />
    </>
  );
});
