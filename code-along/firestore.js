document.addEventListener('DOMContentLoaded', async function(event) {

  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app

  let form = document.querySelector('form')
  form.addEventListener('submit', async function(event){
    event.preventDefault()

    // console.log('todo submitted')

    let todoText = document.querySelector('#todo').value
    // console.log(todoText)

    let todoList = document.querySelector('.todos')
    todoList.insertAdjacentHTML('beforeend',`
    <div href ='#' class="py-4 text-xl border-b-2 border-purple-500 w-full">
      ${todoText}
    </div>
    `)

    let docRef = await db.collection('todos').add({
      text: todoText
    })

    let todoID = docRef.id
    console.log(`new todo created: ${todoID}`)

    

    document.querySelector('#todo').value = ''
  })

  // Step 2: Read existing to-dos from Firestore

  let querySnapshot = await db.collection('todos').get()
  console.log(querySnapshot.size)

  let todos = querySnapshot.docs
  console.log(todos)

  for (let i=0; i<todos.length; i++) {
    let todoId = todos[i].id
    let todoData = todos[i].data()
    let todoText = todoData.text

    document.querySelector('.todos').insertAdjacentHTML('beforeend', `
    <div class="todo-${todoId} py-4 text-xl border-b-2 border-purple-500 w-full">
      <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
      ${todoText}
    </div>
  `)

  // Step 4: Add code to allow completing todos

  document.querySelector(`.todo-${todoId} .done`).addEventListener('click', async function(event) {
    event.preventDefault()
    
    document.querySelector(`.todo-${todoId}`).classList.add('opacity-20')
    
    await db.collection('todos').doc(todoId).delete()
  })
  }

  // Step 3: Add code to Step 1 to add todo to Firestore
  //up above under Step 1


})