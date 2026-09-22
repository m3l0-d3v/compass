import {
  AssumeRoleWithWebIdentityCommand,
  STSClient,
} from "@aws-sdk/client-sts";
import { getVercelOidcToken } from "@vercel/functions/oidc";

type AssumeRoleProps = {
  roleArn: string;
  sessionName?: string;
  durationSeconds?: number;
};

export class STSService {
  async assumeRole({
    roleArn,
    sessionName = "compass-s3",
    durationSeconds = 3600,
  }: AssumeRoleProps) {
    const oidcToken = await getVercelOidcToken();

    if (!oidcToken) {
      throw new Error("Failed to get OIDC token from Vercel");
    }

    try {
      const sts = new STSClient({
        region: process.env.AWS_REGION,
      });
      const { Credentials: credentials } = await sts.send(
        new AssumeRoleWithWebIdentityCommand({
          RoleArn: roleArn,
          RoleSessionName: sessionName,
          DurationSeconds: durationSeconds,
          WebIdentityToken: oidcToken,
        }),
      );

      if (
        !credentials?.AccessKeyId ||
        !credentials.SecretAccessKey ||
        !credentials.SessionToken ||
        !credentials.Expiration
      ) {
        throw new Error("Failed to assume role: incomplete credentials");
      }

      return {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken,
        expiration: credentials.Expiration,
      };
    } catch (error) {
      console.error("Error assuming role:", error);
      throw new Error("Failed to assume role");
    }
  }
}

export const getStsCredentials = () => {
  const roleArn = process.env.AWS_ROLE_ARN;

  if (!roleArn) {
    return undefined;
  }

  const stsService = new STSService();

  return () =>
    stsService.assumeRole({
      roleArn,
    });
};
