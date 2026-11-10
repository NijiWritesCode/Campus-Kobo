import { useState } from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DataTable({
  columns,
  data = [],
  pageSize = 10,
  emptyMessage = 'No records found',
  emptySubtext = 'Try clearing your active filters or search terms.',
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden flex flex-col">
      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto min-w-0">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50/80 border-b border-neutral-200">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-display ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-neutral-500">
                  <div className="flex flex-col items-center justify-center space-y-2 max-w-sm mx-auto">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-neutral-800 font-display">
                      {emptyMessage}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {emptySubtext}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-neutral-50/70 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-3.5 text-neutral-800 ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      } ${col.cellClassName || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-3.5 border-t border-neutral-200 bg-neutral-50/50 flex items-center justify-between gap-3 text-xs text-neutral-500">
          <span>
            Showing <strong className="text-neutral-900">{startIndex + 1}</strong> to{' '}
            <strong className="text-neutral-900">
              {Math.min(startIndex + pageSize, data.length)}
            </strong>{' '}
            of <strong className="text-neutral-900">{data.length}</strong> entries
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Prev
            </Button>
            <span className="px-2 font-semibold text-neutral-700">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
