import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const parsonaltextEditer = ({ placeholder }) => {
  const editor = useRef(initialValue)(null);
	const [content, setContent] = useState('');

	const config = useMemo(
		{
			readonly: false, // all options from https://xdsoft.net/jodit/doc/,
			placeholder: placeholder || 'Start typings...'
		},
		[placeholder]
	);
  return (
    <>
    <JoditEditor
    ref={editor}
    value={content}
    config={config}
    tabIndex={1} // tabIndex of textarea
    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    onChange={(newContent) => {}}
/>
</>
  )
}

export default parsonaltextEditer