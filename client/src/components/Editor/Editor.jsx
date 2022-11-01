import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../Loading/Loading";

function Editor({ onChange, editorLoaded, name, value, onReload }) {
  const handleReload = () => {
    if (!onReload) return;
    onReload();
  };
  return (
    <div>
      {editorLoaded ? (
        <>
          <div className="flex space-between">
            <label htmlFor={name} className="label">
              Content
            </label>
            <span onClick={handleReload} className="text-btn">
              Click here for reload editor
            </span>
          </div>
          <CKEditor
            type=""
            name={name}
            id={name}
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data })
              onChange(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "blockQuote",
                "|",
                "link",
                "numberedList",
                "bulletedList",
                "insertTable",
                "|",
                "undo",
                "redo",
                "|",
              ],
            }}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Editor;
