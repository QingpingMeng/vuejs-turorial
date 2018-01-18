const baseURL = 'https://api.fullstackweekly.com'
const fetch = require('node-fetch')

const appService = {
  getPosts (categoryId) {
    return fetch(`${baseURL}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=6`)
      .then(res => res.json())
  },

  async getProfile () {
    return fetch(`${baseURL}/services/profile.php`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    })
      .then(res => res.text())
  },

  login (credentials) {
    return fetch(`${baseURL}/services/auth.php`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(credentials)
    })
      .then(res => res.text())
  }
}

export default appService
