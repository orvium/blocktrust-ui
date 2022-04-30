import { CREDIT_TYPE } from '../enums/credit-type.enum';
import { USER_TYPE } from '../enums/user-type.enum';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  aboutMe: string;
  orcid: string;
  linkedin: string;
  blog: string;
  role: string;
  starredPapers: string[];
  isOnboarded: boolean;
  acceptedTC: boolean;
  disciplines: string[];
  userType: USER_TYPE;
  sub: string;
}

export interface Author {
  name: string;
  surname: string;
  nickname?: string;
  email?: string;
  orcid?: string;
  gravatar?: string;
  credit: CREDIT_TYPE[];
}
