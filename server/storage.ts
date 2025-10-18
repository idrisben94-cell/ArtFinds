import { type GameSession, type UserScore } from "@shared/schema";

export interface IStorage {
  getGameSession(userId: string, channelId: string): Promise<GameSession | undefined>;
  createGameSession(session: GameSession): Promise<GameSession>;
  deleteGameSession(userId: string, channelId: string): Promise<void>;
  
  getUserScore(userId: string): Promise<UserScore | undefined>;
  updateUserScore(score: UserScore): Promise<UserScore>;
  getTopScores(limit: number): Promise<UserScore[]>;
}

export class MemStorage implements IStorage {
  private gameSessions: Map<string, GameSession>;
  private userScores: Map<string, UserScore>;

  constructor() {
    this.gameSessions = new Map();
    this.userScores = new Map();
  }

  private getSessionKey(userId: string, channelId: string): string {
    return `${userId}:${channelId}`;
  }

  async getGameSession(userId: string, channelId: string): Promise<GameSession | undefined> {
    return this.gameSessions.get(this.getSessionKey(userId, channelId));
  }

  async createGameSession(session: GameSession): Promise<GameSession> {
    const key = this.getSessionKey(session.userId, session.channelId);
    this.gameSessions.set(key, session);
    return session;
  }

  async deleteGameSession(userId: string, channelId: string): Promise<void> {
    this.gameSessions.delete(this.getSessionKey(userId, channelId));
  }

  async getUserScore(userId: string): Promise<UserScore | undefined> {
    return this.userScores.get(userId);
  }

  async updateUserScore(score: UserScore): Promise<UserScore> {
    this.userScores.set(score.userId, score);
    return score;
  }

  async getTopScores(limit: number): Promise<UserScore[]> {
    const scores = Array.from(this.userScores.values());
    return scores
      .sort((a, b) => b.correctGuesses - a.correctGuesses)
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
