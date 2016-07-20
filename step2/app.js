var $form = document.querySelector('#add-form')
var $table = document.querySelector('#list-table')

var contacts = JSON.parse(localStorage.getItem('contacts') || '[]')

contacts.forEach(function (contact) {
  var $row = document.createElement('tr')
  $row.dataset.id = contact.id
  $row.innerHTML = `
    <td>
      ${contact.name}
    </td>
    <td>
      ${contact.contact || '-'}
    </td>
    <td>
      ${contact.note || '-'}
    </td>
    <td class="actions">
      <a href="#" data-action="edit">edit</a> |
      <a href="#" data-action="delete">delete</a>
    </td>
  `
  $table.appendChild($row)
})

$form.addEventListener('submit', function (event) {
  event.preventDefault()

  var name = document.querySelector('#name').value
  var id = Math.random().toString(36).substr(2, 7)
  var $row = document.createElement('tr')
  $row.dataset.id = id
  $row.innerHTML = `
    <td>
      ${name}
    </td>
    <td>
      -
    </td>
    <td>
      -
    </td>
    <td class="actions">
      <a href="#" data-action="edit">edit</a> |
      <a href="#" data-action="delete">delete</a>
    </td>
  `
  $table.appendChild($row)

  $form.reset()

  contacts.push({
    id: id,
    name: name
  })
  localStorage.setItem('contacts', JSON.stringify(contacts))
})

$table.addEventListener('click', function (event) {
  event.preventDefault()

  var $button = event.target
  var $row = $button.closest('tr')
  var id = $row.dataset.id
  var action = $button.dataset.action

  if (action === 'delete') {
    contacts = contacts.filter(function (contact) {
      return contact.id !== id
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
    $row.remove()
  }

  if (action === 'edit') {
    var $cells = $row.querySelectorAll('td')
    var name = $cells[0].textContent.trim()
    var contact = $cells[1].textContent.trim()
    var note = $cells[2].textContent.trim()

    $row.innerHTML = `
      <td>
        <input value="${name}" data-original="${name}">
      </td>
      <td>
        <input value="${contact}" data-original="${contact}">
      </td>
      <td>
        <textarea data-original="${note}">${note}</textarea>
      </td>
      <td class="actions">
        <button data-action="save">save</button>
        <a href="#" data-action="cancel">cancel</a>
      </td>
    `
  }

  if (action === 'save') {
    var $inputs = $row.querySelectorAll('input, textarea')
    var name = $inputs[0].value
    var contact = $inputs[1].value
    var note = $inputs[2].value

    $row.innerHTML = `
      <td>
        ${name}
      </td>
      <td>
        ${contact}
      </td>
      <td>
        ${note}
      </td>
      <td class="actions">
        <a href="#" data-action="edit">edit</a> |
        <a href="#" data-action="delete">delete</a>
      </td>
    `

    contacts.forEach(function (contactItem) {
      if (contactItem.id === id) {
        contactItem.name = name
        contactItem.contact = contact
        contactItem.note = note
      }
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }

  if (action === 'cancel') {
    var $inputs = $row.querySelectorAll('input, textarea')
    var name = $inputs[0].dataset.original
    var contact = $inputs[1].dataset.original
    var note = $inputs[2].dataset.original

    $row.innerHTML = `
      <td>
        ${name}
      </td>
      <td>
        ${contact}
      </td>
      <td>
        ${note}
      </td>
      <td class="actions">
        <a href="#" data-action="edit">edit</a> |
        <a href="#" data-action="delete">delete</a>
      </td>
    `
  }
})
