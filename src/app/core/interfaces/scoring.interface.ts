import { Paper } from './paper.interface';
import { ReputationModelDTO } from './reputation-model.interface';

export interface Scoring {
  timestamp: Date;
  score: number;
  paper: Paper;
  reputationModel: ReputationModelDTO;
}
