var contactsStore = {}

contactsStore.findAll = function () {
  var contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
  return Promise.resolve(contacts)
}

contactsStore.add = function (contact) {
  contact.id = Math.random().toString(36).substr(2, 7)

  return contactsStore.findAll()

  .then(function (contacts) {
    contacts.push(contact)
    localStorage.setItem('contacts', JSON.stringify(contacts))

    return contact
  })
}

contactsStore.update = function (updatedContact) {
  return contactsStore.findAll()

  .then(function (contacts) {
    contacts.forEach(function (contactItem) {
      if (contactItem.id === updatedContact.id) {
        contactItem.name = updatedContact.name
        contactItem.contact = updatedContact.contact
        contactItem.note = updatedContact.note
      }
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))

    return updatedContact
  })
}

contactsStore.remove = function (id) {
  return contactsStore.findAll()

  .then(function (contacts) {
    contacts = contacts.filter(function (contact) {
      return contact.id !== id
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
  })
}
