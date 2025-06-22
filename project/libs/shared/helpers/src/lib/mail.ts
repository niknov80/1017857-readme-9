import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'node:path';

export function getMailerAsyncOptions(optionSpace: string) {
  return {
    useFactory: async (configService: ConfigService): Promise<MailerOptions> => {
      const host = configService.get<string>(`${optionSpace}.host`);
      const port = configService.get<number>(`${optionSpace}.port`);
      const user = configService.get<string>(`${optionSpace}.user`);
      const pass = configService.get<string>(`${optionSpace}.password`);
      const from = configService.get<string>('mail.from');

      const baseTransport: MailerOptions['transport'] = {
        host,
        port,
        secure: false,
        logger: true,
        debug: true,
      };

      const transport = user && pass ? { ...baseTransport, auth: { user, pass } } : baseTransport;

      return {
        transport,
        defaults: {
          from,
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
    inject: [ConfigService],
  };
}
