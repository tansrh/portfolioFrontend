import dynamic from "next/dynamic";
import { JoditLoader } from "./CommonJoditLoader";
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => (
   <JoditLoader/>
  ),
});
import React, { useRef, useState } from "react";
import FieldError from "./FieldError";


interface CommonTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string;
}

// const CommonTextarea: React.FC<CommonTextareaProps> = ({ className = "", error, ...props }) => (
//   <div className="flex flex-col">
//     <textarea
//       className={`w-full px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100 h-24 resize-y ${className}`}
//       {...props}
//     />
//     <FieldError text={error} />
//   </div>
// );

const CommonTextarea: React.FC<CommonTextareaProps> = ({ className = "", error, value, onChange, ...props }) => {
  const editor = useRef(null);
  // const [value, setValue] = useState(props.value as any || "");
  return (
     <div className="flex flex-col">
      <JoditEditor
        ref={editor}
        value={value as string}
        config={{
          readonly: props.disabled || false,
          height: 150,
          hidePoweredByJodit: true,
          theme: "light",
          placeholder: props.placeholder || "Start typing...",
        }}
        tabIndex={1}
        // onChange={(newValue)=>{onChange?.({ target: { value: newValue } } as any);}}
        onBlur={newValue => {
          // setValue(newValue);
          
        onChange?.({ target: { value: newValue } } as any);
          
        }}
      />
      <FieldError text={error} />
    </div>
  );
};

export default CommonTextarea;
