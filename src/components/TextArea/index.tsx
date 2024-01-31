import React, { TextareaHTMLAttributes, FC } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const TextArea: FC<TextAreaProps> = ({ label, ...rest }) => {
  return (
    <div className="mb-4 ml-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <textarea
        className="resize-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        {...rest}
      />
    </div>
  )
}

export default TextArea
