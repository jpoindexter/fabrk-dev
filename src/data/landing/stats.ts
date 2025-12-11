/**
 * Stats Data - Trust indicators for Stats Section
 */

import { Users, Box, Clock, Star } from 'lucide-react';

export const STATS = [
  {
    id: 'users',
    label: 'ACTIVE USERS',
    value: '500+',
    icon: Users,
  },
  {
    id: 'components',
    label: 'COMPONENTS',
    value: '234',
    icon: Box,
  },
  {
    id: 'time-saved',
    label: 'HOURS SAVED',
    value: '100+',
    icon: Clock,
  },
  {
    id: 'satisfaction',
    label: 'SATISFACTION',
    value: '98%',
    icon: Star,
  },
] as const;
