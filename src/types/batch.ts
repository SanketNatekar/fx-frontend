
export interface Batch {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  image: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  enrolledStudents: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  features: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  batchId: string;
  enrollmentDate: string;
  status: 'Active' | 'Completed' | 'Cancelled';
}
