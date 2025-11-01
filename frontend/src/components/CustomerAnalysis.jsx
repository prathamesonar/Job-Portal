import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { Briefcase, Users, DollarSign } from 'lucide-react';

// --- DUMMY DATA ---
const monthlyData = [
  { month: 'Jan', posts: 12, views: 2500, applications: 150 },
  { month: 'Feb', posts: 15, views: 3200, applications: 210 },
  { month: 'Mar', posts: 20, views: 4500, applications: 300 },
  { month: 'Apr', posts: 18, views: 4100, applications: 270 },
];

const categoryData = [
  { name: 'Full-Stack', value: 400 },
  { name: 'Frontend', value: 300 },
  { name: 'Backend', value: 300 },
  { name: 'DevOps', value: 200 },
];
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardStatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-5 rounded-xl shadow-lg bg-white dark:bg-gray-800 border-l-4 ${color} dark:border-opacity-70 flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</p>
    </div>
    <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
  </div>
);

const CustomerAnalysis = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2">
        Recruiter Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardStatCard title="Total Jobs Posted" value="65" icon={Briefcase} color="border-indigo-500" />
        <DashboardStatCard title="Total Applications" value="1,250" icon={Users} color="border-green-500" />
        <DashboardStatCard title="Avg. Views per Post" value="3,560" icon={DollarSign} color="border-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Job Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc5c5" className="dark:stroke-gray-600" />
              <XAxis dataKey="month" stroke="#6b7280" className="dark:text-gray-300" />
              <YAxis stroke="#6b7280" className="dark:text-gray-300" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card-dark)', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#6366f1', fontWeight: 'bold' }}
              />
              <Legend />
              <Bar dataKey="posts" fill="#6366f1" name="Job Posts" /> 
              <Bar dataKey="applications" fill="#10b981" name="Applications Received" /> 
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Application Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalysis;