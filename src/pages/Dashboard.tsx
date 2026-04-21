import React from 'react';
import { BarChart3, Bug, CheckCircle2, Clock } from 'lucide-react';

const stats = [
  { name: 'Total Tickets', value: '148', icon: Bug, color: 'text-blue-600' },
  { name: 'Open Issues', value: '32', icon: Clock, color: 'text-yellow-600' },
  { name: 'Closed Tickets', value: '116', icon: CheckCircle2, color: 'text-green-600' },
  { name: 'Project Progress', value: '78%', icon: BarChart3, color: 'text-purple-600' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Bug className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    New bug reported in Project Alpha
                  </p>
                  <p className="text-sm text-gray-500">
                    Reported by John Doe • 2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Project Status</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Project {i}</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}