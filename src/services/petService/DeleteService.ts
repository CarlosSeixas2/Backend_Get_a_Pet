import { Request } from 'express'

import PetRepository from '@repository/petRepository'

import AppError from '@errors/AppError'

export default class DeleteService {
  static async execute(req: Request) {
    const { id } = req.params

    const pet = await PetRepository.findById(Number(id))

    if (!pet) {
      throw new AppError('Pet não encontrado', 404)
    }

    await PetRepository.delete(Number(id))

    return {
      message: 'Pet deletado com sucesso',
    }
  }
}
