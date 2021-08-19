export const authAPI = {
  async login(name, password) {
    const response = await fetch('https://locacalendarapi.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify({
        login: name,
        password: password,
      })
    })
    const results = await response.json();
    console.log(results)
    return results
  },
  async logout() {
    const response = await fetch(`https://locacalendarapi.herokuapp.com/logout`)
    const results = await response.json()
    console.log(results)
    return results
  },
  async register(name, email, password, confirmation) {
    const response = await fetch('https://locacalendarapi.herokuapp.com/registration', {
      method: 'POST',
      body: JSON.stringify({
        login: name,
        email: email,
        password: password,
        confirmation: confirmation,
      })
    })
    const results = await response.json();
    console.log(results)
    return results
  }
}

export const todoAPI = {
 async fetchTodos(user, year, month) {
    const response = await fetch(`https://locacalendarapi.herokuapp.com/todos`, {
      method: 'POST',
      body: JSON.stringify({
        login: user,
        year: year,
        month: month,
      })
    })
    const results = await response.json()
    return results
  },
  async addTodoFetch(user, title, date) {
    const response = await fetch(`https://locacalendarapi.herokuapp.com/todo`, {
      method: 'POST',
      body: JSON.stringify({
        user: user,
        title: title,
        date: date,
      })
    })
    const results = await response.json();
    console.log(results)
    return results
  },
  async deleteTodoFetch(id) {
    const response = await fetch(`https://locacalendarapi.herokuapp.com/todo`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
      })
    })
    const results = await response.json();
    console.log(results)
    return results
  }
}