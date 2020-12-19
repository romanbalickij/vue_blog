import axios from "@/api/axios";

const getUrl = slug => `/articles/${slug}/favorite`

const addToFaforites = slug =>{
    const url = getUrl(slug)
    return axios.post(url).then(response => response.data.article)
}

const removeFromFaforites = slug =>{
    const url = getUrl(slug)
    return axios.delete(url).then(response => response.data.article)
}

export default {
    addToFaforites,
    removeFromFaforites
}