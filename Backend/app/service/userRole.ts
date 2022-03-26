/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import type { UserRole } from '../model/UserRole'
import type { ModifyUserRoleData } from '../types'
import type { InstanceDestroyOptions } from 'sequelize'
import type { ICreateOptions, IFindOptions } from 'sequelize-typescript'


export default class UserRoleService extends Service {

  /**
   * Add userRole to database (REST API - POST)
   * @param {AddUserRoleData} data
   * @param {ICreateOptions} options
   * @return {Promise<UserRole>}
   */
  public async createUserRole(data: ModifyUserRoleData, options: ICreateOptions): Promise<UserRole> {
    const { userId, roleId } = data

    const userRole = await this._findUserRole({ userId, roleId })
    if (userRole) {
      throw new Error(`Role (ID: ${ roleId }) has already been assigned to user (ID: ${ userId })`)
    }

    return this.ctx.model.UserRole.create(data, options)
  }


  public async deleteUserRole(data: ModifyUserRoleData, options: InstanceDestroyOptions): Promise<UserRole> {
    const { userId, roleId } = data

    const userRole = await this._findUserRole({ userId, roleId })
    if (!userRole) {
      throw new Error(`Role (ID: ${ roleId }) isn't assigned to user (ID: ${ userId })`)
    }

    await userRole.destroy(options)
    return userRole
  }


  /**
   * Delete role in database (REST API - DELETE)
   * @param {string} id
   * @return {Promise<Role>}
   */
  /*
  public async deleteRole(id: string): Promise<Role> {
    const role = await this._getRoleById(id)

    await role.destroy()
    return role
  }
  */


  /**
   * Update user in database (REST API - PUT)
   */
  /*
  public async updateRole(id: string, data: ModifyRoleData): Promise<Role> {
    const role = await this._getRoleById(id)

    await role.update(data)

    const res = role.toJSON() as Role
    delete res.updatedAt
    return res
  }
  */


  /**
   * Helper functions
   */

  /**
   * Look for **ALL** userRoles from database based on given `WHERE` options
   * @param {IFindOptions<UserRole>["where"]} where
   * @return {Promise<UserRole[]>}
   */
  public async findUserRoles(where: IFindOptions<UserRole>['where']): Promise<UserRole[]> {
    return this.ctx.model.UserRole.findAll({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  }


  /**
   * Look for **ONE** userRole from database based on given `WHERE` options
   * @param {IFindOptions<UserRole>["where"]} where
   * @return {Promise<UserRole|null>}
   * @private
   */
  private async _findUserRole(where: IFindOptions<UserRole>['where']): Promise<UserRole | null> {
    return this.ctx.model.UserRole.findOne({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  }
}
