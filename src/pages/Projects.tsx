import React, { useState } from 'react';
import { FolderKanban, MoreVertical, Plus } from 'lucide-react';
import { useProjectStore } from '../lib/store';
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FolderKanban className="h-8 w-8 text-indigo-600" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {project.name}
                  </h3>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-500">{project.description}</p>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div>Members: {project.members}</div>
                <div>Start: {new Date(project.startDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}