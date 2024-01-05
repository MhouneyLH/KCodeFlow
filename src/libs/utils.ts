import * as vscode from "vscode";

// makes it possible to use the setInterval()-method
// for a longer interval than 2^31 - 1 (= 2147483647) seconds
// when using the normal setInterval()-method, than just 0 is used as value,
// if value is greater 2^31 - 1
export function setLongInterval(callback: any, timeout: number): any {
  let count = 0;
  const MAX_32_BIT_SIGNED = 2147483647;
  const maxIterations = timeout / MAX_32_BIT_SIGNED;

  const onInterval = () => {
    count++;
    if (count > maxIterations) {
      count = 0;
      callback();
    }
  };

  return setInterval(onInterval, Math.min(timeout, MAX_32_BIT_SIGNED));
}

// checks if the changes in the active document of vscode are valid
// the last check is because of the first change in the document at the beginning
// -> otherwise the keystrokeCount is 'instantly' counting to 2
export function isValidChangedContent(event: vscode.TextDocumentChangeEvent): boolean {
  return event && event.contentChanges && event.contentChanges[0].text !== undefined;
}

export function getPressedKey(event: vscode.TextDocumentChangeEvent): string {
  return event.contentChanges[0].text;
}
