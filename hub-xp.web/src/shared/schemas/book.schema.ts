import * as yup from 'yup'

export const createBookSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  author: yup.string().required('Autor é obrigatório'),
  avaliation: yup
    .number()
    .required('Avaliação é obrigatória')
    .min(0, 'Avaliação deve ser maior ou igual a 0')
    .max(5, 'Avaliação deve ser menor ou igual a 5'),
  description: yup.string().required('Descrição é obrigatória'),
})

export const updateBookSchema = yup.object({
  name: yup.string(),
  author: yup.string(),
  avaliation: yup
    .number()
    .min(0, 'Avaliação deve ser maior ou igual a 0')
    .max(5, 'Avaliação deve ser menor ou igual a 5'),
  description: yup.string(),
})

export type CreateBookFormData = yup.InferType<typeof createBookSchema>
export type UpdateBookFormData = yup.InferType<typeof updateBookSchema> 