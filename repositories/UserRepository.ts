import prisma from "./prisma";
interface RegistrationUser {
  username: string;
  usernameLower: string;
  password: string;
  email: string;
}
class UserRepository {
  static async createUser(user: RegistrationUser) {
    return prisma.user.create({
      data: user,
      select: {
        id: true,
      },
    });
  }
  static async findUserByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        usernameLower: {
          equals: username.toLowerCase(),
        },
      }
    });
  }
}

export default UserRepository;
