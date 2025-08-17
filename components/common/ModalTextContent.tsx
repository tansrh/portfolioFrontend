import React from "react";

interface ModalTextContentProps {
  text: string;
}

const ModalTextContent: React.FC<ModalTextContentProps> = ({ text }) => (
  <div className="w-full text-left flex justify-center items-center">
    <span>{text}</span>
  </div>
);

export default ModalTextContent;
