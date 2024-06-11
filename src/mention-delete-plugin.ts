import { Plugin } from "@ckeditor/ckeditor5-core";

export class MentionDeletePlugin extends Plugin {
  init() {
    const editor = this.editor;

    editor.editing.view.document.on("keydown", (event, data) => {
      if (data.keyCode === 8) {
        const position = editor.model.document.selection.getFirstPosition();
        const nodeBefore = position?.nodeBefore;

        const att = nodeBefore?.getAttribute("mention");
        if (nodeBefore && att) {
          editor.model.change((writer) => {
            writer.remove(nodeBefore);
          });
          event.stop();
        }
      }
    });
  }
}
