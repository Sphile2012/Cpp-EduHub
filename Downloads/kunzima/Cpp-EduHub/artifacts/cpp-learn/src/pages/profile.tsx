import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300">
          <h1 className="text-2xl font-semibold text-white">Authentication required</h1>
          <p className="mt-3 text-sm text-slate-400">Please sign in to view your profile.</p>
          <Link href="/login" className="mt-6 inline-flex text-blue-400 hover:underline">Go to login</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    const result = await updateProfile({ name, bio });
    setMessage(result.success ? 'Profile updated successfully.' : result.error || 'Failed to update profile');
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Profile</h1>
            <p className="mt-2 text-sm text-slate-400">Keep your learning profile up to date.</p>
          </div>
          <Button variant="outline" onClick={() => logout()} className="border-slate-700 text-white hover:bg-slate-800">Log out</Button>
        </div>

        {message ? <div className={`mt-6 rounded-lg border p-3 text-sm ${message.includes('successfully') ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300' : 'border-red-800 bg-red-950/40 text-red-300'}`}>{message}</div> : null}

        <div className="mt-8 space-y-4">
          <div>
            <Label className="mb-2 block text-white">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-950 text-white" />
          </div>
          <div>
            <Label className="mb-2 block text-white">Username</Label>
            <Input value={user.username} disabled className="bg-slate-950 text-slate-400" />
          </div>
          <div>
            <Label className="mb-2 block text-white">Email</Label>
            <Input value={user.email} disabled className="bg-slate-950 text-slate-400" />
          </div>
          <div>
            <Label className="mb-2 block text-white">Bio</Label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="min-h-28 bg-slate-950 text-white" placeholder="Tell others a bit about your learning goals." />
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            {isSaving ? 'Saving...' : 'Save profile'}
          </Button>
        </div>
      </div>
    </div>
  );
}
