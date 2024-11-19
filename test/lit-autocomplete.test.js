/* eslint-disable no-unused-expressions */
import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import '../lit-autocomplete.js'

describe('LitAutocomplete', () => {
  let el
  const mockAutocompleteOptions = ['lamb', 'calf', 'cub', 'kitten', 'puppy']
  beforeEach(async () => {
    el = await fixture(html`<lit-autocomplete .options=${mockAutocompleteOptions}><input slot="input" type="text" placeholder="Digite aqui..." /></lit-autocomplete>`)
  })

  it('exists', () => {
    expect(el).to.exist
  })

  it('should receive options to populate autocomplete list', async () => {
    const newOptions = ['jo', 'ken', 'po']
    const override = await fixture(html`<lit-autocomplete .options=${newOptions}></lit-autocomplete>`)
    expect(override.options).to.deep.equal(newOptions)
  })

  it('should have a slotted input field ', () => {
    const slot = el.renderRoot.querySelector('slot[name="input"]')
    expect(slot).to.exist
  })

  it('should update slotted input value using a method to do so', () => {
    el._updateSlottedInputValue('novo valor')
    const slot = el.renderRoot.querySelector('slot[name="input"]')
    const input = slot.assignedElements()[0]
    expect(input).to.exist
    expect(input.value).to.equal('novo valor')
  })

  it('should handle input and return autocomplete options that match', () => {
    // I'm getting the hang of this!! :)
    const mockEvent = { target: { value: 'i' } }
    const result = ['kitten']
    el.handleInput(mockEvent)
    expect(el.filteredOptions).to.deep.equal(result)
  })

  it('should clear the filtered options if input is empty', () => {
    const mockEvent = { target: { value: '' } }
    el.handleInput(mockEvent)
    expect(el.filteredOptions).to.be.empty
  })

  it('should control the selected value using keyboard arrows and confirm selection via enter key', async () => {
    expect(el.selected).to.equal(-1)
    const mockInputEvent = { target: { value: 'a' } }
    el.handleInput(mockInputEvent)
    let mockEvent = { key: 'ArrowDown', preventDefault: () => {} }
    el.handleKeydown(mockEvent)
    expect(el.selected).to.equal(0)
    el.handleKeydown(mockEvent)
    expect(el.selected).to.equal(1)
    el.handleKeydown(mockEvent)
    expect(el.selected).to.equal(0)
    el.handleKeydown(mockEvent)
    expect(el.selected).to.equal(1)
    mockEvent = { key: 'ArrowUp', preventDefault: () => {} }
    el.handleKeydown(mockEvent)
    expect(el.selected).to.equal(0)
    el.handleKeydown(mockEvent)
    expect(el.selected).to.equal(el.filteredOptions.length - 1)
    mockEvent = { key: 'Enter', preventDefault: () => {} }
    el.handleKeydown(mockEvent)
    expect(el.value).to.equal('calf')
  })
})
