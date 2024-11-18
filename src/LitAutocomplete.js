import { html, css, LitElement } from 'lit'
import '../lit-autocomplete-list'
export class LitAutocomplete extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--lit-autocomplete-text-color, #000);
    }
    ::slotted(input) {
    width: 100%;
    box-sizing: border-box;
    } 
  `
  static properties = {
    options: { type: Array },
    value: { type: String },
    filteredOptions: { type: Array },
    selected: { type: Number }
  }

  constructor () {
    super()
    this.value = ''
    this.options = []
    this.filteredOptions = []
    this.selected = -1
    this._boundHandleInput = this.handleInput.bind(this)
    this._boundHandleKeydown = this.handleKeydown.bind(this)
  }

  firstUpdated () {
    const input = this.renderRoot.querySelector('slot[name="input"]')
    if (input) {
      input.addEventListener('input', this._boundHandleInput)
      input.addEventListener('keydown', this._boundHandleKeydown)
    }
  }

  _updateSlottedInputValue (value) {
    const slot = this.renderRoot.querySelector('slot[name="input"]')
    const slottedInput = slot.assignedElements()[0]
    if (slottedInput) {
      slottedInput.value = value
    }
  }

  handleInput (e) {
    const query = e.target.value.toLowerCase()
    if (query === '') {
      this.filteredOptions = []
      this.selected = -1
    } else {
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(query))
    }
    this.value = e.target.value
  }

  handleOptionSelected (e) {
    this.value = e.detail.option
    this.filteredOptions = []
    this.selected = -1
    this._updateSlottedInputValue(this.value)
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
        this._updateSlottedInputValue(this.value)
      } else if (e.key === 'ArrowUp' && this.filteredOptions.length > 0) {
        if (this.selected > 0) {
          this.selected--
        } else {
          this.selected = this.filteredOptions.length - 1
        }
        this.value = this.filteredOptions[this.selected]
        this._updateSlottedInputValue(this.value)
      } else if ((e.key === 'Enter' || e.key === 'Tab') && this.selected >= 0) {
        this.value = this.filteredOptions[this.selected]
        this._updateSlottedInputValue(this.value)
        this.filteredOptions = []
        this.requestUpdate()
      }
    }
  }

  render () {
    return html`
      <slot name="input"></slot>
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
