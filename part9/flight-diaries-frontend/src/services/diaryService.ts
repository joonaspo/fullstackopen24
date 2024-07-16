const baseUrl = 'http://localhost:3000/api'
import axios from 'axios'
import { Diary, DiaryEntry } from '../types'

interface Api {
    data?: DiaryEntry,
    error?: string
}

const getAll = async () => {
    const {data} = await axios.get<Diary[]>(`${baseUrl}/diaries`)
    return data
}

const createNew = async (diaryObject: DiaryEntry): Promise<Api> => {
    try {
        const newDiary = await axios.post<DiaryEntry>(`${baseUrl}/diaries`, diaryObject)
        return {data: newDiary.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data
            console.log(errorMessage)
            return {error: errorMessage}
        } else {
            return {error: 'error'}
        }
    }
}

export default {getAll, createNew}