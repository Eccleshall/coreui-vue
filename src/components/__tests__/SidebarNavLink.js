import { mount, createLocalVue } from 'vue-test-utils'
import VueRouter from 'vue-router'
import SidebarNavLink from "../Sidebar/SidebarNavLink";

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe("SidebarNavLink.vue", () => {
  // Inspect the raw component options
  test("should have default props", () => {
    const wrapper = mount(SidebarNavLink, {
      propsData: {
        name: 'test',
        url: '',
        icon: '',
        badge: {},
        variant: '',
        classes: ''
      }
    })
    expect(wrapper.props().name).toEqual('test')
    expect(wrapper.props().classes).toBe('')
    expect(typeof wrapper.props().badge).toBe('object')
  });
  it('has computed properties', () => {
    expect(typeof SidebarNavLink.computed.classList).toBe('function')
    expect(typeof SidebarNavLink.computed.classIcon).toBe('function')
    expect(typeof SidebarNavLink.computed.linkVariant).toBe('function')
    expect(typeof SidebarNavLink.computed.itemClasses).toBe('function')
    expect(typeof SidebarNavLink.computed.isExternalLink).toBe('function')
  })
  it('renders correctly', () => {
    const wrapper = mount(SidebarNavLink, { localVue, router })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.is('div')).toBe(true)
  })
});
