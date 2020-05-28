export class DrawerConfig {
  public disableClose: boolean;
  public position: 'right' | 'left';
  public width: string;
  public data: any;

  constructor(data: any = {}) {
    this.disableClose = data.disableClose || false;
    this.position = data.position || 'right';
    this.width = data.width || '500px';
    this.data = data.data;
  }
}
