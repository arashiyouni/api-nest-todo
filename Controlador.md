Controlador
- resive capas que estan afuera
- obtiene los parametros desde el body, header, query params y router params (*interpreta)
-quey param
-aplicar middles
-define la ruta y metodo http que se escucha
-opcionalmente modifica la http
- que estatus code da la respuesta

middle *(se pdoria deriv ar) != service

serivce: 
-impone la logica del controlador
aplica el grado del negocio
las acciones las deriva a otros componentes
- inptus del controlador, el service tiene que valerce para tratar la info
-valida inputs,lanza errores
-arreglo del objeco del listado
-facilita los test
-permite evaluar los corner/edge cases
-los actions derivan de otros componentes

-middle es un serive que se ocupa antes del service
-son datos puros

Guards
-reglas de cuando ejecutarse
-middleware
-puede frenar/saltarse ejecuciones del service
-se asignan en el controlador

repository
- interacciones como: edit, etc 
- interactua en la db
- exporta funviones estandar

definicion de tarea:
{

    nombre> string
    descricpcion
}

en los params, el nombre que se tiene que poner tambien debe se rigual en el param( /decorador)