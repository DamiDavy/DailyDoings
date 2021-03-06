import axios from 'axios';

const instanse = axios.create({
  baseURL: "https://locacalendarapi.herokuapp.com/",
  withCredentials: true,
})

export const authAPI = {
  async isAuth(session) {
    const response = await instanse.post(`is-auth`, { session })
    const results = response.data
    return results
  },
  async login(login, password) {
    const response = await fetch('https://locacalendarapi.herokuapp.com/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        login, password
      })
    })
    const results = await response.json()
    return results
  },
  async logout(session) {
    console.log(session)
    const response = await instanse.post(`logout`, { session })
    const results = response.data
    return results
  },
  async register(login, email, password, confirmation) {
    const response = await fetch('https://locacalendarapi.herokuapp.com/registration', {
      method: 'POST',
      body: JSON.stringify({
        login, email, password, confirmation,
      })
    })
    const results = await response.json()
    return results
  }
}

export const todoAPI = {
  async fetchTodos(session, year, month) {
    const response = await instanse.get(`todos/${session}/${year}/${month}`)
    const results = response.data
    return results
  },
  async addTodoFetch(session, title, date) {
    const response = await instanse.post(`todo`, { session, title, date })
    const results = response.data
    return results
  },
  async editTodoFetch(id, title) {
    const response = await instanse.put(`todo/${id}`, { title })
    const results = response.data
    return results
  },
  async deleteTodoFetch(id) {
    const response = await instanse.delete(`todo/${id}`)
    const results = response.data
    return results
  }
}