import mongoose from 'mongoose';
const { Schema } = mongoose;

const tagSchema = new Schema({
    name: String,
    content: String
});

tagSchema.statics.findByName = function (name) {
    return this.find({ name: name });
}

const Tag = mongoose.model('Tag', tagSchema);

export { Tag };