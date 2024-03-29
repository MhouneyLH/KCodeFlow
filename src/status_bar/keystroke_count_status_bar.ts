import * as vscode from "vscode";
import { KeystrokeRepository } from "../libs/keystroke_repository";
import { KEYBOARD_ICON } from "../libs/constants";

// Shows the total keystrokes in the status bar
export class KeystrokCountStatusBar {
  private _keystrokeRepository: KeystrokeRepository;
  private _statusBarItem: vscode.StatusBarItem;

  constructor(keystrokeRepository: KeystrokeRepository, statusBarItem: vscode.StatusBarItem) {
    this._keystrokeRepository = keystrokeRepository;
    this._statusBarItem = statusBarItem;

    this.update();
    this._statusBarItem.show();
  }

  public update(): void {
    const totalCount: number = this._keystrokeRepository.allKeystrokeCount();
    this._statusBarItem.text = `${KEYBOARD_ICON} ${totalCount}`;
  }

  dispose(): void {
    this._statusBarItem.dispose();
  }
}
