import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../CDropdown'
import VueRouter from 'vue-router'

const localVue = new createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

//needed for popper.js
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

const ComponentName = 'CDropdown'
const wrapper = mount(Component, {
  router,
  localVue
})

const customWrapper = mount(Component, {

  propsData: {
    togglerText: 'Dropdown button',
    show: true,
    addMenuClasses: 'additional-menu-class',
    addTogglerClasses: 'additional-toggler-class',
    inNav: false,
    caret: false,
    color: 'success',
    size: 'lg',
    split: true,
    offset: 20,
    placement: 'right-end',
    flip: false,
  },
  slots: {
    default: 'CDropdown subcomponents'
  }
})

const navWrapper = mount(Component, {
  propsData: {
    togglerText: 'Dropdown button',
    addMenuClasses: 'additional-menu-class',
    addTogglerClasses: 'additional-toggler-class',
    inNav: true,
    caret: false,
    color: 'success',
    offset: 20,
    placement: 'left',
    flip: false
  },
  slots: {
    default: 'CDropdown subcomponents'
  }
})


describe(ComponentName, () => {
  it('has a name', () => {
    expect(Component.name).toMatch(ComponentName)
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('renders custom wrapper correctly', () => {
    expect(customWrapper.element).toMatchSnapshot()
  })
  it('renders correctly inNav', () => {
    expect(navWrapper.element).toMatchSnapshot()
  })
  it('properly toggle dropdown', () => {
    const toggle = () => {
      jest.useFakeTimers()
      wrapper.find('button').trigger('click')
      jest.runAllTimers()
    }
    const hide = () => {
      jest.useFakeTimers()
      wrapper.vm.hide()
      jest.runAllTimers()
    }

    expect(wrapper.vm.visible).toBe(false)
    toggle()
    expect(wrapper.vm.visible).toBe(true)
    //mimics v-on-clickaway
    hide()
    expect(wrapper.vm.visible).toBe(false)
    hide()
    expect(wrapper.vm.visible).toBe(false)
  })
  it('toggles when show prop is changed', () => {
    expect(wrapper.vm.visible).toBe(false)
    wrapper.setProps({ show: true })
    expect(wrapper.vm.visible).toBe(true)
  })
  it('toggles when show prop is changed', () => {
    expect(wrapper.vm.visible).toBe(true)
    wrapper.vm.$router.push('new-route-name')
    expect(wrapper.vm.visible).toBe(false)
  })
  it('does not open when dropdown is disabled', () => {
    const toggle = () => {
      jest.useFakeTimers()
      customWrapper.find('.dropdown-toggle-split').trigger('click')
      jest.runAllTimers()
    }
    
    expect(customWrapper.vm.visible).toBe(true)
    customWrapper.setProps({ disabled: true })
    toggle()
    expect(customWrapper.vm.visible).toBe(false)
    toggle()
    expect(customWrapper.vm.visible).toBe(false)
  })
})
