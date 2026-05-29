export type ShiftType = '醫24' | '醫白' | '醫夜' | '居24' | '居白' | '居夜' | '喘息' | '年節';
export type AssignmentStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
export type MatchType = 'B_full' | 'A_partial' | 'MANUAL';

export interface Dispatch {
  assignmentId: string;
  poolCaseId: string;
  hospitalName?: string;
  ward?: string;
  patientSnapshot?: string;
  patientCondition?: string;
  shiftType?: ShiftType;
  startDatetime?: string;
  endDatetime?: string;
  shiftUnits?: number;
  familyName?: string;
  familyPhone?: string;
  labels?: string[];
  matchType?: MatchType;
  status: AssignmentStatus;
  assignedAt?: string;
}
