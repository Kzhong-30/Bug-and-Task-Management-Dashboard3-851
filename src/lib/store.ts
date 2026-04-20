import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}

interface TimeLog {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  duration: number;
}

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: string;
  assigneeId: string;
  createdAt: string;
  dueDate: string;
  timeLogs: TimeLog[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  members: number;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  deleteNotification: (id: string) => void;
}

interface TicketState {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'timeLogs'>) => void;
  updateTicket: (id: string, ticket: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  startTimeTracking: (ticketId: string, userId: string) => void;
  stopTimeTracking: (ticketId: string, userId: string) => void;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'progress' | 'members'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

interface UserState {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        // Mock login - in a real app, this would make an API call
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          role: 'Admin',
          phone: '+1234567890',
          preferences: {
            theme: 'light',
            emailNotifications: true,
            pushNotifications: true,
          },
        };
        set({ user: mockUser });
      },
      logout: () => set({ user: null }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      updatePreferences: (preferences) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                preferences: { ...state.user.preferences, ...preferences },
              }
            : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearNotifications: () => set({ notifications: [] }),
      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'notification-storage',
    }
  )
);

export const useTicketStore = create<TicketState>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) => {
        const newTicket: Ticket = {
          ...ticket,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          timeLogs: [],
        };
        set((state) => ({ tickets: [...state.tickets, newTicket] }));
      },
      updateTicket: (id, updatedTicket) => {
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === id ? { ...ticket, ...updatedTicket } : ticket
          ),
        }));
      },
      deleteTicket: (id) => {
        set((state) => ({
          tickets: state.tickets.filter((ticket) => ticket.id !== id),
        }));
      },
      startTimeTracking: (ticketId, userId) => {
        const timeLog: TimeLog = {
          id: crypto.randomUUID(),
          userId,
          startTime: new Date().toISOString(),
          endTime: '',
          duration: 0,
        };
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId
              ? { ...ticket, timeLogs: [...ticket.timeLogs, timeLog] }
              : ticket
          ),
        }));
      },
      stopTimeTracking: (ticketId, userId) => {
        set((state) => ({
          tickets: state.tickets.map((ticket) => {
            if (ticket.id !== ticketId) return ticket;
            const timeLogs = ticket.timeLogs.map((log) => {
              if (log.userId === userId && !log.endTime) {
                const endTime = new Date().toISOString();
                const duration = Math.floor(
                  (new Date(endTime).getTime() - new Date(log.startTime).getTime()) / 1000
                );
                return { ...log, endTime, duration };
              }
              return log;
            });
            return { ...ticket, timeLogs };
          }),
        }));
      },
    }),
    {
      name: 'ticket-storage',
    }
  )
);

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: crypto.randomUUID(),
          progress: 0,
          members: 0,
        };
        set((state) => ({ projects: [...state.projects, newProject] }));
      },
      updateProject: (id, updatedProject) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        }));
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },
    }),
    {
      name: 'project-storage',
    }
  )
);

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => {
        const newUser: User = {
          ...user,
          id: crypto.randomUUID(),
        };
        set((state) => ({ users: [...state.users, newUser] }));
      },
      updateUser: (id, updatedUser) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          ),
        }));
      },
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);