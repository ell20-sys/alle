import pkg from 'mongoose';
const {Schema, model, models, Document} = pkg;

export interface IUser extends Document {
  nickname: string;
  role: "seeker" | "helper";
  sessionId: string | null;
}

const userSchema = new Schema<IUser>({
  nickname: { type: String, required: true },
  role: { type: String, enum: ["seeker", "helper"], required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: "Session", default: null },
});

export const User = models.User || model<IUser>("User", userSchema);
