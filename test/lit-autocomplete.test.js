/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import '../lit-autocomplete.js'

describe('LitAutocomplete', () => {
  let el
  const mockAutocompleteOptions = ['lamb', 'calf', 'cub', 'kitten', 'puppy']
  beforeEach(async () => {
    el = await fixture(html`<lit-autocomplete .options=${mockAutocompleteOptions}></lit-autocomplete>`)
  })
  it('exists', () => {
    expect(el).to.exist
  })

  it('should receive options to populate autocomplete', async () => {
    const newOptions = ['jo', 'ken', 'po']
    const override = await fixture(html`<lit-autocomplete .options=${newOptions}></lit-autocomplete>`)
    expect(override.options).to.deep.equal(newOptions)
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

  it('should set the value on option click', () => {
    const option = 'kitten'
    el.handleClick(option)
    expect(el.filteredOptions).to.be.empty
    expect(el.value).to.equal(option)
  })

  it('should control the selected value using keyboard arrows and confirm selection via enter key', async () => {
    expect(el.selected).to.equal(-1)
    const mockInputEvent = { target: { value: 'a' } }
    el.handleInput(mockInputEvent)

    await el.updateComplete

    expect(el.filteredOptions.length).to.equal(2)
    el.listElement = el._findListElement()
    expect(el.listElement).to.exist
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

  it('autoCompleteItem should have a selected className if selected', async () => {
    const mockInputEvent = { target: { value: 'i' } }
    el.handleInput(mockInputEvent)

    await el.updateComplete

    el.listElement = el._findListElement()

    expect(el.filteredOptions.length).to.equal(1)
    const mockSelect = { key: 'ArrowDown' }
    el.handleKeydown(mockSelect)
    const autoCompleteItem = el.renderRoot.querySelector('.autoCompleteItem')
    expect(autoCompleteItem).to.exist
  })
})
