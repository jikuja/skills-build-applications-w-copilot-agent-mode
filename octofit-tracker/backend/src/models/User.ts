import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    goals: { type: [String], default: [] },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = model('User', userSchema);

export default User;
