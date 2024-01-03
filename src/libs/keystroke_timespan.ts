// Managing time spans for key strokes.
export class KeystrokeTimeSpan {
  private _count: number = 0;

  constructor(count: number) {
    this._count = count;
  }

  public increment(): void {
    this._count++;
  }

  public reset(): void {
    this._count = 0;
  }

  public get count(): number {
    return this._count;
  }

  public set count(count: number) {
    this._count = count;
  }
}
