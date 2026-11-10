import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Clock,
  KeyRound,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { cn } from '@/lib/cn';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Booking Confirmed & Escrowed',
    message: 'Your payment for Small Waist-Length Knotless Braids with Beauty by Ada is safely held in escrow. Your release PIN is 482915.',
    timestamp: '10 mins ago',
    type: 'payment',
    isRead: false,
    link: '/app/bookings/bk-001',
    linkText: 'View Booking & PIN',
  },
  {
    id: 'notif-2',
    title: 'Service in Progress',
    message: 'Tunde Cuts has started your Low / Mid Taper Fade appointment at Jaja Hall Common Room.',
    timestamp: '45 mins ago',
    type: 'progress',
    isRead: false,
    link: '/app/bookings/bk-002',
    linkText: 'Track Status',
  },
  {
    id: 'notif-3',
    title: 'Appointment Request Accepted',
    message: 'Zainab Bello accepted your Medium Acrylic Extensions request for Friday at 11:00 AM. Please complete payment to confirm.',
    timestamp: '2 hours ago',
    type: 'accepted',
    isRead: true,
    link: '/app/checkout/bk-003',
    linkText: 'Pay to Confirm',
  },
  {
    id: 'notif-4',
    title: 'Payout Released & Service Completed',
    message: 'Your previous booking with Beauty by Ada was marked completed. Thank you for rating your student provider!',
    timestamp: '1 day ago',
    type: 'completed',
    isRead: true,
    link: '/app/bookings/bk-005',
    linkText: 'View Receipt',
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filterUnread, setFilterUnread] = useState(false);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const displayed = filterUnread
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'payment':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      case 'progress':
        return <Clock className="w-4 h-4 text-purple-700" />;
      case 'accepted':
        return <CheckCircle2 className="w-4 h-4 text-blue-700" />;
      case 'completed':
        return <KeyRound className="w-4 h-4 text-teal-700" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <PageHeader
          title="Notifications"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} unread update${unreadCount === 1 ? '' : 's'}`
              : 'All notifications caught up'
          }
          backTo="/app"
        />

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllRead}
            icon={<Check className="w-3.5 h-3.5" />}
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilterUnread(false)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
            !filterUnread
              ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
          )}
        >
          All ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterUnread(true)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
            filterUnread
              ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
          )}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* List */}
      {displayed.length === 0 ? (
        <div className="py-12">
          <EmptyState
            title="No notifications"
            description="You have no notifications in this category."
          />
        </div>
      ) : (
        <div className="space-y-2.5">
          {displayed.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={cn(
                'p-4 rounded-xl border transition-colors flex items-start gap-3 shadow-2xs cursor-pointer',
                notif.isRead
                  ? 'bg-white border-neutral-200 text-neutral-800'
                  : 'bg-emerald-50/50 border-emerald-200 text-neutral-900'
              )}
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                {getTypeIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold font-display text-neutral-900">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-neutral-400 shrink-0">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {notif.message}
                </p>

                {notif.link && (
                  <div className="pt-1">
                    <Link
                      to={notif.link}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-900 hover:text-purple-950"
                    >
                      <span>{notif.linkText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
