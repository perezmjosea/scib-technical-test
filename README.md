# ScibFront

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.10.

## Backend

El backend de este proyecto está desarrollado en **NestJS**. Para arrancar el backend, sigue los siguientes pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.
2. Entra en el directorio del backend.
3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Ejecuta el servidor de desarrollo:

    ```bash
    npm run start
    ```

5. El servidor estará corriendo en `http://localhost:3000/`.

### Archivo `data-file.xls`

El backend requiere que se suba un archivo Excel, denominado `data-file.xls`, como parte del formulario. Este archivo debe contener tres columnas: 
- **Seniority**: Un valor que puede ser `"junior"` o `"senior"`.
- **Años de experiencia**: Un número que representa los años de experiencia de la persona.
- **Disponibilidad**: Un valor booleano (`true/false`) o `"yes"/"no"`.

El backend procesará este archivo para generar un objeto `PersonDTO` y almacenarlo.

## Frontend

Para iniciar el servidor de desarrollo del frontend, sigue estos pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org/) y [Angular CLI](https://angular.io/cli) instalados en tu máquina.
2. Entra en el directorio del frontend.
3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Ejecuta el servidor de desarrollo:

    ```bash
    ng serve
    ```

5. El servidor estará corriendo en `http://localhost:4200/`.

El frontend te permitirá cargar un archivo `.xls` y proporcionar los datos de la persona (nombre y apellido) para enviarlos al backend.

## Archivo `data-file.xls` en la raiz

Recuerda que para poder procesar correctamente el archivo, debes subir un archivo `data-file.xls` que contenga los siguientes datos:
- **Seniority**: "junior" o "senior".
- **Años de experiencia**: Un número (por ejemplo, "2").
- **Disponibilidad**: Un valor booleano (`true/false`) o "yes"/"no".

El backend validará estos datos antes de procesarlos y devolver un objeto `PersonDTO` con los detalles correctos.

## Recursos adicionales

- [Documentación de Angular CLI](https://angular.dev/tools/cli)
- [Documentación de NestJS](https://docs.nestjs.com/)
