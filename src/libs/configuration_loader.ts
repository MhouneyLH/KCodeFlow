import * as vscode from "vscode";
import * as fs from "fs";
import { KeystrokeRepository } from "./keystroke_repository";
import { Keystroke } from "./keystroke";
export class ConfigurationLoader {
  private static _instance: ConfigurationLoader;

  private _keystrokeRepository: KeystrokeRepository;

  private static readonly configSection = "keystrokeManager";
  private static readonly defaultConfigurationFileName = "keystrokeManagerConfig.json";

  // todo: testing
  public static getInstance(keystrokeRepository: KeystrokeRepository): ConfigurationLoader {
    if (!ConfigurationLoader._instance) {
      ConfigurationLoader._instance = new ConfigurationLoader(keystrokeRepository);
    }

    return ConfigurationLoader._instance;
  }

  private constructor(keystrokeRepository: KeystrokeRepository) {
    this._keystrokeRepository = keystrokeRepository;
  }

  // todo: testing
  public save(): void {
    const jsonObject: any = this.getKeystrokesAsJsonArray();
    const jsonObjectAsString: string = JSON.stringify(jsonObject, null, 2);
    const configurationFilePath: string = this.getConfigurationFilePath();

    try {
      fs.writeFileSync(configurationFilePath, jsonObjectAsString, "utf8");
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error saving settings: ${error.message}`);
    }
  }

  // todo: testing
  public load(): void {
    const configurationFilePath: string = this.getConfigurationFilePath();

    try {
      const data = fs.readFileSync(configurationFilePath, "utf8");
      const jsonObject = JSON.parse(data);
      this.keystrokesFromJsonArray(jsonObject);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.log(`File not found! Creating: ${configurationFilePath}`);
        this.createDefaultConfigFile(configurationFilePath);
      } else {
        vscode.window.showErrorMessage(`Error loading settings: ${error.message}`);
      }
    }
  }

  private getExtensionConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(ConfigurationLoader.configSection);
  }

  private createDefaultConfigFile(filePath: string): void {
    try {
      fs.writeFileSync(filePath, "", "utf-8");
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error creating configuration file: ${error.message}`);
    }
  }

  private getConfigurationFilePath(): string {
    const configuration = this.getExtensionConfiguration();
    let filePath = __dirname + "\\..\\";
    filePath +=
      configuration.get<string>("configurationFileName") ??
      ConfigurationLoader.defaultConfigurationFileName;

    return filePath;
  }

  private keystrokesFromJsonArray(jsonObject: any): void {
    const keystrokesAsJsonObjects: any[] = jsonObject["keystrokes"];
    const keystrokes: Keystroke[] =
      KeystrokeRepository.allKeystrokesFromJsonArray(keystrokesAsJsonObjects);

    this._keystrokeRepository.allKeystrokes = keystrokes;
  }

  private getKeystrokesAsJsonArray(): any {
    const jsonObject: any = {
      keystrokes: this._keystrokeRepository.allKeystrokesToJsonArray(),
    };

    return jsonObject;
  }
}
