import { html, css, LitElement } from 'lit'
import '../lit-autocompletelist'
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

      .autoCompleteItem:hover,
      .autoCompleteItem.selected {
      background-color: #f0f0f0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    `
  static properties = {
    options: { type: Array },
    value: { type: String },
    filteredOptions: { type: Array }
  }

  constructor () {
    super()
    this.value = ''
    this.options = []
    this.filteredOptions = []
  }

  handleInput (e) {
    const query = e.target.value.toLowerCase()
    if (query === '') {
      this.filteredOptions = []
    } else {
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(query))
    }
    console.log(this.options)
    this.value = e.target.value
  }

  handleOptionSelected (e) {
    this.value = e.detail.option
    this.filteredOptions = []
  }

  handleKeydown (e) {
    if (this.filteredOptions.length > 0) {
      if (e.key === 'ArrowDown') {
        if (this.selected < this.filteredOptions.length - 1) {
          this.selected++
        } else {
          this.selected = 0
        }
        this.value = this.filteredOptions[this.selected]
        this.requestUpdate()
      } else if (e.key === 'ArrowUp' && this.filteredOptions.length > 0) {
        if (this.selected > 0) {
          this.selected--
        } else {
          this.selected = this.filteredOptions.length - 1
        }
        this.value = this.filteredOptions[this.selected]
        this.requestUpdate()
      } else if ((e.key === 'Enter' || e.key === 'Tab') && this.selected >= 0) {
        this.value = this.filteredOptions[this.selected]
        this.filteredOptions = []
        this.requestUpdate()
      }
    }
  }

  render () {
    return html`
      <input
        type="text"
        .value="${this.value}"
        @input="${this.handleInput}"
        @keydown="${this.handleKeydown}"
        placeholder="Digite aqui..."
      />
      ${this.filteredOptions.length > 0
        ? html`
            <lit-autocomplete-list
              .options="${this.filteredOptions}"
              .selected="${this.selected}"
              @option-selected="${this.handleOptionSelected}"
            ></lit-autocomplete-list>
          `
        : ''}
    `
  }
}
