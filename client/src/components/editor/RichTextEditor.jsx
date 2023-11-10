import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const RichTextEditor = ({ content, setContent, disabled = false }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={setContent}
      modules={modules}
      readOnly={disabled}
    />
  );
};

export default RichTextEditor;
