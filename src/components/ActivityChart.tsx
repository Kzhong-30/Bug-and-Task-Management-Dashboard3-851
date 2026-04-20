import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTicketStore } from '../lib/store';
import { format, subDays } from 'date-fns';

export default function ActivityChart() {
  const tickets = useTicketStore((state) => state.tickets);

  // Calculate daily active tickets for the last 7 days
  const data = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const activeTickets = tickets.filter((ticket) => {
      const ticketDate = format(new Date(ticket.createdAt), 'yyyy-MM-dd');
      return ticketDate === dateStr;
    });

    return {
      date: format(date, 'MMM dd'),
      tickets: activeTickets.length,
    };
  }).reverse();

  return (
    <div className="h-64 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tickets"
            stroke="#4f46e5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}