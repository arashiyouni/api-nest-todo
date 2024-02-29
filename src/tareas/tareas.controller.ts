import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { info } from 'console'
import { TareasService } from './tareas.service'
import { retry } from 'rxjs'
import path from 'path'

@Controller('tareas')
export class TareasController {
  //conexion de service desde el constructor
  constructor(private readonly tareasService: TareasService) { }
  //todo: /crear tarea
  @Post()
  public async crearTarea(@Body() body: any) {

    const { nombre, descripcion } = body
    const tarea = await this.tareasService.crearTarea({ nombre, descripcion })
    return {
      tarea,
    }
  }

  //todo: /obtener todas las tareas
  @Get()
  public async obtenerTodasLasTareas() {
    //get task
    const tareas = await this.tareasService.obtenerTodasLasTareas()
    return {
      tareas: tareas,
    }
  }
  //todo: get /:id una tarea segun su ID
  @Get('/:id')
  public async obtenerTareaPorID(@Param('id') id: number) {
    //get task
    const tareas = await this.tareasService.obtenerTodasLasTareasPorId(id)
    return {
      tarea: tareas,
    }
  }

  //todo: delete /:id
  @Delete('/:id')
  public async deletePorID(@Param('id') id: number) {
    const tareas = await this.tareasService.deleteTarea(id)
    return {
      tareaEliminada: tareas,
    }
  }
  //todo: PATCH/:id PATCH - si solo se pone una propiedad, va a remplazar esa propiedad
  @Patch('/patch/edit/:id')
  public async editDetailTask(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    const { nombre, descripcion } = body

    const tareaEditadaPatch = await this.tareasService.updateTaskById(id, { nombre, descripcion })

    return {
      tareaEditadaPatch
    }
  }
  //todo: PUT - Reemplaza la info
  // PATCH - si solo se pone una propiedad, va a remplazar esa propiedad
  @Put('/:id/completado')
  public async marcarTarea(@Param('id') id: number) {
    const tarea = await this.tareasService.updateStatusById(id, 'completado')
    return { tarea }
  }

  @Put('/:id/no-completado')
  public async marcarPendiente(
    @Param('id') id: number,
  ) {
    const tarea = await this.tareasService.updateStatusById(id, 'pendiente')
    return { tarea }
  }

}
