export const enum RegisterType {
  Normal = 'normal',
  Email = 'email'
}


// RegisterData
interface BaseRegisterData {
  password: string
  captcha: string
  registerType: RegisterType
}

interface NormalRegisterData extends BaseRegisterData {
  username: string
}

interface EmailRegisterData extends BaseRegisterData {
  email: string
}

export type RegisterData = EmailRegisterData | NormalRegisterData


// Email Verification
export interface EmailInfo {
  from: string
  to: string
  subject: string
  text: string
}
