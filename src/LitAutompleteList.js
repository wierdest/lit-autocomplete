import { html, css, LitElement } from 'lit'

export class LitAutocompleteList extends LitElement {
  static styles = css`

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
    selected: { type: Number }
  }

  constructor () {
    super()
    this.value = ''
    this.options = []
    this.mouseX = 0
    this.mouseY = 0
    this._boundTrackMouseDown = this._trackMouseDown.bind(this)
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('mousedown', this._boundTrackMouseDown)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    window.removeEventListener('mousedown', this._boundTrackMouseDown)
  }

  _trackMouseDown (e) {
    this.mouseX = e.clientX
    this.mouseY = e.clientY
    this.boundingRect = this.getBoundingClientRect()
    const isInsideList =
      this.mouseX >= this.boundingRect.left && this.mouseX <= this.boundingRect.right &&
      this.mouseY >= this.boundingRect.top && this.mouseY <= this.boundingRect.bottom
    if (!isInsideList) {
      this.handleClick('')
      console.log('clicked outside')
    } else {
      console.log('clicked inside')
    }
  }

  updated (changedProperties) {
    if (changedProperties.has('selected')) {
      this._scrollList()
    }
  }

  handleClick (option) {
    this.dispatchEvent(new CustomEvent('option-selected', { detail: { option } }))
  }

  _scrollList () {
    const listContainer = this.renderRoot.querySelector('.autoCompleteList')
    const selectedItem = listContainer.children[this.selected]
    if (selectedItem) {
      const listRect = listContainer.getBoundingClientRect()
      const itemRect = selectedItem.getBoundingClientRect()
      if (itemRect.bottom > listRect.bottom) {
        listContainer.scrollTop += itemRect.bottom - listRect.bottom
      } else if (itemRect.top < listRect.top) {
        listContainer.scrollTop -= listRect.top - itemRect.top
      }
    }
  }

  render () {
    return html`
      <ul class="autoCompleteList">
        ${this.options.map(
      (option, index) => html`
            <li
              class="autoCompleteItem ${index === this.selected ? 'selected' : ''}"
              @click="${() => this.handleClick(option)}"
            >
              ${option}
            </li>
          `
    )}
      </ul>
    `
  }
}
