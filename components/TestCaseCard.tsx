'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Types
type TestStatus = 'Passed' | 'Failed' | 'In Progress';

interface TestCase {
  id: string;
  name: string;
  status: TestStatus;
  procedure: string[];
}

// Mock Data
const mockTestCases: TestCase[] = [
  {
    id: '1',
    name: 'Login Functionality',
    status: 'Passed',
    procedure: [
      'Navigate to login page',
      'Enter valid credentials',
      'Click submit button',
      'Verify successful login'
    ]
  },
  {
    id: '2',
    name: 'Password Reset',
    status: 'Failed',
    procedure: [
      'Click "Forgot Password" link',
      'Enter registered email',
      'Check for reset email',
      'Follow reset link',
      'Set new password'
    ]
  },
  {
    id: '3',
    name: 'User Registration',
    status: 'In Progress',
    procedure: [
      'Navigate to registration page',
      'Fill in required fields',
      'Submit form',
      'Verify email confirmation',
      'Activate account'
    ]
  }
];

// StatusToggle Component
interface StatusToggleProps {
  initialStatus: TestStatus;
  onStatusChange: (newStatus: TestStatus) => void;
}

function StatusToggle({ initialStatus, onStatusChange }: StatusToggleProps) {
  const [status, setStatus] = useState<TestStatus>(initialStatus);

  const handleToggle = () => {
    const newStatus = status === 'Passed' ? 'Failed' : status === 'Failed' ? 'In Progress' : 'Passed';
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch id="status-toggle" checked={status !== 'Failed'} onCheckedChange={handleToggle} />
      <Label htmlFor="status-toggle">Status: {status}</Label>
    </div>
  );
}

// TestCaseCard Component
interface TestCaseCardProps {
  testCase: TestCase;
  onStatusChange: (id: string, newStatus: TestCase['status']) => void;
}

function TestCaseCard({ testCase, onStatusChange }: TestCaseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{testCase.name}</span>
          <Badge variant={testCase.status === 'Passed' ? 'default' : testCase.status === 'Failed' ? 'destructive' : 'secondary'}>
            {testCase.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Test Procedure:</h4>
        <ol className="list-decimal list-inside">
          {testCase.procedure.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className="mt-4">
          <StatusToggle 
            initialStatus={testCase.status} 
            onStatusChange={(newStatus) => onStatusChange(testCase.id, newStatus)} 
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [testCases, setTestCases] = useState<TestCase[]>(mockTestCases);

  const handleStatusChange = (id: string, newStatus: TestCase['status']) => {
    setTestCases(prevTestCases =>
      prevTestCases.map(testCase =>
        testCase.id === id ? { ...testCase, status: newStatus } : testCase
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Case Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testCases.map(testCase => (
          <TestCaseCard 
            key={testCase.id} 
            testCase={testCase} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

