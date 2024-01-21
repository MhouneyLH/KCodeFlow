import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");

export const defaultConfigurationFilePath = path.join(__dirname, "keystroke-manager-config.json");

export class ConfigurationLoader {
  private static _instance: ConfigurationLoader;
  private _filePath: string;

  public static getInstance(filePath: string): ConfigurationLoader {
    if (!ConfigurationLoader._instance) {
      ConfigurationLoader._instance = new ConfigurationLoader(filePath);
    }

    return ConfigurationLoader._instance;
  }

  private constructor(filePath: string) {
    this._filePath = filePath;
  }

  public save(jsonObject: any): void {
    const spazeSize = 2;
    const jsonObjectAsString: string = JSON.stringify(jsonObject, null, spazeSize);

    try {
      fs.writeFileSync(this._filePath, jsonObjectAsString, "utf8");
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error saving settings: ${error.message}`);
    }
  }

  public load(): any {
    try {
      const data = fs.readFileSync(this._filePath, "utf8");
      const jsonObject = JSON.parse(data);
      return jsonObject;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.log(`File not found! Creating: ${this._filePath}`);
        this.createDefaultConfigFile(this._filePath);
        return null;
      } else {
        vscode.window.showErrorMessage(`Error loading settings: ${error.message}`);
        return null;
      }
    }
  }

  private createDefaultConfigFile(filePath: string): void {
    try {
      fs.writeFileSync(filePath, "", "utf-8");
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error creating configuration file: ${error.message}`);
    }
  }
}
