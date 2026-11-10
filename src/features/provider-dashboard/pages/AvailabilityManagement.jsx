import { useState } from 'react';
import { School, Clock, GraduationCap, Calendar, Footprints } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import WeeklySchedule from '../components/WeeklySchedule';
import LectureBlocksManager from '../components/LectureBlocksManager';
import ExamFreezeManager from '../components/ExamFreezeManager';
import DateExceptions from '../components/DateExceptions';
import AvailabilitySimulator from '../components/AvailabilitySimulator';
import { useProviderAvailability } from '../hooks/useProviderAvailability';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'lectures', label: 'Course Lectures & Tutorials', icon: School },
  { id: 'hours', label: 'General Hours & Commute', icon: Clock },
  { id: 'exams', label: 'Exam Freeze Mode', icon: GraduationCap },
  { id: 'blocked', label: 'Blocked Dates', icon: Calendar },
];

const BUFFER_OPTIONS = [0, 15, 30, 45, 60];
const COMMUTE_OPTIONS = [10, 15, 20, 30];

export default function AvailabilityManagement() {
  const [activeTab, setActiveTab] = useState('lectures');

  const {
    weeklySchedule,
    lectureBlocks,
    blockedDates,
    examFreeze,
    bufferMinutes,
    commuteBufferMinutes,
    toggleDay,
    updateDayHours,
    addLectureBlock,
    removeLectureBlock,
    addBlockedDate,
    removeBlockedDate,
    updateExamFreeze,
    setBufferMinutes,
    setCommuteBufferMinutes,
    computeAvailableSlots,
  } = useProviderAvailability();

  const handleSave = () => {
    toast.success('Academic timetable & availability settings saved!');
  };

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title="Lecture Timetable & Availability"
        subtitle="Ensure student appointments never clash with your UNILAG lectures"
        backTo="/provider"
      />

      {/* Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-neutral-200 overflow-x-auto shadow-2xs">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={cn(
                'flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all focus:outline-none shrink-0',
                isSelected
                  ? 'bg-purple-800 text-white font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Lectures & Tutorial Blocks */}
      {activeTab === 'lectures' && (
        <div className="space-y-4">
          <LectureBlocksManager
            lectureBlocks={lectureBlocks}
            onAddBlock={addLectureBlock}
            onRemoveBlock={removeLectureBlock}
          />
        </div>
      )}

      {/* Tab 2: General Hours & Commute Buffer */}
      {activeTab === 'hours' && (
        <div className="space-y-4">
          {/* Walking Commute Buffer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200 shrink-0 mt-0.5">
                <Footprints className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 font-display">
                  Campus Walking Buffer (Class $\rightarrow$ Hostel Room)
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Minutes added before and after lectures so you can walk from faculty back to your hostel room.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {COMMUTE_OPTIONS.map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setCommuteBufferMinutes(mins)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    commuteBufferMinutes === mins
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs font-bold'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {mins} mins walking buffer
                </button>
              ))}
            </div>
          </div>

          {/* Buffer Time Between Appointments */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display">
                Rest & Prep Buffer Between Appointments
              </h3>
              <p className="text-xs text-neutral-500">
                Cleanup, tool sterilization, and break time between student clients
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

          {/* Weekly Operating Boundaries */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display">
                General Daily Working Boundaries
              </h3>
              <p className="text-xs text-neutral-500">
                The earliest you start and latest you finish taking campus bookings
              </p>
            </div>

            <WeeklySchedule
              schedule={weeklySchedule}
              onToggleDay={toggleDay}
              onUpdateHours={updateDayHours}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Exam Freeze */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <ExamFreezeManager
            examFreeze={examFreeze}
            onUpdateExamFreeze={updateExamFreeze}
          />
        </div>
      )}

      {/* Tab 4: Blocked Dates */}
      {activeTab === 'blocked' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 font-display">
              Specific Date Exceptions
            </h3>
            <p className="text-xs text-neutral-500">
              Block individual dates for departmental trips, matriculation, or personal study
            </p>
          </div>

          <DateExceptions
            blockedDates={blockedDates}
            onAddBlockedDate={addBlockedDate}
            onRemoveBlockedDate={removeBlockedDate}
          />
        </div>
      )}

      {/* Real-time Simulator: Always visible below or accessible */}
      <AvailabilitySimulator
        computeAvailableSlots={computeAvailableSlots}
        weeklySchedule={weeklySchedule}
      />

      {/* Save Button */}
      <div className="pt-2">
        <Button variant="primary" size="lg" fullWidth onClick={handleSave}>
          Save All Timetable Changes
        </Button>
      </div>
    </div>
  );
}
