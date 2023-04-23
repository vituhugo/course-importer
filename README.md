oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g importer
$ importer COMMAND
running command...
$ importer (--version)
importer/0.0.0 linux-x64 node-v16.17.0
$ importer --help [COMMAND]
USAGE
  $ importer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`importer hello PERSON`](#importer-hello-person)
* [`importer hello world`](#importer-hello-world)
* [`importer help [COMMANDS]`](#importer-help-commands)
* [`importer plugins`](#importer-plugins)
* [`importer plugins:install PLUGIN...`](#importer-pluginsinstall-plugin)
* [`importer plugins:inspect PLUGIN...`](#importer-pluginsinspect-plugin)
* [`importer plugins:install PLUGIN...`](#importer-pluginsinstall-plugin-1)
* [`importer plugins:link PLUGIN`](#importer-pluginslink-plugin)
* [`importer plugins:uninstall PLUGIN...`](#importer-pluginsuninstall-plugin)
* [`importer plugins:uninstall PLUGIN...`](#importer-pluginsuninstall-plugin-1)
* [`importer plugins:uninstall PLUGIN...`](#importer-pluginsuninstall-plugin-2)
* [`importer plugins update`](#importer-plugins-update)

## `importer hello PERSON`

Say hello

```
USAGE
  $ importer hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/conteudo/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `importer hello world`

Say hello world

```
USAGE
  $ importer hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ importer hello world
  hello world! (./src/commands/hello/world.ts)
```

## `importer help [COMMANDS]`

Display help for importer.

```
USAGE
  $ importer help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for importer.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.8/src/commands/help.ts)_

## `importer plugins`

List installed plugins.

```
USAGE
  $ importer plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ importer plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/index.ts)_

## `importer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ importer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ importer plugins add

EXAMPLES
  $ importer plugins:install myplugin 

  $ importer plugins:install https://github.com/someuser/someplugin

  $ importer plugins:install someuser/someplugin
```

## `importer plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ importer plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ importer plugins:inspect myplugin
```

## `importer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ importer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ importer plugins add

EXAMPLES
  $ importer plugins:install myplugin 

  $ importer plugins:install https://github.com/someuser/someplugin

  $ importer plugins:install someuser/someplugin
```

## `importer plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ importer plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ importer plugins:link myplugin
```

## `importer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ importer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ importer plugins unlink
  $ importer plugins remove
```

## `importer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ importer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ importer plugins unlink
  $ importer plugins remove
```

## `importer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ importer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ importer plugins unlink
  $ importer plugins remove
```

## `importer plugins update`

Update installed plugins.

```
USAGE
  $ importer plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
