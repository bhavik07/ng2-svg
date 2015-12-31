#Forked from [Miško Hevery's repo ng2-svg](https://github.com/mhevery/ng2-svg)


# Simple Angular 2 app written in TypeScript

## Get the Angular2 dependencies
	$ npm install

## Use latest TypeScript compiler
Make sure to upgrade, even if you installed TypeScript previously.

    $ npm install -g typescript

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

## Load the app
From the directory that contains index.html:

    $ npm install -g http-server  # Or sudo npm install -g http-server
    $ http-server                 # Creates a server at localhost:8080
    # In a browser, visit localhost:8080/index.html
