import { Dispatch } from '../types/dispatch';

export const PLACEHOLDER_DISPATCHES: Dispatch[] = [
  {
    assignmentId: 'asn-001', poolCaseId: 'pool-001',
    hospitalName: '高醫', ward: '8B-512',
    patientSnapshot: '陳先生 78 歲 60kg',
    patientCondition: '失智症, 行動不便, 需協助翻身',
    shiftType: '醫24',
    startDatetime: '2026-05-30T08:00:00', endDatetime: '2026-05-31T08:00:00',
    shiftUnits: 1, familyName: '陳太太', familyPhone: '0912-345-678',
    labels: ['高雄', '高醫', '失智'], matchType: 'B_full',
    status: 'PENDING', assignedAt: '2026-05-29T09:00:00',
  },
  {
    assignmentId: 'asn-002', poolCaseId: 'pool-002',
    hospitalName: '阮綜合', ward: '5A-301',
    patientSnapshot: '李太太 65 歲 50kg',
    patientCondition: '骨折術後復健',
    shiftType: '居白',
    startDatetime: '2026-06-01T08:00:00', endDatetime: '2026-06-01T20:00:00',
    shiftUnits: 1, familyName: '李先生', familyPhone: '0987-654-321',
    labels: ['高雄', '復健'], matchType: 'A_partial',
    status: 'PENDING', assignedAt: '2026-05-29T09:30:00',
  },
];
