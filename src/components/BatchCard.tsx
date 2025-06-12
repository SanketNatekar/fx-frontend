
import React from 'react';
import { Clock, Users, Star, Calendar, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Batch } from '../types/batch';

interface BatchCardProps {
  batch: Batch;
  onEnroll?: (batchId: string) => void;
  onViewDetails?: (batchId: string) => void;
  showEnrollButton?: boolean;
}

const BatchCard: React.FC<BatchCardProps> = ({ 
  batch, 
  onEnroll, 
  onViewDetails, 
  showEnrollButton = true 
}) => {
  const progressPercentage = (batch.enrolledStudents / batch.maxStudents) * 100;
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover-lift cursor-pointer group">
      <div className="relative">
        <img
          src={batch.image}
          alt={batch.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <Badge className={getLevelColor(batch.level)}>
            {batch.level}
          </Badge>
          <Badge className={getStatusColor(batch.status)}>
            {batch.status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-lg font-bold text-gray-900">${batch.price}</span>
        </div>
      </div>

      <CardHeader className="pb-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{batch.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{batch.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{batch.instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{batch.duration}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Enrollment Progress</span>
            <span className="font-medium">{batch.enrolledStudents}/{batch.maxStudents}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Starts {new Date(batch.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span>Certificate</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex space-x-2">
        {onViewDetails && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(batch.id)}
          >
            View Details
          </Button>
        )}
        {showEnrollButton && onEnroll && (
          <Button
            className="flex-1"
            onClick={() => onEnroll(batch.id)}
            disabled={batch.enrolledStudents >= batch.maxStudents || batch.status === 'Completed'}
          >
            {batch.enrolledStudents >= batch.maxStudents ? 'Full' : 'Enroll Now'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BatchCard;
