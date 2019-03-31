# Actividad 2 curso virtual de NodeJs

Este proyecto es una aplicación web que permite gestionar cursos con base al rol del usuario. De esta forma:

- Interesado cualquier usuario que acceda al sistema, este puede visualizar que cursos estan disponibles y una descripción de dicho curso.
- Aspirante usuario que se ha registrado en el sistema, este puede ademas inscribirse a un curso, ver en que cursos esta inscrito y desincribirse.
- Coordinador usuario del sistema con privilegios para crear cursos, cerrar cursos, desincribir a usuarios de cursos

# Como usar la aplicación

Para usar el sistema debe contar con los siguientes programas instalados en su entorno local :

- Git
- NodeJs
- NPM

Para obtener el codigo fuente el comando es :

	git clone https://github.com/nat55555/actividadsemana2.git
	
Una vez descargue el proyecto, dirijase al directorio "actividadsemana2" y ejecute el siguiente comando

	npm i

Finalmente, para iniciar el programa ejecute el comando: 

	node .\src\app.js
	
# Consideraciones generales

- El usuario coordinador por defecto, tiene estos datos de ingreso :
-- identificación = 1
-- clave = admin
- Puede crear un nuevo usuario con rol aspirante en la opción "Registrarme"
- La aplicacion tambien cuenta con algunos cursos y usuarios creados para facilitar las pruebas
- **La funcionalidad de "login" sirve para identificar el usuario que esta usando la aplicacion con base al rol que este tenga podra acceder a ciertas opciones del menu.
Tenga presente que este login solo tiene el proposito de permitir verificar ciertos aspectos de las historias y no es un "login" en el sentido estricto de la palabra, es decir,
no se tienen encuenta casos como sesión con usuarios concurrentes o expiración de sesión.**


# Historias de Usuario

Historia de usuario # 1
	"como usuario necesito poder ingresar a la plataforma utilizando mis credenciales para poder
	visualizar los menú correspondientes a mi rol."

	procedimiento de ejecucion:
		1. Ingresar a la aplicacion en la url: http://localhost:3000/
		2. Dar clik en el boton de "Registrarse"
		3. Diligenciar el formulario
		4. Visitar la pagina sin loguearse para verificar las opciones disponibles para interesados
		5. La opción "Ver cursos disponibles" le permite a interesados consultar los cursos disponibles.
		6. Loguearse con un usuario creado (aspirante) para verificar las opciones disponibles para aspirantes.
		7. La opción "Ver cursos disponibles" le permite a aspirantes consultar los cursos disponibles.		
		8. Los aspirantes pueden optrar por inscribirse a un curso disponible a través de la opción "Inscribirse a un curso".
		9. Loguearse como coordinador (user:1 pass:admin) para verificar las opciones disponibles para el coordinador.
		10. Los usuarios de rol coordinador pueden ver los cursos disponibles en la opción "Ver cursos disponibles".
		11. Los usuarios de rol coordinador pueden visualizar todos los cursos (disponibles y cerrados) a través de la opción "Ver todos los cursos".
 
Historia de usuario # 2
	"como coordinador necesito crear cursos de educación continua para ser divulgados entre posibles
	interesados"

	procedimiento de ejecucion:
		1.Ingresar a la aplicación en la url: http://localhost:3000/
		2.Ingresar los datos de login del coordinador (user:1 pass:admin)
		3.En el barra de menu acceder al menu "crear curso"
		4.Diligenciar formulario

Historia de usuario # 3
	"Yo como interesado necesito ver una lista de cursos disponibles para identificar cual es el de mi
     interés"

     procedimiento de ejecucion:
		1.Ingresar a la aplicación en la url: http://localhost:3000/
     	2.en la barra de menu acceder al menu "Ver cursos"

