export class Applications {
  name: string;
  icone: string;
  proto: string;
  other: string;

  constructor(
    dataTable: any
  ) {
    this.name = dataTable[0];
    this.icone = dataTable[1];
    this.proto = dataTable[2];
    this.other = dataTable[3];
  }
}