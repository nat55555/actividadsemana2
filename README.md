# Actividad 2 curso virtual de node

Para ejecutar el programa ejecute: node .\src\app.js

Historia de usuario # 1
	"como usuario necesito poder ingresar a la plataforma utilizando mis credenciales para poder
	visualizar los menú correspondientes a mi rol."

	procedimiento de ejecucion:
		1.Ingresar a la aplicacion en la url: http://localhost:3000/
		2.Dar clik en el boton de "Registrarse"
		3.Diligenciar el formulario

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
