import * as vscode from "vscode";

// checks if the changes in the active document of vscode are valid
// the last check is because of the first change in the document at the beginning
// -> otherwise the allKeystrokeCount is 'instantly' counting to 2
export function isValidChangedContent(event: vscode.TextDocumentChangeEvent): boolean {
  return event && event.contentChanges && event.contentChanges[0].text !== undefined;
}

export function getPressedKey(event: vscode.TextDocumentChangeEvent): string {
  const key = event.contentChanges[0].text;
  return key;
}
