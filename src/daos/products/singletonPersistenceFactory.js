import config from '../../config/config.js';

const Singleton = (function () {
    let instance;   

   async function createInstance() {
        switch (config.app.persistence) {
                       case 'MONGO':                
                let { default: productsDaoMongoDB } = await import('./productsDaoMongoDB.js');
                return new productsDaoMongoDB();

        }
    }

    return {
        getInstance: async function () {
            if (!instance) {
                instance = await createInstance();
            }
            return instance;
        }
    };
})();


export default Singleton