import Joi from "joi"

class AsdfValidation {

    create = Joi.object({
        name: Joi.string().min(2).max(100).required(),
    })

    update = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
    })

}

export default new AsdfValidation