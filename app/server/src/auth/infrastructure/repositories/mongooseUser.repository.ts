import { IUserRepository } from '../../domain/interfaces/userRepository.interface';
import { User } from '../../domain/entities/user.entity';
import UserModel from '../models/user.model';

export class MongooseUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const mongooseUser = await UserModel.findOne({ email });
        return mongooseUser
            ? new User(
                (mongooseUser._id as string).toString(),
                mongooseUser.username,
                mongooseUser.email,
                mongooseUser.password,
                mongooseUser.role
            )
            : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const mongooseUser = await UserModel.findOne({ username });
        return mongooseUser
            ? new User(
                (mongooseUser._id as string).toString(),
                mongooseUser.username,
                mongooseUser.email,
                mongooseUser.password,
                mongooseUser.role
            )
            : null;
    }

    async findById(id: string): Promise<User | null> {
        const mongooseUser = await UserModel.findById(id);
        return mongooseUser
            ? new User(
                mongooseUser.id.toString(),  
                mongooseUser.username,
                mongooseUser.email,
                mongooseUser.password,
                mongooseUser.role
            )
            : null;
    }

    async save(user: User): Promise<User> {
        const mongooseUser = new UserModel(user);
        await mongooseUser.save();
        return new User(
            (mongooseUser._id as string).toString(),
            mongooseUser.username,
            mongooseUser.email,
            mongooseUser.password,
            mongooseUser.role
        );
    }
}
