export class Challenge {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly difficulty: Difficulty,
    public readonly category: CategoryMain,
    public readonly subCategories: string[],
    public readonly starterCodeUrl: string,
    public readonly submissionCount: number,
    public readonly createdBy: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type CategoryMain = 'FRONTEND' | 'BACKEND' | 'FULLSTACK';
