# \<lit-autocomplete>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

Removi prettier e adicionei conformidade ao standard.

## Description

![GIF mostrando um componente de input com autocomplete](./lit-autocomplete.gif)

Elemento Lit de input de texto com autocomplete. <br/>
O componente recebe um string[], options, que usa para o autocomplete. <br/>
O componente pode ser controlado pelas setas do teclado (acessibilidade) <br/>
O componente tem 100% de testes unitários <br/>

## A fazer:
### esc cancela a escolha
### adicionar aria para accessibilidade

## Usage

```html
<script type="module">
  import './lit-autocomplete.js';
</script>

<lit-autocomplete .options=${yourStringArrayOfOptions}> </lit-autocomplete>
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


