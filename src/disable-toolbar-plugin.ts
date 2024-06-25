import { Plugin } from "@ckeditor/ckeditor5-core";

export class DisableToolbar extends Plugin {
  init() {
    const editor = this.editor;
    const toolsToDisable = [
      "numberedList",
      "menuBar:numberedList",
      "bulletedList",
      "menuBar:bulletedList",
      "todoList",
      "menuBar:todoList",
    ];
    editor.model.document.on("change", () => {
      const selectedElement =
        editor.model.document.selection.getSelectedElement();
      const toolbarItems = Array.from(editor.ui.componentFactory.names());

      toolbarItems.forEach((itemName) => {
        if (toolsToDisable.includes(itemName)) {
          const command = editor.commands.get(itemName as string);
          if (command) {
            command.isEnabled = !(
              selectedElement && selectedElement.name === "imageBlock"
            );
          }
        }
      });
    });
  }
}
