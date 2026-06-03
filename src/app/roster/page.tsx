import RosterBoard from '@/components/RosterBoard';

export default function RosterPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 48px)' }}>
      <RosterBoard />
    </div>
  );
}
