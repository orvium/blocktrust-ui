import { CREDIT_TYPE } from '../enums/credit-type.enum';

export class AuthorDTO {
  name!: string;
  surname!: string;
  nickname?: string;
  email?: string;
  orcid?: string;
  gravatar?: string;
  credit: CREDIT_TYPE[] = [];
}
