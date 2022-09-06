import config from '../../config/config.js';

const SingletonCarts = (function () {
    let instance;   

   async function createInstance() {
        switch (config.app.persistence) {
                       case 'MONGO':                
                let { default: cartsDaoMongoDB } = await import('./cartsDaoMongoDB.js');
                return new cartsDaoMongoDB();

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


export default SingletonCarts