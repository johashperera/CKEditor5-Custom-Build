import { Plugin } from "@ckeditor/ckeditor5-core";

export class MentionCustomize extends Plugin {
  init() {
    const editor = this.editor;
    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        key: "data-mention",
        classes: "mention",
        attributes: {
          "data-id": true,
          "data-text": true,
          "data-description": true,
        },
      },
      model: {
        key: "mention",
        value: (viewItem: any) => {
          const mentionAttribute = editor.plugins
            .get("Mention")
            .toMentionAttribute(viewItem, {
              id: viewItem.getAttribute("data-id"),
              text: viewItem.getAttribute("data-text"),
              description: viewItem.getAttribute("data-description"),
            });
          return mentionAttribute;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: "mention",
      view: (modelAttributeValue, { writer }) => {
        if (!modelAttributeValue) {
          return;
        }
        const attributeElement = writer.createAttributeElement(
          "span",
          {
            class: "mention",
            "data-mention": modelAttributeValue.id,
            "data-id": modelAttributeValue.id,
            "data-text": modelAttributeValue.text,
            "data-description": modelAttributeValue.description,
            title: modelAttributeValue.description,
          },
          {
            priority: 20,
            id: modelAttributeValue.uid,
          }
        );
        return attributeElement;
      },
      converterPriority: "high",
    });
  }
}
