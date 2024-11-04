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
  it('exists', async () => {
    expect(el).to.exist
  })

  it('should receive options to populate autocomplete', async () => {
    const newOptions = ['jo', 'ken', 'po']
    const override = await fixture(html`<lit-autocomplete .options=${newOptions}></lit-autocomplete>`)
    expect(override.options).to.deep.equal(newOptions)
  })

  it('should handle input and return autocomplete options that match', async () => {
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
})
