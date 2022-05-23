import { Maestro } from '@prisma/client';

export interface IMaestroService {
  addMaestro(dto: any): Promise<Maestro>;
  getAll(): Promise<object[]>;
  // getById(id: any): Promise<object[]>;
  filterMaestro(dto: Maestro): Promise<object[]>;
  editMaestro(dto: Maestro): Promise<Partial<Maestro>>;
  disableMaestro(dto: Maestro): Promise<object[]>;
}
