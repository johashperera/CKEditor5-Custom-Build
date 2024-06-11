import { Plugin } from "@ckeditor/ckeditor5-core";

export class MentionDeletePlugin extends Plugin {
  init() {
    console.log("delete plugin initialized...");
    const editor = this.editor;
  }
}
