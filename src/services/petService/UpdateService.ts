import { Request } from 'express'

import AppError from '@errors/AppError'
import PetRepository from '@repository/petRepository'

export default class UpdateService {
  static async execute(req: Request) {
    const { id } = req.params
    const { age, description, weight, color, images, userId, adopted } =
      req.body

    if (!age || !description || !weight || !color || !images || !userId) {
      throw new AppError('Campos obrigatórios não preenchidos', 400)
    }

    return await PetRepository.update({
      id: Number(id),
      age,
      description,
      weight,
      color,
      images,
      userId,
      adopted,
    })
  }
}
