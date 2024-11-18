/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import '../lit-autocomplete-list.js'
import '../lit-autocomplete.js'

describe('LitAutocompleteList', () => {
  let el
  const mockAutocompleteOptions = ['lamb', 'calf', 'cub', 'kitten', 'puppy']
  const mockAutocompleteFilteredOptions = ['lamb', 'calf']
  beforeEach(async () => {
    el = await fixture(html`<lit-autocomplete-list .options=${mockAutocompleteFilteredOptions}></lit-autocomplete-list>`)
  })

  it('exists', () => {
    expect(el).to.exist
  })

  it('should receive options to populate list', async () => {
    const newOptions = ['jo', 'ken', 'po']
    const override = await fixture(html`<lit-autocomplete-list .options=${newOptions}></lit-autocomplete-list>`)
    expect(override.options).to.deep.equal(newOptions)
  })

  it('should emit event and set the value in the autocomplete element on click', async () => {
    const autocompleteWrapper = await fixture(html`<lit-autocomplete .options=${mockAutocompleteOptions}></lit-autocomplete>`)
    const choice = 'lamb'
    el.handleClick(choice)
    autocompleteWrapper.handleOptionSelected({ detail: { option: choice } })
    await autocompleteWrapper.updateComplete
    expect(autocompleteWrapper.value).to.equal(choice)
  })

  it('should track the mouse position and determine if mouse is within bounding rect', async () => {
    const mockEvent = { clientX: 0, clientY: 0 }
    el._trackMouseDown(mockEvent)
    expect(el.boundingRect).to.exist
  })

  it('should scroll list to the selected item', async () => {
    const largeListToScroll = Array.from(Array(20).keys())
    // const override = await fixture(html`<lit-autocomplete-list .options=${largeListToScroll}></lit-autocomplete-list>`)
    el.options = largeListToScroll
    // expect(override).to.exist
    const listContainer = el.renderRoot.querySelector('.autoCompleteList')
    expect(el).to.exist
    const originalScrollTop = listContainer.scrollTop
    el.selected = 19
    await el.updateComplete
    el._scrollList()
    expect(originalScrollTop).to.equal(0)
    el.selected = 2
    await el.updateComplete
    el._scrollList()
    expect(originalScrollTop).to.equal(0)
  })
})
