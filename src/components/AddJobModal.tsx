'use client';

import { useState } from 'react';
import { TRAVEL_STAFF, CLEANING_STAFF, AGENTS, VEHICLES } from '@/data/mockData';
import type { TravelJob, CleaningJob, Division } from '@/types';

interface Props {
  division: Division;
  defaultDate?: string;
  defaultStaff?: string;
  onSave: (job: TravelJob | CleaningJob) => void;
  onClose: () => void;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function AddJobModal({ division, defaultDate = '', defaultStaff = '', onSave, onClose }: Props) {
  const isTravelDiv = division === 'travel';

  const [form, setForm] = useState({
    date:        defaultDate,
    staffCode:   defaultStaff,
    // travel
    agtCode:     'JTB',
    tourName:    '',
    tourNo:      '',
    serviceDesc: '',
    pax:         '2',
    inf:         '0',
    tc:          '0',
    startTime:   '0430',
    finishTime:  '0900',
    startPlace:  'JQ26',
    finishPlace: 'PAC',
    coachCode:   'P5',
    agtHr:       '3',
    payHr:       '3',
    unitPrice:   '102',
    note:        '',
    // cleaning
    clientName:  '',
    suburb:      '',
    street:      '',
    hours:       '2',
    type:        'Weekly',
    keyRequired: false,
    notes:       '',
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.date || !form.staffCode) return;

    if (isTravelDiv) {
      const job: TravelJob = {
        id:          `t${uid()}`,
        date:        form.date,
        staffCode:   form.staffCode,
        bkNo:        String(1137000 + Math.floor(Math.random() * 999)),
        agtCode:     form.agtCode,
        tourName:    form.tourName,
        tourNo:      form.tourNo,
        serviceDesc: form.serviceDesc,
        pax:         Number(form.pax),
        inf:         Number(form.inf),
        tc:          Number(form.tc),
        startTime:   form.startTime.replace(':', ''),
        finishTime:  form.finishTime.replace(':', ''),
        startPlace:  form.startPlace,
        finishPlace: form.finishPlace,
        coachCode:   form.coachCode,
        agtHr:       Number(form.agtHr),
        payHr:       Number(form.payHr),
        unitPrice:   Number(form.unitPrice),
        agtFees:     Number(form.unitPrice) * Number(form.pax),
        note:        form.note,
      };
      onSave(job);
    } else {
      const job: CleaningJob = {
        id:          `c${uid()}`,
        date:        form.date,
        staffCode:   form.staffCode,
        clientName:  form.clientName,
        suburb:      form.suburb,
        street:      form.street,
        startTime:   form.startTime.replace(':', ''),
        finishTime:  form.finishTime.replace(':', ''),
        hours:       Number(form.hours),
        type:        form.type as 'Weekly' | 'Fortnightly' | 'One-off',
        notes:       form.notes,
        keyRequired: Boolean(form.keyRequired),
        confirmed:   false,
      };
      onSave(job);
    }
  };

  const staff = isTravelDiv ? TRAVEL_STAFF : CLEANING_STAFF;
  const accentCls = isTravelDiv
    ? 'bg-emerald-600 hover:bg-emerald-700'
    : 'bg-sky-600 hover:bg-sky-700';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={`px-5 py-4 rounded-t-2xl ${isTravelDiv ? 'bg-emerald-600' : 'bg-sky-600'} text-white flex items-center justify-between`}>
          <div>
            <h2 className="font-bold text-base">
              {isTravelDiv ? '✈ 旅行・送迎ジョブ追加' : '🧹 清掃ジョブ追加'}
            </h2>
            <p className="text-xs opacity-80 mt-0.5">必須項目（*）を入力してください</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors">×</button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">

          {/* Common: date + staff */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="日付 *">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="input-field" />
            </Field>
            <Field label="担当スタッフ *">
              <select value={form.staffCode} onChange={e => set('staffCode', e.target.value)}
                className="input-field">
                <option value="">選択してください</option>
                {staff.map(s => (
                  <option key={s.code} value={s.code}>{s.code} — {s.firstName} {s.lastName}</option>
                ))}
              </select>
            </Field>
          </div>

          {isTravelDiv ? (
            <>
              {/* Agent + Tour */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="エージェント *">
                  <select value={form.agtCode} onChange={e => set('agtCode', e.target.value)} className="input-field">
                    {AGENTS.map(a => <option key={a.code} value={a.code}>{a.code} — {a.name}</option>)}
                  </select>
                </Field>
                <Field label="ツアーNo">
                  <input value={form.tourNo} onChange={e => set('tourNo', e.target.value)}
                    placeholder="例: 7A60477513" className="input-field" />
                </Field>
              </div>
              <Field label="ツアー名 *">
                <input value={form.tourName} onChange={e => set('tourName', e.target.value)}
                  placeholder="例: JTB MED A1450<KAMI>GRP11" className="input-field" />
              </Field>
              <Field label="サービス内容 *">
                <input value={form.serviceDesc} onChange={e => set('serviceDesc', e.target.value)}
                  placeholder="例: I APT/HTL COACH WZ GD" className="input-field" />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="PAX"><input type="number" min="0" value={form.pax} onChange={e => set('pax', e.target.value)} className="input-field" /></Field>
                <Field label="乳幼児"><input type="number" min="0" value={form.inf} onChange={e => set('inf', e.target.value)} className="input-field" /></Field>
                <Field label="TC"><input type="number" min="0" value={form.tc} onChange={e => set('tc', e.target.value)} className="input-field" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="開始時刻">
                  <input type="time" value={form.startTime.length === 4 ? `${form.startTime.slice(0,2)}:${form.startTime.slice(2)}` : form.startTime}
                    onChange={e => set('startTime', e.target.value)} className="input-field" />
                </Field>
                <Field label="終了時刻">
                  <input type="time" value={form.finishTime.length === 4 ? `${form.finishTime.slice(0,2)}:${form.finishTime.slice(2)}` : form.finishTime}
                    onChange={e => set('finishTime', e.target.value)} className="input-field" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="出発地"><input value={form.startPlace} onChange={e => set('startPlace', e.target.value)} placeholder="例: JQ26" className="input-field" /></Field>
                <Field label="到着地"><input value={form.finishPlace} onChange={e => set('finishPlace', e.target.value)} placeholder="例: PAC" className="input-field" /></Field>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field label="車両">
                  <select value={form.coachCode} onChange={e => set('coachCode', e.target.value)} className="input-field">
                    {VEHICLES.map(v => <option key={v.code} value={v.code}>{v.code} ({v.capacity}名)</option>)}
                  </select>
                </Field>
                <Field label="代理店時間">
                  <input type="number" step="0.25" value={form.agtHr} onChange={e => set('agtHr', e.target.value)} className="input-field" />
                </Field>
                <Field label="単価 ($)">
                  <input type="number" value={form.unitPrice} onChange={e => set('unitPrice', e.target.value)} className="input-field" />
                </Field>
              </div>
              <Field label="備考">
                <textarea value={form.note} onChange={e => set('note', e.target.value)} rows={2}
                  className="input-field resize-none" placeholder="特記事項があれば入力" />
              </Field>
            </>
          ) : (
            <>
              {/* Cleaning fields */}
              <Field label="顧客名 *">
                <input value={form.clientName} onChange={e => set('clientName', e.target.value)}
                  placeholder="例: Sarah" className="input-field" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="地区 *">
                  <input value={form.suburb} onChange={e => set('suburb', e.target.value)}
                    placeholder="例: Redlynch" className="input-field" />
                </Field>
                <Field label="住所">
                  <input value={form.street} onChange={e => set('street', e.target.value)}
                    placeholder="例: 14 Maple St" className="input-field" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="開始時刻">
                  <input type="time" value={form.startTime.length === 4 ? `${form.startTime.slice(0,2)}:${form.startTime.slice(2)}` : form.startTime}
                    onChange={e => set('startTime', e.target.value)} className="input-field" />
                </Field>
                <Field label="終了時刻">
                  <input type="time" value={form.finishTime.length === 4 ? `${form.finishTime.slice(0,2)}:${form.finishTime.slice(2)}` : form.finishTime}
                    onChange={e => set('finishTime', e.target.value)} className="input-field" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="作業時間 (h) *">
                  <input type="number" step="0.25" min="0.25" value={form.hours}
                    onChange={e => set('hours', e.target.value)} className="input-field" />
                </Field>
                <Field label="種別 *">
                  <select value={form.type} onChange={e => set('type', e.target.value)} className="input-field">
                    <option value="Weekly">毎週</option>
                    <option value="Fortnightly">隔週</option>
                    <option value="One-off">スポット</option>
                  </select>
                </Field>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="keyRequired" checked={Boolean(form.keyRequired)}
                  onChange={e => set('keyRequired', e.target.checked)}
                  className="w-4 h-4 accent-sky-600" />
                <label htmlFor="keyRequired" className="text-sm text-gray-700">🔑 鍵が必要</label>
              </div>
              <Field label="備考">
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
                  className="input-field resize-none" placeholder="アクセス方法、注意事項など" />
              </Field>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button onClick={handleSave}
            disabled={!form.date || !form.staffCode}
            className={`flex-1 ${accentCls} text-white rounded-lg py-2.5 text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm`}>
            ジョブを追加
          </button>
          <button onClick={onClose}
            className="flex-1 bg-white border border-gray-200 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
            キャンセル
          </button>
        </div>
      </div>

      <style>{`.input-field { width: 100%; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; outline: none; transition: border-color 0.15s; } .input-field:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
