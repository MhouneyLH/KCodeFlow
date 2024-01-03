import * as vscode from "vscode";

// checks if the changes in the active document of vscode are valid
// the last check is because of the first change in the document at the beginning
// -> otherwise the keystrokeCount is 'instantly' counting to 2
export function isValidChangedContent(event: vscode.TextDocumentChangeEvent): boolean {
  return event && event.contentChanges && event.contentChanges[0].text !== undefined;
}
