'use client'

import { useState } from 'react';
import { useTestCases } from '../hooks/useTestCases';
import { TestCaseTable } from './TestCaseTable';
import { PassFailChart } from './PassFailChart';
import { AddTestCase } from './AddTestCase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";

export function Dashboard() {
  const { testCases, loading, error, updateTestStatus } = useTestCases();
  const [devMode, setDevMode] = useState(false);

  const passCount = testCases.filter(tc => tc.status === 'Passed').length;
  const failCount = testCases.filter(tc => tc.status === 'Failed').length;

  const handleTestCaseAdded = () => {
    // Refresh test cases
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Test Case Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Switch
          id="dev-mode"
          checked={devMode}
          onCheckedChange={setDevMode}
        />
        <Label htmlFor="dev-mode">Dev Mode</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TestCaseTable testCases={testCases} updateTestStatus={updateTestStatus} devMode={devMode} />
        </div>
        <div className="space-y-6">
          <PassFailChart passCount={passCount} failCount={failCount} />
          {devMode && <AddTestCase onTestCaseAdded={handleTestCaseAdded} />}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

