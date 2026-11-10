import { useState } from 'react';
import { Plus, Trash2, MapPin, Clock, School } from 'lucide-react';
import Button from '@/components/ui/Button';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const COURSE_PRESETS = [
  { code: 'CSC 301', title: 'Data Structures & Algorithms', location: 'Science LT 1' },
  { code: 'GST 102', title: 'Philosophy & Logic', location: 'Arts Hall 2' },
  { code: 'MAT 201', title: 'Linear Algebra', location: 'Science LT 2' },
  { code: 'CSC 309', title: 'Software Engineering Lab', location: 'CITS Lab 3' },
  { code: 'CHM 101', title: 'General Chemistry Tutorial', location: 'Chemistry Lab' },
];

export default function LectureBlocksManager({
  lectureBlocks = [],
  onAddBlock,
  onRemoveBlock,
}) {
  const [day, setDay] = useState('Monday');
  const [courseCode, setCourseCode] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('10:00');
  const [end, setEnd] = useState('12:00');
  const [location, setLocation] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleApplyPreset = (preset) => {
    setCourseCode(preset.code);
    setTitle(preset.title);
    setLocation(preset.location);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!courseCode.trim() || !start || !end) return;

    onAddBlock({
      day,
      courseCode: courseCode.trim(),
      title: title.trim() || 'Lecture / Tutorial',
      start,
      end,
      location: location.trim() || 'Campus Faculty',
    });

    setCourseCode('');
    setTitle('');
    setLocation('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-neutral-900 font-display flex items-center gap-1.5">
            <School className="w-4 h-4 text-purple-700" />
            <span>Weekly Lecture & Tutorial Blocks</span>
          </h4>
          <p className="text-[11px] text-neutral-500">
            Slots during these hours are automatically blocked so clients never book over classes
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          {showAddForm ? 'Close' : 'Add Class'}
        </Button>
      </div>

      {/* Add Lecture Block Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-950 font-display">
              Add New Academic Commitment
            </span>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1 text-[10px]">
              <span className="text-neutral-500 font-medium">UNILAG Presets:</span>
              {COURSE_PRESETS.slice(0, 3).map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2 py-0.5 rounded bg-white text-purple-900 font-bold border border-purple-200 hover:bg-purple-100 transition-colors"
                >
                  {p.code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div>
              <label htmlFor="lecture-day" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Day of Week
              </label>
              <select
                id="lecture-day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-semibold text-neutral-800 focus:outline-none focus:border-purple-800"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="course-code" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Course Code
              </label>
              <input
                id="course-code"
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CSC 301, GST 102"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white uppercase font-bold text-neutral-900 focus:outline-none focus:border-purple-800"
                required
              />
            </div>

            <div>
              <label htmlFor="lecture-title" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Course / Topic (Optional)
              </label>
              <input
                id="lecture-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Algorithms Lecture"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div>
              <label htmlFor="lecture-start" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Start Time
              </label>
              <input
                id="lecture-start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-semibold text-neutral-900 focus:outline-none focus:border-purple-800"
                required
              />
            </div>

            <div>
              <label htmlFor="lecture-end" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                End Time
              </label>
              <input
                id="lecture-end"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-semibold text-neutral-900 focus:outline-none focus:border-purple-800"
                required
              />
            </div>

            <div>
              <label htmlFor="lecture-location" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Hall / Faculty Location
              </label>
              <input
                id="lecture-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Science LT 1, CITS"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              Save Class Block
            </Button>
          </div>
        </form>
      )}

      {/* Grouped by Day Cards */}
      <div className="space-y-3">
        {DAYS_OF_WEEK.map((d) => {
          const blocksForDay = lectureBlocks.filter((lb) => lb.day === d);
          return (
            <div
              key={d}
              className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 font-display flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-700" />
                  {d}
                </span>
                <span className="text-[10px] text-neutral-400 font-semibold">
                  {blocksForDay.length === 0 ? 'No classes scheduled' : `${blocksForDay.length} class block${blocksForDay.length === 1 ? '' : 's'}`}
                </span>
              </div>

              {blocksForDay.length === 0 ? (
                <p className="text-[11px] text-neutral-400 italic">
                  Fully open for appointments during operating hours.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {blocksForDay.map((b) => (
                    <div
                      key={b.id}
                      className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 flex items-start justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-purple-900 font-display">
                            {b.courseCode}
                          </span>
                          <span className="text-[11px] text-neutral-500 truncate">
                            {b.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                          <span className="flex items-center gap-1 text-neutral-700 font-semibold">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {b.start} – {b.end}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 truncate max-w-[120px]">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            {b.location}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveBlock(b.id)}
                        className="p-1 rounded text-neutral-400 hover:text-rose-700 hover:bg-rose-50 transition-colors shrink-0"
                        title="Delete class block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
