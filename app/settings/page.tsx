import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-2xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="mt-2 text-muted-foreground">
                Manage your account and preferences.
              </p>
            </div>

            {/* Account Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <p className="mt-1 text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Account Type
                  </label>
                  <p className="mt-1 text-sm text-muted-foreground">Premium</p>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              <div className="mt-6 space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
                  <span className="text-sm text-foreground">
                    Email me about large transactions
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
                  <span className="text-sm text-foreground">
                    Monthly financial summary
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                  <span className="text-sm text-foreground">
                    Budget alerts
                  </span>
                </label>
              </div>
            </Card>

            {/* Security Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground">Security</h2>
              <div className="mt-6 space-y-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  Change Password
                </Button>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Two-factor authentication is enabled
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
