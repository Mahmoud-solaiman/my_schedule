import { useEffect, useState } from 'react';
import './Dashboard.scss';
import { DashboardSkeleton } from '../../../components/skeletons/DashboardSkeleton';
import { Stats } from './Stats';
import { api } from '../../../api/api';
import type { totalEmployeesResponse } from '../../../types/types';

export function Dashboard() {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ targetEmployees, setTargetEmployees ] = useState<number>(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      const response = await api.get<totalEmployeesResponse>('/api/allEmployees');
      setTargetEmployees(response.data.totalEmployees);
      setIsLoading(false);
    } 

    fetchEmployees();
  }, []);

  return (
    <section className="admin-dashboard-container skeleton">
      {

        isLoading 
        ? <DashboardSkeleton />
        : <Stats targetEmployees={targetEmployees}/>

      }
    </section>
  );
};