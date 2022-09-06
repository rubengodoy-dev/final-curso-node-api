import mongoose from 'mongoose';

class MongoDBContainer {

    constructor(model) {

        this.model = model;
    }


    async getByFilter(filter) {
        const results = await this.model.find(filter)
        return results.map(result => result.toObject())
    }

    async getById(id) {
       if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const item = await this.model.findOne({_id:id});
        if (item) {
            return item.toObject()
        } else {
            return null
        }

    }

    async getByField(field, value, findOne = true) {
        try {
            let result;
            if (findOne) {
                result = await this.model.findOne({ [field]: value });
            } else {
                result = await this.model.find({ [field]: value });
            }
            return result ? result : null;
        } catch (error) {
            return `Hubo un error "${error}"`
        }
    }

    async getAll() {

        const all = await this.model.find({});
        return all.map(result => result.toObject());

    }

    async save(item) {

        const id = await this.model.create(item);
        // console.log('MongoDBContainer save')
        // console.log(id)
        return id.toObject();

    }

    async update(content, id) {

        console.log(content)
        // let item = await this.model.updateOne({ _id: id }, content)
        const item = await this.model.findOneAndUpdate({ _id: id }, content, { new: true });
        if (item) {
            return item.toObject()
        } else {
            return null
        }


    }

    async delete(id) {
        let item = await this.model.deleteOne({ _id: id })
        console.log(item)
        if (item?.deletedCount === 1) {
            return ({ id })
        } else {
            return null
        }

    }


}

export default MongoDBContainer;