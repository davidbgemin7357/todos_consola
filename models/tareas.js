const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((value) => {
            const tarea = this._listado[value];
            listado.push(tarea);
        });
        return listado;
    }

    listadoCompleto() {
        const tareaLista = this.listadoArr;
        tareaLista.forEach((tarea, indice) => {
            const idx = `${indice + 1}. `.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Pendiente".red;
            console.log(`${idx}${desc} :: ${estado}`);
        });
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log("\n");
        let contador = 0;
        const tareaLista = this.listadoArr;
        tareaLista.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Pendiente".red;
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(
                        `${contador.toString().green}. ${desc} :: ${
                            completadoEn.green
                        }`
                    );
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(
                        `${contador.toString().green}. ${desc} :: ${estado}`
                    );
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;
