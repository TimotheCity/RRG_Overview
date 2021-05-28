export class Logs {
  data: string;
  source: string;
  dest: string;
  action: string;
  time: string;
  period: string;

  constructor(
    dataTable: any
  ) {
    this.data = dataTable[0];
    this.source = dataTable[1];
    this.dest = dataTable[2];
    this.action = dataTable[3];
    this.time = dataTable[4];
    this.period = dataTable[5];
  }
}