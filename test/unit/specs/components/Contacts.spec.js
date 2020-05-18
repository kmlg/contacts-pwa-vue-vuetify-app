import { mount } from "avoriaz"
import { expect } from "chai"
import Contacts from "../../../../src/components/contacts/Contacts.vue"

describe("Contacts", () => {
  it("renders contacts component", () => {
    const header = mount(Contacts)
    expect(header.vm._isVue).to.equal(true)
  })
})
