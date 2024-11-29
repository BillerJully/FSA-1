import { AxiosResponse } from 'axios'
import { ITransaction } from '../models/ITransaction'
import api from '../http'

export default class AuthService {
    static async getTransactions(): Promise<AxiosResponse<ITransaction[]>> {
        return api.get<ITransaction[]>('/transactions')
    }
}
