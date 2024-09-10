
import pkg from 'mongoose';
const {Schema, model, models, Document} = pkg;

export interface ISession extends Document {
  helper: string | null;
  seeker: string | null;
  active: boolean;
}

const sessionSchema = new Schema<ISession>({
  helper: { type: Schema.Types.ObjectId, ref: "User", default: null },
  seeker: { type: Schema.Types.ObjectId, ref: "User", default: null },
  active: { type: Boolean, default: true },
});

export const Session = models.Session || model<ISession>("Session", sessionSchema);
