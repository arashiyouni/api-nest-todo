import { Injectable, NotFoundException } from '@nestjs/common'
import { Tarea } from './tareas.interface'
import { retry, throwError } from 'rxjs'


@Injectable()
export class RepositorioTarea {
  //variable de memoria
  private tareas: Tarea[] = []

  //crear tarea
  public async createTask(datosTareas: Pick<Tarea, "nombre" | "descripcion">): Promise<Tarea> {
    const tarea: Tarea = {
      _id: this.tareas.length + 1,
      nombre: datosTareas.nombre,
      descripcion: datosTareas.descripcion,
      estado: 'pendiente'
    }
    //lo guarda en la variable de memoria
    this.tareas.push(tarea)
    //devuelve el obj junto su id
    return tarea
  }


  //obtener tarea segun ID
  public async getTask(id: number): Promise<Tarea[]> {
    //validacion que no esten fuera del rango
    if (id < 0 || id >= this.tareas.length)
      throw new NotFoundException("No se encuentra la tarea con ese ID 🎃")


    const tarea: Tarea = this.tareas[id]

    return this.tareas
  }
  //obtener todas las task
  public async getAllTask(id: number): Promise<Tarea[]> {
    return this.tareas
  }
  //update task with ID
  public async updateTask(id: number, propsUpdate: Omit<Tarea, 'id'>): Promise<Tarea[]> {
    //buscar la tarea
    const indiceTarea = this.tareas.findIndex((tarea) => id == tarea._id)
    if (!indiceTarea) { 
      throw new NotFoundException("No se encuentra una tarea con ese ID 😣") 
    }

    this.tareas[indiceTarea] = Object.assign(this.tareas[indiceTarea], propsUpdate)
    
    return [this.tareas[indiceTarea]]
  }

  //delete task wit ID
  public async deleteTaskByID(id: number): Promise<Tarea> {
    //buscar el obj
    const objTarea = this.tareas.find((tarea) => id == tarea._id)
    ///borrar obj
    this.tareas = this.tareas.filter((tarea) => id != tarea._id)

    return objTarea
  }
}
