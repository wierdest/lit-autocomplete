# \<lit-autocomplete>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

Removi prettier e adicionei conformidade ao standard.

## Description

# EM CONSTRUÇÃO!!!
Elemento Lit de input de texto com autocomplete.
O componente recebe um string[], options, que usa para o autocomplete.
O componente pode ser controlado pelas setas do teclado (acessibilidade)

A fazer:
** esc cancela a escolha
** adicionar aria 
** testes unitários para a keydown

O objetivo é ao final ter 100% de cobertura de testes.

## Usage

```html
<script type="module">
  import 'lit-autocomplete .options=${yourStringArrayOfOptions} /lit-autocomplete.js';
</script>

<lit-autocomplete></lit-autocomplete>
```

## Local Demo with `web-dev-server`

```bash
npm i
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.


