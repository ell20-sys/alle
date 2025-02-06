import { User, IUser } from '~/models/user.server';
import { Session, ISession } from '~/models/session.server';

/**
 * Finds a user with the opposite role who is not yet in a session.
 */
export async function findUserMatch(role: IUser['role']): Promise<{ match?: IUser }> {
  try {
    const oppositeRole = role === 'seeker' ? 'helper' : 'seeker';
    const match = await User.findOne({ role: oppositeRole, sessionId: null });
    return { match };
  } catch (error) {
    console.error('Error finding user match:', error);
    throw new Error('Error finding user match');
  }
}

/**
 * Creates a user and a session if a match exists.
 */
export async function createUserAndSession(
  nickname: string,
  role: IUser['role'],
  match?: IUser
): Promise<{ newUser: IUser; sessionId?: ISession['_id'] }> {
  try {
    let sessionId = null;

    if (match) {
      const newSession = await Session.create({
        [role]: match._id,
        [match.role]: match._id,
      });
      sessionId = newSession._id;
      match.sessionId = newSession._id;
      await match.save();
    }

    const newUser = await User.create({
      nickname,
      role,
      sessionId,
    });

    return { newUser, sessionId };
  } catch (error) {
    console.error('Error creating user and session:', error);
    throw new Error('Error creating user and session');
  }
}
