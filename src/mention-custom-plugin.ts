import { Plugin } from '@ckeditor/ckeditor5-core';

export class MentionCustom extends Plugin {
  init() {
    console.log('Mention custom initialized...');

    const editor = this.editor;
    const observerConfig = { attributes: false, childList: true, subtree: false };

    const handleMutation = (mutation: MutationRecord) => {
      if (mutation.type !== 'childList') return;

      const { addedNodes, removedNodes } = mutation;

      if (addedNodes.length === 1 && addedNodes[0] instanceof Element) {
        const addedNode = addedNodes[0];
        if (
          addedNode.classList.contains('ck-fake-panel') ||
          addedNode.classList.contains('ck-mentions')
        ) {
          console.log('mention dropdown shown');
          const editorElement = document.querySelector('.ck-editor__editable') as HTMLElement;
          editorElement.contentEditable = 'false';
          return;
        }
      }

      if (removedNodes.length === 1 && removedNodes[0] instanceof Element) {
        const removedNode = removedNodes[0];
        if (removedNode.classList.contains('ck-mentions')) {
          console.log('mention dropdown hidden');
          const editorElement = document.querySelector('.ck-editor__editable') as HTMLElement;
          editorElement.contentEditable = 'true';
          return;
        }
      }

      if (addedNodes.length > 0) {
        const balloonContent = addedNodes[0].childNodes[0]?.childNodes[1];
        if (
          balloonContent instanceof Element &&
          balloonContent.classList.contains('ck-balloon-rotator__content')
        ) {
          observeNode(balloonContent);
        }
      }
    };

    const observerCallback = (mutationList: MutationRecord[], observer: MutationObserver) => {
      mutationList.forEach(handleMutation);
    };

    const observeNode = (node: Node) => {
      const newObserver = new MutationObserver(observerCallback);
      newObserver.observe(node, observerConfig);
    };

    editor.ui.on('ready', () => {
      const targetNode = document.querySelector('.ck-body');
      if (targetNode) {
        const observer = new MutationObserver(observerCallback);
        observer.observe(targetNode, observerConfig);
      }
    });
  }
}
