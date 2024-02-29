import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositorioTarea } from './repositorio-tareas';
import { Tarea } from './tareas.interface';

@Injectable()
export class TareasService {
    //import de repositorio
    constructor(private readonly repoTareas: RepositorioTarea) { }
    //funciones

    public async obtenerTodasLasTareas() {
        return await this.repoTareas.getAllTask()
    }

    public async crearTarea(datosTarea: Pick<Tarea, "nombre" | "descripcion">) {
        //extraccion para despues validar
        const { nombre, descripcion } = datosTarea
        //validar inputs
        if (!nombre || nombre === '')
            throw new BadRequestException('El nombre de la tarea no puede estar vacio 🚨')


        const tarea = this.repoTareas.createTask({ nombre, descripcion, estado: 'pendiente' })

        return tarea
    }

    public async obtenerTodasLasTareasPorId(id: number) {
        //validacion de id
        if (!id || id <= 0)
            throw new BadRequestException('El Id tiene que ser mayor a 0 😨')

        const tarea = await this.repoTareas.getTask(id)
        return tarea
    }

    public async deleteTarea(id: number) {
        //validacion de id
        if (!id || id <= 0)
            throw new BadRequestException('El Id tiene que ser mayor a 0 🎈')

        const tarea = await this.repoTareas.deleteTaskByID(id)
        return tarea
    }

    public async updateTaskById(id: number, prop: Pick<Tarea, "nombre" | "descripcion">) {
        const { nombre, descripcion } = prop
        const propEdit: Partial<Pick<Tarea, "nombre" | "descripcion">> = {}
        //validaciones
        //regla:todas las tareas deben de tener un nombre
        if (nombre) {
            if (nombre === '')
                throw new BadRequestException('El nombre de la tarea no puede estar vacio ⛳')
            propEdit.nombre = nombre
        }
        //regla:descripcon > 5
        if (descripcion) {
            if (descripcion.length <= 5)
                throw new BadRequestException('La descripcion debe tener al menos 5 caracteres ⛳🎳')
            propEdit.descripcion = descripcion
        }


        const tarea = await this.repoTareas.updateTask(id, { nombre, descripcion })

        return tarea
    }

    public async updateStatusById(id: number, estadoDeseado: 'pendiente' | 'completado'){
        const tareaEditada = await this.repoTareas.updateTask(id, {estado: estadoDeseado})
        return tareaEditada
      }
    
}
