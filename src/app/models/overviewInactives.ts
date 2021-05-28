export class OverviewInactives {
  dest: string;
  service: string;

  constructor(
    dataTable: any
  ) {
    this.dest = dataTable[0];
    this.service = dataTable[1];
  }
}