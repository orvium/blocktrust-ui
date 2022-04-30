import { REVIEW_DECISION } from '../enums/review-decision.enum';
import { REVIEW_KIND } from '../enums/review-kind.enum';
import { REVIEW_STATUS } from '../enums/review-status.enum';
import { FileMetadata } from './file-metadata.interface';
import { Paper } from './paper.interface';
import { User } from './user.interface';

export interface Review {
  _id: string;
  creator: User;
  title: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  publicationDate: Date;
  wasInvited?: boolean;
  transactions?: Record<string, unknown>;
  doi?: string;
  socialComments: string[];
  canBeReviewed: boolean;
  reward?: number;
  revealReviewerIdentity: boolean;
  paper: Paper;
  decision?: REVIEW_DECISION;
  status: REVIEW_STATUS;
  file?: FileMetadata;
  kind: REVIEW_KIND;
}
