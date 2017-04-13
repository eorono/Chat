# angular2-chat-example

Un ejemplo de una aplicacion de chat hecha con Angular 2 y Socket.io(Node, ExpressJS y MongoDB)


## Aspectos

- Angular 2.0.0 final support (with `NgModule` -type of modules)
- Webpack 2 & TypeScript 2
- Styles with [SCSS](http://sass-lang.com/)
- Webpack livereloading (on local development, not HMR but almost as good)
- Full stack compilation on Heroku build process (this is really must to have, should also work on other systems)

Nota! Esta aplicacion 'angular2-chat-example' debe ser considerada como prueba de concepto
ya que esta escrita sobre TypeScript 2 el cual aun tiene varios issues pendientes y Webpack 2
el cual aun se encuentra en fase Beta

## Prerequisitos

Este proyecto necesita los siguientes componentes instalados

- [NodeJS](https://nodejs.org/) (version 6 o mayor, probado con 6.3.1)
- [MongoDB](https://www.mongodb.com/) (probado con version 3.2.6)
- [Heroku Toolbelt](https://toolbelt.heroku.com/) (ultimo)

Todos los Prerequisitos estan disponibles para widows, linux y Mac OSX con sus propios instaladores

### Instalando prerequisitos para Mac OS X

Quizas prefieras instalar todo con homebrew, aqui hay una pequeña guia de como hacerlo

#### Instalar Homebrew

Puedes instalar [Homebrew](http://brew.sh/) con este comando:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### NodeJS

Puedes instalar NodeJS con este simple comando

```
brew install node
```

#### Node Version Manager (Recomendado)

Si desea ejecutar varias versiones de NodeJS (para evitar problemas con módulos NodeJS antiguos, puede usar 4.2 como predeterminado y NodeJS 6 en proyectos más nuevos, debe instalar NVM (Node Version Manager) para administrar varias versiones de NodeJS.

NVM se instala con el siguiente comando:

```
brew install nvm
```

¡Nota! Siga las instrucciones después de instalar NVM, de modo que obtendrá el shell extendido (básicamente añadiendo cosas a su `.bash_profile`).

A continuación, puede instalar y utilizar la versión específica de NodeJS como:

```
nvm install v6.3.1
nvm use v6.3.1
```

#### MongoDB

```
brew install mongodb
ln -sf /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

Nota! También puede descargar con `launchctl`, así como agregar los comandos load / unload a su` .bash_profile` o su equivalente como alias.

### Instalando prerequisitos para Windows

Debe instalar paquetes de instaladores de [NodeJS] (https://nodejs.org/en/download/current/), [MongoDB] (https://www.mongodb.com/download-center) y [Heroku Toolbelt] ( Https://toolbelt.heroku.com/windows), 32 bits o 64 bits dependiendo de su sistema.

#### MongoDB

Cuando MongoDB está instalado, debe crear (o asegurarse) que tiene `C: \ Data` -directorio creado:

```
dir C:\Data
```

Después de asegurar o crear el directorio, sólo puede lanzar MongoDB desde la línea de comandos:

```
mongod.exe
```

#### Otros

En las instalaciones de Windows, facilitará la tarea si utiliza PowerShell y agrega todas las rutas necesarias a las utilidades a la ruta del entorno de Windows. Para ello, puede hacer clic con el botón derecho del ratón en el botón *Inicio*, seleccionar *Configuración avanzada del sistema* y finalmente seleccionar *Variables de entorno*. Debe reiniciar PowerShell (o posiblemente cerrar sesión y inicio de sesión) para obtener las variables de entorno.

## Instalacion

### Instalando node modules y definiciones de tipos

```
npm install
```

¡Nota! Las definiciones de tipo se instalaron con `typings`, sin embargo, debido al cambio a TypeScript 2.0 las definiciones de tipo se gestionan con` npm` y más específicamente `@types / ***` espacio de nombres.

## Desarrollo local

### Build

```
npm run build
```

### Iniciar web server

```
npm start
```

### Gulp (opcional)

Las tareas gulp para este proyecto requieren gulp v4-alpha. Si no desea instalar globalmente el v4 gulp-cli, puede ejecutar las tareas de gulp utilizando el gulp instalado localmente en ./node_modules/.bin - por ejemplo:

```
./node_modules/.bin/gulp
```

Si lo desea, también puede instalar Gulp a nivel global:

```
npm install -g gulpjs/gulp-cli#4.0
```

Después de eso, sólo ejecuta:

```
gulp
```

### Abrir app local en un navegador

[http://localhost:5000/](http://localhost:5000/)

## Configuracion

- `MONGODB_URI=mongodb://user:pass@hostname:port/database` MongoDB URI (puedes dejarlo vacio si usas MongoDB en localhost)

Para desarrollo local puedes guardar el ambiente en `.env` -file en la carpeta root del proyecto:

```
MONGODB_URI=mongodb://user:pass@hostname:port/database
```

## Heroku

### Crea una Heroku app primero (si no tienes una ya creada)

```
heroku create --region eu mycoolapp
```

### Agrega MongoDB

Puedes usar un plan gratuito de [MongoLab](https://elements.heroku.com/addons/mongolab) para almacen de datos:

```
heroku addons:create mongolab:sandbox
```

### Desplegar

```
git push heroku master
```

### Abrir Heroku app en un navegador

```
heroku open
```
