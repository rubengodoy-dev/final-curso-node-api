import config from '../../config/config.js';

const SingletonMessages = (function () {
    let instance;   

   async function createInstance() {
        switch (config.app.persistence) {
                       case 'MONGO':                
                let { default: messagesDaoMongoDB } = await import('./messagesDaoMongoDB.js');
                return new messagesDaoMongoDB();

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


export default SingletonMessages