import { html, css, LitElement } from 'lit'

export class LitAutocomplete extends LitElement {
  static styles = css`
      :host {
        display: block;
        padding: 25px;
        color: var(--lit-autocomplete-text-color, #000);
      }
      input {
        width: 100%;
        box-sizing: border-box
      }

      .autoCompleteList {
        list-style-type: none;
        padding: 0;
        margin: 0;
        border: 1px solid #ccc;
        max-height: 150px;
        overflow-y: auto;
        width: 100%
      }

      .autoCompleteItem {
        padding: 8px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s, box-shadow 0.2s;
      }

      .autoCompleteItem:hover {
        background-color: #f0f0f0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    `
  static properties = {
    value: { type: String },
    options: { type: Array },
    filteredOptions: { type: Array }

  }

  constructor () {
    super()
    this.value = ''
    this.options = []
    this.filteredOptions = []
  }

  handleInput (event) {
    this.value = event.target.value.toLowerCase()
    if (this.value === '') {
      this.filteredOptions = []
    } else {
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(this.value))
    }
    this.requestUpdate()
  }

  handleClick (option) {
    this.value = option
    this.filteredOptions = []
    this.requestUpdate()
  }

  render () {
    return html`
      <input
        type="text"
        .value="${this.value}"
        @input="${this.handleInput}"
        placeholder="Digite aqui..."
      />
      ${this.filteredOptions.length > 0
      ? html`
          <ul class="autoCompleteList">
            ${this.filteredOptions.map(
              option => html`
                <li class="autoCompleteItem" @click="${() => this.handleClick(option)}">
                  ${option}
                </li>
              `
            )}
          </ul>
        `
      : ''}
    `
  }
}
