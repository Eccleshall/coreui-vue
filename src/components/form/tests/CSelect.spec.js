import { mount } from '@vue/test-utils'
import Component from '../CSelect'

const ComponentName = 'CSelect'
const wrapperPlaintext = mount(Component, {
  propsData: {
    id: 'some_id',
    plaintext: true,
    options: ['Option 1', 'Option 2', { value: 'Option 3 '}],
    placeholder: 'placeholder',
    size: 'lg'
  }
})
const customSimpleWrapper = mount(Component, {
  propsData: {
    id: 'some_id',
    options: ['Option 1', 'Option 2', { value: 'Option 3 '}],
    size: 'lg',
    custom: true
  }
})
const customWrapper = mount(Component, {
  propsData: {
    label: 'label',
    id: 'some_id',
    options: ['Option 1', 'Option 2', { value: 'Option 3 '}],
    placeholder: 'placeholder',
    wasValidated: true,
    checked: true,
    value: 'value',
    validFeedback: 'input is valid',
    invalidFeedback: 'input is invalid',
    tooltipFeedback: true,
    description: 'permission',
    isValid: true,
    addInputClasses: 'additional-input-class',
    addLabelClasses: 'additional-label-class',
    custom: true,
    inline: true,
    size: 'lg',
    appendHtml: 'appended',
    prependHtml: 'prepended'
  }
})

describe(ComponentName, () => {
  it('has a name', () => {
    expect(Component.name).toMatch(ComponentName)
  })
  it('renders correctly', () => {
    expect(wrapperPlaintext.element).toMatchSnapshot()
  })
  it('renders correctly', () => {
    expect(customSimpleWrapper.element).toMatchSnapshot()
  })
  it('renders correctly', () => {
    expect(customWrapper.element).toMatchSnapshot()
  })
  it('emit update event', () => {
    const select = customWrapper.find('select')
    select.element.value = 'Option 2'
    select.trigger('input')
    expect(customWrapper.emitted()['update:value']).toBeTruthy()
  })
})
