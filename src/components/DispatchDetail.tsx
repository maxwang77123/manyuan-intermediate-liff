import { Dispatch } from '../types/dispatch';
import { InfoRow } from './InfoRow';
import { DetailSection } from './DetailSection';

interface Props { dispatch: Dispatch; onAccept: () => void; onDecline: () => void; onBack: () => void; }

export function DispatchDetail({ dispatch: d, onAccept, onDecline, onBack }: Props) {
  return (
    <div style={{ padding: 16, background: '#F3F4F6', minHeight: '100vh', paddingBottom: 80 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: 15, cursor: 'pointer', padding: '4px 0' }}>← 返回列表</button>
      <DetailSection title="醫院 / 病房">
        <InfoRow label="醫院" value={d.hospitalName ?? '-'} />
        <InfoRow label="病房" value={d.ward ?? '-'} />
      </DetailSection>
      <DetailSection title="病患">
        <InfoRow label="基本資料" value={d.patientSnapshot ?? '-'} />
        <InfoRow label="病況" value={d.patientCondition ?? '-'} />
      </DetailSection>
      <DetailSection title="班別 / 時間">
        <InfoRow label="班別" value={d.shiftType ?? '-'} />
        <InfoRow label="開始" value={d.startDatetime?.replace('T', ' ').slice(0, 16) ?? '-'} />
        <InfoRow label="結束" value={d.endDatetime?.replace('T', ' ').slice(0, 16) ?? '-'} />
      </DetailSection>
      <DetailSection title="家屬聯絡">
        <InfoRow label="家屬" value={d.familyName ?? '-'} />
        <InfoRow label="電話" value={d.familyPhone ?? '-'} />
      </DetailSection>
      {d.labels && d.labels.length > 0 && (
        <DetailSection title="案件標籤">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4 }}>
            {d.labels.map((l) => <span key={l} style={{ background: '#E0E7FF', color: '#3730A3', padding: '4px 10px', borderRadius: 12, fontSize: 12 }}>{l}</span>)}
          </div>
        </DetailSection>
      )}
      {d.status === 'PENDING' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', gap: 8 }}>
          <button onClick={onDecline} style={{ flex: 1, padding: 12, background: '#F3F4F6', color: '#6B7280', border: 'none', borderRadius: 8, fontSize: 15, cursor: 'pointer' }}>婉拒</button>
          <button onClick={onAccept} style={{ flex: 2, padding: 12, background: '#10B981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>接案</button>
        </div>
      )}
    </div>
  );
}
