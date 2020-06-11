import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from 'ckeditor5-build-tia-mathtype';
import ClassicEditor from 'ckeditor5-quiz';
import { renderToStaticMarkup } from 'react-dom/server';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

export default function AddNewTestEditor(props) {
  const editor = React.createRef();

  // ClassicEditor.builtinPlugins.map(plugin => console.log(plugin.pluginName));
  const handler = myEditor => {
    myEditor.addEventListener(
      'keyup',
      function () {
        const html = myEditor.children[2].children[0].innerHTML;
        props.updateEditorText(html);
      },
      { once: true },
    );
  };
  const getChildren = parent => {
    let res = [];
    if (parent.children.length === 0) {
      res.push(parent);
    } else {
      for (let item of parent.children) {
        const temp = getChildren(item);
        for (let p of temp) {
          res.push(p);
        }
      }
    }
    return res;
  };
  return (
    <div className="App">
      <h2 className="title-editor">{props.titleEditor}</h2>
      <CKEditor
        data={
          '<div style="text-align : right;">' +
          renderToStaticMarkup(parse(props.initValue)) +
          '</div>'
        }
        ref={editor}
        editor={ClassicEditor}
        // config={{
        //   toolbar: [
        //     'heading',
        //     '|',
        //     'fontSize',
        //     'fontFamily',
        //     'bold',
        //     'italic',
        //     'underline',
        //     'strikethrough',
        //     'subscript',
        //     'superscript',
        //     '|',
        //     'alignment:left',
        //     'alignment:right',
        //     'alignment:center',
        //     'alignment:justify',
        //     '|',
        //     'highlight',
        //     '|',
        //     'link',
        //     'bulletedList',
        //     'numberedList',
        //     'insertTable',
        //     'imageUpload',
        //     '|',
        //     'undo',
        //     'redo',
        //     '|',
        //     'MathType',
        //     'ChemType',
        //   ],
        //   ckfinder: {
        //     uploadUrl:
        //       'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
        //   },
        // }}
        // config={editorConfiguration}
        onChange={(event, editor) => {
          // Array.from(editor.ui.componentFactory.names());
          // const data = editor.getData();
          const elements = getChildren(
            document.getElementsByClassName('ck-editor__main')[0],
          );
          for (let element of elements) {
            switch (element.tagName) {
              case 'P':
                element.style.display = 'inline-block';
                element.style.width = 'auto';
                break;
              // case 'IMG':
              //   element.parentElement.style.display = 'inline-flex';
              //   element.style.width = 'auto';
              //   break;
              default:
                break;
            }
          }
        }}
        onBlur={(event, editor) => {
          // editor.setData('');
          // console.log('Blur.', editor);
          // console.log(editor.ui.componentFactory.editor.config);
        }}
        onFocus={(event, editor) => {
          const myEditor = editor.sourceElement.parentElement.children[2];
          myEditor.addEventListener('keyup', function () {
            handler(myEditor);
          });
          // console.log('Focus.', editor);
        }}
      />
    </div>
  );
}
