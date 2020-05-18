import { mount } from "avoriaz"
import { expect } from "chai"
import DefaultLayout from "../../../../src/views/default-layout.vue"

describe("DefaultLayout", () => {
  it("renders header component", () => {
    const header = mount(DefaultLayout)
    expect(header.vm._isVue).to.equal(true)
  })
})
