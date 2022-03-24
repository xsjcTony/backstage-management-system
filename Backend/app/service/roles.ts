/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import { Op } from 'sequelize'
import type { Role } from '../model/Role'
import type {
  AddRoleData,
  RoleQueryData
} from '../types'
import type { IFindOptions } from 'sequelize-typescript'


export default class RolesService extends Service {

  /**
   * Get roles by query info (REST API - GET)
   * @param {RoleQueryData} query
   * @return {Promise<{rows: Role[], count: number}>}
   */
  public async getRolesByQuery(query: RoleQueryData): Promise<{
    rows: Role[]
    count: number
  }> {
    let options: IFindOptions<Role> = {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }

    if (query.currentPageNumber && query.pageSize) {
      const currentPageNumber = parseInt(query.currentPageNumber) || 1
      const pageSize = parseInt(query.pageSize) || 5

      options = {
        ...options,
        limit: pageSize,
        offset: (currentPageNumber - 1) * pageSize
      }
    }

    return this.ctx.model.Role.findAndCountAll({
      ...options,
      where: {
        roleName: { [Op.substring]: query.keyword }
      }
    })
  }


  /**
   * Add role to database (REST API - POST)
   * @param {AddRoleData} data
   * @return {Promise<Role>}
   */
  public async createRole(data: AddRoleData): Promise<Role> {
    const { roleName, roleDescription } = data

    const r1 = await this._findRole({ roleName })
    if (r1) {
      throw new Error(`Role "${ roleName }" already exists`)
    }

    const r2 = await this._findRole({ roleDescription })
    if (r2) {
      throw new Error(`Role description must be unique`)
    }

    return this.ctx.model.Role.create(data)
  }


  /**
   * Delete role in database (REST API - DELETE)
   * @param {string} id
   * @return {Promise<Role>}
   */
  public async deleteRole(id: string): Promise<Role> {
    const role = await this.ctx.model.Role.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    if (role) {
      await role.destroy()
      return role
    } else {
      throw new Error('Role doesn\'t exist.')
    }
  }


  /**
   * Update user in database (REST API - PUT)
   */
  /*
  public async updateRole(id: string, data: EditRoleData): Promise<Role> {
    const user = await this.getUserById(id)

    if (data.password) {
      data.password = this.ctx.helper.encryptByMd5(data.password)
    }

    await user.update(data)

    const res = user.toJSON() as User
    delete res.updatedAt
    return res
  }
  */


  /**
   * Helper functions
   */


  /**
   * Look for **ONE** user from database based on given `WHERE` options.
   */
  private async _findRole(options: IFindOptions<Role>['where']): Promise<Role | null> {
    return this.ctx.model.Role.findOne({ where: options })
  }
}
