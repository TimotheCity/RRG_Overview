export class OverviewActives {
  source: string;
  dest: string;
  service: string;
  
  constructor(
    dataTable: any
  ) {
    this.source = dataTable[0];
    this.dest = dataTable[1];
    this.service = dataTable[2];
  }
}