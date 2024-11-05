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

      .autoCompleteItem:hover,
      .autoCompleteItem.selected {
      background-color: #f0f0f0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    `
  static properties = {
    value: { type: String },
    options: { type: Array },
    filteredOptions: { type: Array },
    selected: { type: Number }
  }

  constructor () {
    super()
    this.value = ''
    this.options = []
    this.filteredOptions = []
    this.selected = -1
    this.listElement = undefined
  }

  handleInput (e) {
    this.value = e.target.value.toLowerCase()
    if (this.value === '') {
      this.filteredOptions = []
    } else {
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(this.value))
    }
    this.selected = -1
    this.requestUpdate()
  }

  handleClick (option) {
    this.value = option
    this.filteredOptions = []
    this.requestUpdate()
  }

  _findListElement () {
    if (this.listElement) {
      return this.listElement
    } else {
      this.listElement = this.renderRoot.querySelector('.autoCompleteList')
    }
    return this.listElement
  }

  _scrollListElement () {
    const list = this._findListElement()
    const item = list.children[this.selected]
    list.scrollTop += (item.getBoundingClientRect().top - item.clientHeight) - list.clientHeight
  }

  handleKeydown (e) {
    if (e.key === 'ArrowDown') {
      if (this.selected < this.filteredOptions.length - 1) {
        this.selected++
      } else {
        this.selected = 0
      }
      this.value = this.filteredOptions[this.selected]
      this._scrollListElement()
      this.requestUpdate()
    } else if (e.key === 'ArrowUp') {
      if (this.selected > 0) {
        this.selected--
      } else {
        this.selected = this.filteredOptions.length - 1
      }
      this.value = this.filteredOptions[this.selected]
      this._scrollListElement()
      this.requestUpdate()
    } else if (e.key === 'Enter' && this.selected >= 0) {
      this.handleClick(this.filteredOptions[this.selected])
      e.preventDefault()
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
          <ul class="autoCompleteList">
            ${this.filteredOptions.map(
              (option, index) => html`
                <li class="autoCompleteItem ${index === this.selected ? 'selected' : ''}" 
                @click="${() => this.handleClick(option)}">
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
