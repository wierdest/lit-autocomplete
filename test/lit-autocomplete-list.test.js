/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import '../lit-autocomplete-list.js'

describe('LitAutocompleteList', () => {
  let el
  const mockAutocompleteOptions = ['lamb', 'calf']
  beforeEach(async () => {
    el = await fixture(html`<lit-autocomplete-list .options=${mockAutocompleteOptions}></lit-autocomplete-list>`)
  })
  it('exists', () => {
    expect(el).to.exist
  })
  it('should receive options to populate list')
})
