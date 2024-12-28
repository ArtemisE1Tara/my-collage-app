import { TestCase, TestStatus } from '../types/testCase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TestCaseTableProps {
  testCases: TestCase[];
  updateTestStatus: (id: string, newStatus: TestStatus) => void;
  devMode: boolean;
}

export function TestCaseTable({ testCases, updateTestStatus, devMode }: TestCaseTableProps) {
  const [openProcedures, setOpenProcedures] = useState<string[]>([]);

  const toggleProcedure = (id: string) => {
    setOpenProcedures(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: TestStatus) => {
    switch (status) {
      case 'Passed': return 'bg-green-500';
      case 'Failed': return 'bg-red-500';
      case 'Pending': return 'bg-yellow-500';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Procedure</TableHead>
          {devMode && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {testCases.map((testCase) => (
          <TableRow key={testCase.id}>
            <TableCell>{testCase.name}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(testCase.status)}>
                {testCase.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Collapsible open={openProcedures.includes(testCase.id)}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => toggleProcedure(testCase.id)}>
                    {openProcedures.includes(testCase.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {openProcedures.includes(testCase.id) ? 'Hide' : 'Show'} Procedure
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <pre className="mt-2 whitespace-pre-wrap text-sm">{testCase.procedure}</pre>
                </CollapsibleContent>
              </Collapsible>
            </TableCell>
            {devMode && (
              <TableCell>
                <select
                  value={testCase.status}
                  onChange={(e) => updateTestStatus(testCase.id, e.target.value as TestStatus)}
                  className="border rounded p-1"
                >
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

