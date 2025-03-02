import express, { Request } from 'express';
import { BaseController } from '@modules/base/controllers'
import { Constants } from '@core/constants';
const am = require('@core/middlewares/async-middleware');

const router = express.Router();

router.post('/', am(BaseController.create))
router.get('/', am(BaseController.findAll))
router.get('/:id', am(BaseController.findOne))
router.patch('/:id', am(BaseController.update))

export default router;