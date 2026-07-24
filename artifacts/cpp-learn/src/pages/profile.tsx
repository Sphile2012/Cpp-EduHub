/**
 * uPhumeh - Profile Page
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Edit2, Save, X, Trophy, Flame, BookOpen, CheckCircle2, Settings, LogOut, Chrome, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAllLanguages, type LanguageId } from '@/config/languages';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const { user, updateProfile, logout, loginWithGoogle } = useAuth();
  const { languageConfig } = useLanguage();
  const languages = getAllLanguages();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSave = async () => {
    const success = await updateProfile({
      name: editName,
      bio: editBio,
    });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditBio(user.bio || '');
    setIsEditing(false);
  };

  const handleConnectGoogle = async () => {
    // In a real app, this would link the Google account to the existing user
    // For demo purposes, we'll just show a toast
    const success = await loginWithGoogle();
    if (success) {
      // User is now logged in with Google
    }
  };

  const stats = [
    { label: 'Level', value: user.stats.level, icon: Trophy, color: 'text-yellow-500' },
    { label: 'XP', value: user.stats.totalXp, icon: Trophy, color: 'text-purple-500' },
    { label: 'Streak', value: `${user.stats.streak} days`, icon: Flame, color: 'text-orange-500' },
    { label: 'Lessons', value: user.stats.completedLessons, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Quizzes', value: user.stats.passedQuizzes, icon: CheckCircle2, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-lg" />
        
        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex items-end -mt-12 mb-4">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="ml-4 mb-2 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {user.bio && !isEditing && (
                <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {languageConfig?.name || 'Programming'}
              </Badge>
              <Badge variant="secondary">
                Level {user.stats.level}
              </Badge>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-lg p-4 space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="edit-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Input
                  id="edit-bio"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-background border`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your progress and new content.
                  </p>
                </div>
                <Switch
                  checked={user.preferences.notifications}
                  onCheckedChange={async (checked) => {
                    await updateProfile({
                      preferences: { ...user.preferences, notifications: checked },
                    });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferred-language">Preferred Language</Label>
                <select
                  id="preferred-language"
                  value={user.preferredLanguage}
                  onChange={async (event) => {
                    await updateProfile({
                      preferredLanguage: event.target.value as LanguageId,
                    });
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {languages.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.displayName}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">
                  This updates the language shown across your learning experience.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Currently set to: {user.preferences.theme}
                  </p>
                </div>
                <div className="flex gap-2">
                  {(['light', 'dark', 'system'] as const).map((theme) => (
                    <Button
                      key={theme}
                      variant={user.preferences.theme === theme ? 'default' : 'outline'}
                      size="sm"
                      onClick={async () => {
                        await updateProfile({
                          preferences: { ...user.preferences, theme },
                        });
                      }}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Link your accounts for easier sign-in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Chrome className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email?.endsWith('@gmail.com') ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                {!user.email?.endsWith('@gmail.com') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleConnectGoogle}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
                {user.email?.endsWith('@gmail.com') && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    Connected
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm('Are you sure you want to log out?')) {
                    logout();
                  }
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>
                Badges and milestones you've earned on your learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.stats.completedLessons === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No achievements yet. Start learning to earn badges!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Placeholder achievements */}
                  <div className="p-4 border rounded-lg text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <p className="font-medium text-sm">First Lesson</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <p className="font-medium text-sm">3 Day Streak</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center opacity-50">
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium text-sm">10 Lessons</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center opacity-50">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium text-sm">Quiz Master</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}