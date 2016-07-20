var $form = document.querySelector('#add-form')
var $table = document.querySelector('#list-table')

$form.addEventListener('submit', function (event) {
  event.preventDefault()

  var name = document.querySelector('#name').value
  var $row = document.createElement('tr')
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
})

$table.addEventListener('click', function (event) {
  event.preventDefault()

  var $button = event.target
  var $row = $button.closest('tr')
  var action = $button.dataset.action
  var $inputs
  var name
  var contact
  var note

  if (action === 'delete') {
    $row.remove()
  }

  if (action === 'edit') {
    var $cells = $row.querySelectorAll('td')
    name = $cells[0].textContent.trim()
    contact = $cells[1].textContent.trim()
    note = $cells[2].textContent.trim()

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
    $inputs = $row.querySelectorAll('input, textarea')
    name = $inputs[0].value
    contact = $inputs[1].value
    note = $inputs[2].value

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

  if (action === 'cancel') {
    $inputs = $row.querySelectorAll('input, textarea')
    name = $inputs[0].dataset.original
    contact = $inputs[1].dataset.original
    note = $inputs[2].dataset.original

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
