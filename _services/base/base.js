
const express = require('express');
const Router = express.Router
const logger = require('../../_utils/logger')


module.exports =class BaseRouter extends Router {
    _service = null
    constructor(service){
        super()
        if(!service) 
        {
            logger.warn("Service have not been initialized!")
        }
        this._service = service

    }

}