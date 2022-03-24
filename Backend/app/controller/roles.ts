/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import RoleRule from '../validator/roleRule'
import type { RoleQueryData } from '../types'


/**
 * controller
 */
export default class RolesController extends Controller {

  /**
   * Get roles by query info (REST API - GET)
   * @return {Promise<void>}
   */
  public async getRolesByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const roles = await ctx.service.roles.getRolesByQuery(ctx.query as unknown as RoleQueryData)
      ctx.success(200, 'success', roles)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * Add role to database (REST API - POST)
   * @return {Promise<void>}
   */
  public async createRole(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(RoleRule, data)

      // save into database
      const user = await ctx.service.roles.createRole(data)

      ctx.success(200, 'Role has been added', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * Delete role in database (REST API - DELETE)
   * @return {Promise<void>}
   */
  public async deleteRole(): Promise<void> {
    /*
    const { ctx } = this

    try {
      const user = await ctx.service.roles.deleteUser(ctx.params.id)
      ctx.success(200, 'User has been deleted', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
    */
  }


  /**
   * Update role in database (REST API - PUT)
   * @return {Promise<void>}
   */
  public async updateRole(): Promise<void> {
    /*
    const { ctx } = this
    const data = ctx.request.body

    try {
      if (!('userState' in data)) {
        // validate
        ctx.validate(EditUserRule, data)
      }

      // save into database
      const user = await ctx.service.roles.updateUser(ctx.params.id, data)

      ctx.success(200, 'User has been updated', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
    */
  }
}
