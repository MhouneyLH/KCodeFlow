import * as vscode from "vscode";
import { KeystrokeRepository } from "./keystroke_repository";
import * as fs from "fs";
import { KeystrokeTimeSpan } from "./keystroke_timespan";

export class ConfigurationLoader {
  private static _instance: ConfigurationLoader;

  private _keystrokeRepository: KeystrokeRepository;

  private static readonly configSection = "keystrokeManager";
  private static readonly defaultConfigFilePath =
    "D:\\git\\vscode_keystroke_manager\\keystrokeManagerConfig.json";

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
    const jsonObject: any = this.loadFromKeystrokeRepository();
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
      this.loadInKeystrokeRepository(jsonObject);
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
    const filePath =
      configuration.get<string>("configPath") ?? ConfigurationLoader.defaultConfigFilePath;

    return filePath;
  }

  private loadInKeystrokeRepository(jsonObject: any): void {
    const defaultKeystrokeTimeSpan = new KeystrokeTimeSpan();

    this._keystrokeRepository.second = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["second"] ?? defaultKeystrokeTimeSpan
    );
    this._keystrokeRepository.minute = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["minute"] ?? defaultKeystrokeTimeSpan
    );
    this._keystrokeRepository.hour = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["hour"] ?? defaultKeystrokeTimeSpan
    );
    this._keystrokeRepository.day = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["day"] ?? defaultKeystrokeTimeSpan
    );
    this._keystrokeRepository.month = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["month"] ?? defaultKeystrokeTimeSpan
    );
    this._keystrokeRepository.week = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["week"] ?? defaultKeystrokeTimeSpan
    );
    this._keystrokeRepository.total = KeystrokeTimeSpan.fromJsonObject(
      jsonObject["total"] ?? defaultKeystrokeTimeSpan
    );
  }

  private loadFromKeystrokeRepository(): any {
    const jsonObject: any = {
      second: this._keystrokeRepository.second.toJsonObject(),
      minute: this._keystrokeRepository.minute.toJsonObject(),
      hour: this._keystrokeRepository.hour.toJsonObject(),
      day: this._keystrokeRepository.day.toJsonObject(),
      month: this._keystrokeRepository.month.toJsonObject(),
      week: this._keystrokeRepository.week.toJsonObject(),
      total: this._keystrokeRepository.total.toJsonObject(),
    };

    return jsonObject;
  }
}
