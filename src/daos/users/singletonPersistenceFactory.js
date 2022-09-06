import config from '../../config/config.js';

const Singleton = (function () {
    let instance;   

   async function createInstance() {
        switch (config.app.persistence) {
            case 'ARRAY':
                let { default: usersDaoArray } = await import('./usersDaoArray.js');
                return new usersDaoArray();
            case 'FILE':
                let { default: usersDaoFile } = await import('./usersDaoFile.js');
                return new usersDaoFile();
            case 'MONGO':                
                let { default: usersDaoMongoDB } = await import('./usersDaoMongoDB.js');
                return new usersDaoMongoDB();

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