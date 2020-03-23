import { Service } from 'egg';

export interface Account {
  username: string;
  password: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Master = 'master'
}

export default class UserService extends Service {
  /**
   * 检测用户是否存在
   * @param username
   */
  public async checkUsernameIsExist(username: string) {
    const isExist = await this.ctx.model.User.findOne({ where: { username } });
    return Boolean(isExist);
  }

  public async findOne(uId: string) {
    this.checkFindOnePermissions(uId);
    const userEntity = await this.ctx.model.User.findOne({ where: { id: uId } });
    return userEntity.toJSON();
  }

  public async findAll(page, limit) {
    this.checkFindAllPermissions();
    const queryOption = this.getFindAllQueryOption(page, limit);
    const userEntityList = await this.ctx.model.User.findAll(queryOption);
    return userEntityList.map(entity => entity.toJSON());
  }

  public async getUserTotalNumber() {
    const userList = await this.ctx.model.User.findAll();
    return userList.length;
  }

  private getFindAllQueryOption(page: number, limit: number) {
    const queryOption = {
      limit,
      offset: this.getQueryOffset(page, limit)
    };
    return queryOption;
  }

  private getQueryOffset(page: number, limit: number) {
    return Math.max(0, (page - 1) * limit);
  }

  private checkFindAllPermissions() {
    const { role } = this.ctx.service.jwt.getTokenInfo();
    if (this.isUserOfRole(role)) {
      this.throwNoPermissionError();
    }
  }

  private checkFindOnePermissions(findUId) {
    const { uId: currentUId, role } = this.ctx.service.jwt.getTokenInfo();
    if (this.isUserOfRole(role) && currentUId !== findUId) {
      this.throwNoPermissionError();
    }
  }

  private isUserOfRole(role) {
    return role === Role.User;
  }

  private throwNoPermissionError() {
    this.ctx.throw(401, '没有权限');
  }
}
