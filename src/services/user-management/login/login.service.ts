import { RepositoryService } from '../../../../libs/dh-db/src/service/repository/repository.service';

export class LoginService {
    public static async login(email: string) {
        const aggregate = [
            {
                $match: {
                    email,
                },
            },
            {
                $lookup: {
                    from: 'userRole',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'role',
                },
            },
            {
                $unwind: '$role',
            },
            {
                $lookup: {
                    from: 'userPermission',
                    localField: 'role.permissions',
                    foreignField: '_id',
                    as: 'role.permissions',
                },
            },
            {
                $group: {
                    _id: '$_id',
                    full_name: { $first: '$full_name' },
                    email: { $first: '$email' },
                    phone: { $first: '$phone' },
                    company_name: { $first: '$company_name' },
                    team: { $first: '$team' },
                    isVerified: { $first: '$isVerified' },
                    role: { $push: '$role' },
                },
            },
        ];

        const data = await RepositoryService.user.model.aggregate(aggregate);
        return data;
    }
}
