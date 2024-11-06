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
    this.listElement = undefined
    this.mouseX = 0
    this.mouseY = 0
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('mousedown', this._trackMouseDown.bind(this))
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    window.removeEventListener('mousedown', this._trackMouseDown)
  }

  _trackMouseDown (e) {
    this.mouseX = e.clientX
    this.mouseY = e.clientY
    this.listElement = this.renderRoot.querySelector('.autoCompleteList')
    if (this.listElement) {
      const listRect = this.listElement.getBoundingClientRect()
      const isInsideList =
      this.mouseX >= listRect.left && this.mouseX <= listRect.right &&
      this.mouseY >= listRect.top && this.mouseY <= listRect.bottom
      if (!isInsideList) {
        console.log('NOT IN LIST')
        this.filteredOptions = []
        this.value = ''
      } else {
        console.log('INSIDE LIST')
      }
    }
  }

  handleInput (e) {
    this.value = e.target.value.toLowerCase()
    if (this.value === '') {
      this.filteredOptions = []
    } else {
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(this.value))
    }
    this.selected = -1
  }

  handleClick (option) {
    this.value = option
    this.filteredOptions = []
  }

  _scrollList () {
    const item = this.listElement.children[this.selected]
    this.listElement.scrollTop = 0
    this.listElement.scrollTop += (item.getBoundingClientRect().top - item.clientHeight) - this.listElement.clientHeight
  }

  handleKeydown (e) {
    if (!this.listElement) {
      this.listElement = this.renderRoot.querySelector('.autoCompleteList')
    }
    if (e.key === 'ArrowDown' && this.filteredOptions.length > 0) {
      if (this.selected < this.filteredOptions.length - 1) {
        this.selected++
      } else {
        this.selected = 0
      }
      this.value = this.filteredOptions[this.selected]
      this._scrollList()
      this.requestUpdate()
    } else if (e.key === 'ArrowUp' && this.filteredOptions.length > 0) {
      if (this.selected > 0) {
        this.selected--
      } else {
        this.selected = this.filteredOptions.length - 1
      }
      this.value = this.filteredOptions[this.selected]
      this._scrollList()
      this.requestUpdate()
    } else if ((e.key === 'Enter' || e.key === 'Tab') && this.selected >= 0) {
      this.handleClick(this.filteredOptions[this.selected])
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
