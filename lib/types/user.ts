export interface UserExtraData {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  otpCooldown: number;
  otpCooldownMinutes: number;
  user: User;
}

export interface User {
  id: string;
  agentCode?: string;
  name?: string;
  email?: string;
  agentGroup?: string;
  agentGroupName?: string;
  mobilPhoneNo?: string;
  agentStatus?: string;
  mdrtFlag?: number;
  agentType?: string;
  agentExternalId?: string;
  dob?: string;
  verified?: boolean;
}
