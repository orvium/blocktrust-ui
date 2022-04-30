import { User } from './user.interface';

export class ReputationModelDTO {
  _id!: string;
  creator!: User;
  name!: string;
  description!: string;
  version!: number;
  sourceCodeURL!: string;
  provider!: string;
  createdAt: Date;
  updatedAt: Date;
}
