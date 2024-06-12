// types/submission.type.ts
import { ObjectId } from 'mongoose';

export interface ISubmission {
  _id?: any;
  assignmentId: string | ObjectId;
  studentId: string | ObjectId;
  timestamp?: Date;
  file: string;
  grade?: number;
}

export type SubmissionRequestBody = Omit<ISubmission, "_id" | "timestamp">;
