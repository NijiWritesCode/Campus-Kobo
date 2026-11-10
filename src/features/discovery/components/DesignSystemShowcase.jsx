import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import StarRating from '@/components/ui/StarRating';
import Tabs from '@/components/ui/Tabs';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import PageHeader from '@/components/layout/PageHeader';
import { Check, ShoppingBag } from 'lucide-react';

export default function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [activeTab, setActiveTab] = useState('primitives');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Design System & UI Tooling Testbed"
        subtitle="Live verification of solid Emerald Green and Royal Purple color scheme, mobile-first shells, and campus primitives"
      />

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'primitives', label: '14 UI Primitives', badge: '14' },
          { id: 'navigation', label: 'Surface Shells & Routes', badge: 'Active' },
        ]}
      />

      {activeTab === 'primitives' && (
        <div className="space-y-8">
          {/* 1. Buttons */}
          <Card variant="elevated" padding="md" className="space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 font-display">1. Button Component Variants & Sizes</h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="primary" size="sm">Primary SM</Button>
              <Button variant="primary" size="md">Primary MD</Button>
              <Button variant="primary" size="lg">Primary LG</Button>
              <Button variant="secondary" size="md">Secondary (Trust)</Button>
              <Button variant="outline" size="md">Outline</Button>
              <Button variant="ghost" size="md">Ghost</Button>
              <Button variant="danger" size="md">Danger</Button>
              <Button variant="subtle" size="md">Subtle</Button>
              <Button variant="primary" size="md" loading>Loading</Button>
            </div>
          </Card>

          {/* 2. Form Inputs */}
          <Card variant="elevated" padding="md" className="space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 font-display">2. Inputs, Selects & Textarea</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Student Name"
                placeholder="Adaeze Okafor"
                required
                hint="Accessible with proper htmlFor label pairing"
              />
              <Input
                label="Password with Reveal"
                type="password"
                placeholder="Enter password"
                required
              />
              <Input
                label="Input with Error Feedback"
                defaultValue="invalid_matric"
                error="Matriculation number does not match format"
              />
              <Select
                label="University Campus"
                required
                options={[
                  { value: 'unilag', label: 'University of Lagos (UNILAG)' },
                  { value: 'ui', label: 'University of Ibadan (UI)' },
                ]}
              />
            </div>
            <Textarea
              label="Service Description or Delivery Instructions"
              placeholder="e.g. Come to Moremi Hall block B room 204..."
              rows={2}
            />
          </Card>

          {/* 3. Badges & Statuses */}
          <Card variant="elevated" padding="md" className="space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 font-display">3. Badge Component Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" dot>Primary Emerald</Badge>
              <Badge variant="secondary" dot>Secondary Purple</Badge>
              <Badge variant="success" dot>Confirmed</Badge>
              <Badge variant="warning" dot>Awaiting Provider</Badge>
              <Badge variant="error" dot>Declined / Dispute</Badge>
              <Badge variant="info" dot>In Progress</Badge>
              <Badge variant="neutral">Cancelled</Badge>
            </div>
          </Card>

          {/* 4. Avatars & Star Ratings */}
          <Card variant="elevated" padding="md" className="space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 font-display">4. Avatars & Interactive Star Ratings</h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Avatar size="sm" name="Adaeze Okafor" verified />
                <Avatar size="md" name="Tobi Adeleke" verified={false} />
                <Avatar size="lg" name="Campus Provider" verified />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-neutral-500 font-medium">Interactive Rating (tap a star):</div>
                <StarRating
                  value={rating}
                  onChange={setRating}
                  readonly={false}
                  size="lg"
                  showValue
                  reviewCount={42}
                />
              </div>
            </div>
          </Card>

          {/* 5. Native Modal (Modern Web Guidance Compliant) */}
          <Card variant="elevated" padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 font-display">5. Accessible Modal Dialog</h3>
                <p className="text-xs text-neutral-500">Native &lt;dialog&gt; element, backdrop blur, light-dismiss, scroll containment</p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
                Test Modal
              </Button>
            </div>

            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Campus Kobo Modal Verification"
              description="Implemented strictly following Modern Web Guidance for dialogs"
            >
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  This dialog utilizes the native HTML5 <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px]">&lt;dialog&gt;</code> element, opened via <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px]">showModal()</code>, with <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px]">closedby="any"</code> and fallback coordinate detection for backdrop light-dismiss.
                </p>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Esc key, backdrop click, or close button all dismiss properly.</span>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
                    Looks Great
                  </Button>
                </div>
              </div>
            </Modal>
          </Card>

          {/* 6. Empty State & Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" padding="md">
              <h3 className="font-bold text-sm text-neutral-900 font-display mb-3">6. Skeleton Placeholders</h3>
              <div className="space-y-2">
                <Skeleton variant="card" className="h-20" />
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-1/2" />
              </div>
            </Card>

            <EmptyState
              icon={<ShoppingBag className="w-6 h-6" />}
              title="No Bookings Yet"
              description="When you request hairstyling or grooming, your appointments will appear here."
              action={
                <Button variant="primary" size="sm">
                  Explore Services
                </Button>
              }
            />
          </div>
        </div>
      )}

      {activeTab === 'navigation' && (
        <Card variant="elevated" padding="lg" className="space-y-5">
          <h3 className="font-bold text-base text-neutral-900 font-display">Active Route Navigation</h3>
          <p className="text-xs text-neutral-600">
            Phase 2 establishes all layout shells, protected routes, and auth screens. You can jump directly to any screen to test its full functionality:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a href="/" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Welcome / Landing Page (/) &rarr;
            </a>
            <a href="/register" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Registration Form (/register) &rarr;
            </a>
            <a href="/login" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Login with Demo Pre-fills (/login) &rarr;
            </a>
            <a href="/verify-otp" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              6-Digit OTP Verification (/verify-otp) &rarr;
            </a>
            <a href="/app/verification" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Student ID Verification (/app/verification) &rarr;
            </a>
            <a href="/app" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Explore Campus Services (/app) &rarr;
            </a>
            <a href="/app/search" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Filter & Search (/app/search) &rarr;
            </a>
            <a href="/app/providers/beauty-by-ada" className="p-3.5 rounded-2xl border border-neutral-200 hover:border-primary-400 bg-neutral-50 hover:bg-white font-bold text-neutral-800 transition-all shadow-2xs">
              Provider Profile (/app/providers/beauty-by-ada) &rarr;
            </a>
          </div>
        </Card>
      )}
    </div>
  );
}
