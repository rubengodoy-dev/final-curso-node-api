import config from '../../config/config.js';

const SingletonOrders = (function () {
    let instance;   

   async function createInstance() {
        switch (config.app.persistence) {
                       case 'MONGO':                
                let { default: ordersDaoMongoDB } = await import('./ordersDaoMongoDB.js');
                return new ordersDaoMongoDB();

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


export default SingletonOrders