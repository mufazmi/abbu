import express, { Request } from 'express';
import { AsdfController } from '@modules/asdf/controllers'
import { Constants } from '@core/constants';
const am = require('@core/middlewares/async-middleware');

const router = express.Router();

router.post('/', am(AsdfController.create))
router.get('/', am(AsdfController.findAll))
router.get('/:id', am(AsdfController.findOne))
router.patch('/:id', am(AsdfController.update))

export default router;