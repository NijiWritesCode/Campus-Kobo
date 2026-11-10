import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import WeeklySchedule from '../components/WeeklySchedule';
import DateExceptions from '../components/DateExceptions';
import { useProviderAvailability } from '../hooks/useProviderAvailability';

const BUFFER_OPTIONS = [0, 15, 30, 45, 60];

export default function AvailabilityManagement() {
  const {
    weeklySchedule,
    blockedDates,
    bufferMinutes,
    toggleDay,
    updateDayHours,
    addBlockedDate,
    removeBlockedDate,
    setBufferMinutes,
  } = useProviderAvailability();

  const handleSave = () => {
    toast.success('Availability settings saved!');
  };

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title="Schedule & Availability"
        subtitle="Manage working days around your UNILAG lectures and exams"
        backTo="/provider"
      />

      {/* Buffer Time Selector */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 font-display">
            Buffer Time Between Appointments
          </h3>
          <p className="text-xs text-neutral-500">
            Allow yourself rest, tool cleanup, and travel time between hostel rooms
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {BUFFER_OPTIONS.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setBufferMinutes(mins)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                bufferMinutes === mins
                  ? 'bg-purple-800 text-white border-purple-800 shadow-2xs font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {mins === 0 ? 'No Buffer' : `${mins} mins`}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 font-display">
            Regular Weekly Operating Hours
          </h3>
          <p className="text-xs text-neutral-500">
            Toggle days on or off and set your active working hours
          </p>
        </div>

        <WeeklySchedule
          schedule={weeklySchedule}
          onToggleDay={toggleDay}
          onUpdateHours={updateDayHours}
        />
      </div>

      {/* Blocked Dates */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 font-display">
            Academic & Date Exceptions
          </h3>
          <p className="text-xs text-neutral-500">
            Block specific exam dates or travel days from the booking calendar
          </p>
        </div>

        <DateExceptions
          blockedDates={blockedDates}
          onAddBlockedDate={addBlockedDate}
          onRemoveBlockedDate={removeBlockedDate}
        />
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <Button variant="primary" size="lg" fullWidth onClick={handleSave}>
          Save Availability Schedule
        </Button>
      </div>
    </div>
  );
}