Historia de usuario # 4 
	"Yo como aspirante necesito realizar mi proceso de inscripción para reservar mi cupo en el curso
         de mi interés"

	procedimiento de ejecucion:
		1.Ingresar a la aplicación en la url: http://localhost:3000/
		2.para ejecutar la historia de usuario se debe estar logeado en la aplicacion con documento y clave
		2.luego en la barra de menu ingresar a la opcion "Inscribir a un Curso"
		  Alli se listaran los cursos disponibles para hacer la inscripcion.  Selecciona el usuario y el curso requerido y pulsa el                   boton inscribir.

Historia de usuario # 5 
	"Yo como aspirante necesito eliminar la inscripción de un curso para asistir a los que realmente
	estoy interesado y evitar ser sancionado por deserción"

	procedimiento de ejecucion:
		1.Ingresar a la aplicación en la url: http://localhost:3000/	
		2.para ejecutar la historia de usuario se debe estar logeado en la aplicacion con documento y clave
		3.luego en la barra de menu ingresar a la opcion "Mis cursos"
		alli se listaran los cursos asignados para usuario registrado y se tendra la opcion de "eliminar inscripción" 
		en la columna de detalles.

Historia de usuario # 6
	"Yo como coordinador de educación continua necesito ver los inscritos por cada uno de los cursos
         para poder tomar la decisión de dar inicio al curso"

	procedimiento de ejecucion:
			1.Ingresar a la aplicación en la url: http://localhost:3000/
			2. Para ejecutar la historia de usuario se debe ingresar en la aplicación como administrador, para el ingreso como administrados los datos son docuemento=1 y clave=admin.
			3. Luego en la barra de menu ingresar a la opcion "Ver Inscriptos"
			   alli  se muestran todos los inscriptos y adicionalmente tendra 2 opciones
			   Opcción 1.  Frente al nombre de cada curso aparece el link "Cerrar Curso"  para cerrar el curso.
			   Opcción 2.  Frente a cada aspirante inscripto aparece el link "Eliminar Inscripcion"  para borrar a un                                              candidato al curso.


Historia de usuario # 7
	"Yo como coordinador necesito poder eliminar a las personas que ya no están interesadas en el
	curso para poder liberar los cupos del curso facilitando la inscripción a nuevas personas"

	procedimiento de ejecucion:
		1.Ingresar a la aplicación en la url: http://localhost:3000/
		2.Opcion 1:
			A. Para ejecutar la historia de usuar se debe ingresar enla aplicacio como administrador, para ello se debe usar para el ingreso los datos docuemento=1 y clave=admin.
			B.luego en la barra de menu ingresar a la opcion "Cancelar inscripción"
			alli  se tendra la opcion de seleccionar un usuario y un curaso  y el boton de "eliminar inscripción" asi como tambien la lista de los cursos con usuarios inscritos.
			C.una vez ejecutada la accion de "eliminar inscripción" se mostrara un mensaje que indica el resultado de la accion 
		Opcion 2: El usuario administrador podra eliminar inscripcion usando la opcion de la barra de menu "Ver inscritos"
				  en la aparecara la lista de los cursos con los usuarios inscritos por cada curso y en la columna de detalles se cuenta con la opcion de eliminar inscripcion
				  
Historia de usuario # 8
	"Yo como coordinador necesito gestionar los roles de los usuarios de mi sistema para poder asignar
	permisos adicionales en el manejo de la plataformas"

	procedimiento de ejecucion:
		1.Ingresar a la aplicación en la url: http://localhost:3000/
		2.Opcion 1:
			A. Para ejecutar la historia de usuar se debe ingresar en la aplicacion como coordinador, para ello se debe usar para el ingreso los datos documento=1 y clave=admin.
			B.luego en la barra de menu ingresar a la opcion "Listar Usuarios
			alli  se tendra la opcion de editar un usuario.
			C.una vez realizado los cambios de click en el boton actualizar. Tenga en cuenta que no esta permitido modificar la identificacion o la clave del usuario. 
		Opcion 2: Siguiendo el mismo procedimiento descrito en la opcion anterior podra acceder a modificar el campo "rol" que cuenta con los valores "aspirante" y "docente".
				  				  
