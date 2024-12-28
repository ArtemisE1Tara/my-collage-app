import { useState, useEffect, useCallback } from 'react';
import { TestCase, TestStatus } from '../types/testCase';
import { supabase } from '../lib/supabase';

export function useTestCases() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('test_cases')
        .select('*');

      if (error) throw error;

      setTestCases(data as TestCase[]);
    } catch (error) {
      setError('Failed to fetch test cases');
      console.error('Error fetching test cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTestStatus = useCallback(async (id: string, newStatus: TestStatus) => {
    try {
      const { error } = await supabase
        .from('test_cases')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setTestCases(prevCases =>
        prevCases.map(testCase =>
          testCase.id === id ? { ...testCase, status: newStatus } : testCase
        )
      );
    } catch (error) {
      console.error('Error updating test case status:', error);
      setError('Failed to update test case status');
    }
  }, []);

  return { testCases, loading, error, updateTestStatus };
}

