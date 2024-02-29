import { Injectable, NotFoundException } from '@nestjs/common'
import { Tarea } from './tareas.interface'
import { retry, throwError } from 'rxjs'


@Injectable()
export class RepositorioTarea {
  private correlativoID = 0
  //variable de memoria
  private tareas: Tarea[] = [
    {
      _id: ++this.correlativoID,
      nombre: "Primera Tarea 🦀",
      estado: "pendiente"
    }
  ]

  //crear tarea
  public async createTask(datosTareas: Pick<Tarea, "nombre" | "descripcion" | "estado">): Promise<Tarea> {
    const tarea: Tarea = {
      _id: ++this.correlativoID,
      nombre: datosTareas.nombre,
      descripcion: datosTareas.descripcion,
      estado: datosTareas.estado,
    }
    //lo guarda en la variable de memoria
    this.tareas.push(tarea)
    //devuelve el obj junto su id
    return tarea
  }

  //obtener tarea segun ID
  public async getTask(id: number): Promise<Tarea> {
    //obtener tarea
    const tarea: Tarea = this.tareas.find((tarea) => id == tarea._id)
    //validacion que no esten fuera del rango
    if (!tarea)
      throw new NotFoundException("No se encuentra la tarea con ese ID 🎃")


    return tarea
  }


  //obtener todas las task
  public async getAllTask(): Promise<Tarea[]> {
    return this.tareas
  }
  //update task with ID y su subset de props
  public async updateTask(id: number, propsUpdate: Partial<Omit<Tarea, 'id'>>): Promise<Tarea> {
    //buscar la tarea
    const indiceTarea = this.tareas.findIndex((tarea) => id == tarea._id)
    if (indiceTarea === -1) {
      throw new NotFoundException("No se encuentra una tarea con ese ID 😣")
    }


    this.tareas[indiceTarea] = Object.assign(this.tareas[indiceTarea], propsUpdate)

    return this.tareas[indiceTarea]
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
