import * as restify from 'restify' // carregando o arquivo restify
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import{handlerError} from './error.handler'



export class Server{

  application: restify.Server

  initializeDb(){
    (<any>mongoose).Promise = global.Promise
    mongoose.connect(process.env.MONGOLAB_URI, function (error) {
      if (error) console.error(error);
      else console.log('mongo connected');
    })
  }

  initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject)=>{
      try{

        this.application = restify.createServer({
          name:'nail-hear',
          version:'1.0.0'
        })

        this.application.use(restify.plugins.queryParser())
        this.application.use(restify.plugins.bodyParser())


        //rotas
        for(let router of routers){
          router.applyRoutes(this.application)
        }

        this.application.listen(environment.server.port,()=>{
          resolve(this.application)
        })

        this.application.on('restifyError', handlerError)

      }catch(error){
        reject(error)
      }
    })
  }
  bootstrap(routers: Router[] = []): Promise<Server>{
    return this.initializeDb().then(()=>
      this.initRoutes(routers).then(()=>this))

  }
}
