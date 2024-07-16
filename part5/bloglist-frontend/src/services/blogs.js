import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = newToken
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.post(baseUrl, newObject, config)
  return data
}

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.put(`${ baseUrl }/${id}`, updatedObject, config)
  return data
}

const deleteThis = async id => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

export default {
  getAll, setToken, create, deleteThis, update
}