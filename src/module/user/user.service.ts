import {UserRole} from 'src/entities/userRole';
import {Role} from './../../entities/role';
import {Employee} from './../../entities/employee';
import {
    Injectable,
    BadRequestException,
    HttpStatus,
    HttpException,
    forwardRef,
    Inject,
    Catch,
} from '@nestjs/common';
import {CreateUserDto} from '../auth/dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repostories';
import {Connection} from 'typeorm';
import {ResponseSuccess} from '../../common/interfaces/response.interface';
import {User} from '../../entities/user';
import {EntityManager} from 'typeorm';
import {BaseService} from '../../common/base/service';
import {
    ErrorMessage,
    CodeName,
} from '../../common/constants/common.constants';
import {RepoBase} from '../../common/base';
import {RoleRopsitory} from "../role/role.repository";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(UserRepository)
        public readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRopsitory,
        private readonly connection: Connection,
    ) {
        super(userRepository);
    }

    async create(payload: Object) {
        let data = await this.userRepository.insertUser(payload);
        return data instanceof Error
            ? new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessage.USER_EXISTED,
                codeName: CodeName.USER_EXISTED,
            })
            : new ResponseSuccess({
                data,
            });
    }

    findAll() {
        console.log('find All');
    }

    async findByUserName(userName: string): Promise<any> {
    }

    getUserByUserName = async (username: string) => {
        return await this.userRepository.getUserByUserName(username);
    };

    getOneAccount(user: string, password: string) {
    }

    async checkUserExist(userName: string) {
        return await this.userRepository.checkUserExist(userName);
    }

    checkEmailExist = async (email: string) => {
        return await this.userRepository.checkEmailExist(email);
    };

    async createUser(data: Partial<CreateUserDto>, manager: EntityManager): Promise<User> {
        let ret;
        let {employee: employeeData, ...userData} = data;
        try {
            // ret = await this.connection.transaction(async (manager) => {
            let provider = {
                createdBy: data.userName,
                updatedBy: data.userName,
            };
            data = {
                ...userData,
                ...provider,
            };
            let user = new User({...userData});
            let employee = new Employee({...employeeData, ...provider});
            employee.user = user;
            user.employeeData = employee;

            await Promise.all([
                await manager.save(user),
                await manager.save(employee),
                await this.addRole(user, 5, manager),
            ]);
            user = await manager.getRepository(User).findOne({
                where: {
                    userName: data.userName,
                },
                relations: ['employeeData', 'employeeData.manager', 'roles'],
            });
            return user;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async insertUser(data, manager) {
        return await this.userRepository.insertUser(data, manager);
    }

    async getUser(
        userName: string,
        transactionEntityManager: EntityManager = null,
    ) {
        return await this.userRepository.getUserByUserName(
            userName,
            transactionEntityManager,
        );
    }

    async GetUserDetail() {
        return await this.userRepository.find({
            relations: ['employees', 'employeeData'],
        });
    }

    async addRole(
        user: User,
        roleId: number,
        transactionEntityManager: EntityManager = null,
    ): Promise<void> {
        let options = {
            where: {
                id: roleId,
            },
        }
        let role = transactionEntityManager ? await transactionEntityManager.getRepository(Role).findOne(options) : await this.roleRepository.findOne(options)
        if(!role)
            throw new BadRequestException("Invalid RoleId")
        let userRole = new UserRole({
            userId: user.id,
            roleId: role.id,
        });
        userRole = transactionEntityManager ? await transactionEntityManager.save(UserRole, userRole) : await userRole.save();
    }

    async getList(relations?: Array<string>) {
        return await this.userRepository.getList(relations);
    }
}
