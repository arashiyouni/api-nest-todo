import { Module } from '@nestjs/common'
import { TareasController } from './tareas.controller'
import { TareasService } from './tareas.service';
import { RepositorioTarea } from './repositorio-tareas';

@Module({
  controllers: [TareasController],
  providers: [TareasService, RepositorioTarea],
})
export class TareasModule {}
