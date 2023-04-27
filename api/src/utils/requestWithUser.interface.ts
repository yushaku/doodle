import { UserEntity } from '@/databases/entities';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
