import { ConfigService } from '../config/config.service';
import { HttpClientService } from '../htpp-client.service';
import { SengridPayload } from './sendgrid-payload';
import { SendgridAuthService } from './sengrid-auth.service';

export class SengridService {
  private static _http = new HttpClientService(ConfigService.get('sendgrid.baseUrl'))

  public static async sendDynamicTemplate(targetEmail: string, templateId: string, dynamicTemplateData) {
    const config = {
      headers: {
      'Authorization': `Bearer ${ConfigService.get('sendgrid.apiKey')}`
      }
    };

    const payload: SengridPayload = {
      from: {
        email: ConfigService.get('sendgrid.fromEmail')
      },
      personalizations: [{
        to: [{
          email: targetEmail
        }],
        dynamic_template_data: dynamicTemplateData
      }],
      template_id: templateId
    };

    try {
      await this._http.post('/mail/send', payload, config).toPromise();
      return true;
    } catch(e) {
      return true;
    }
    // await this._http.post('/mail/send', payload, config).toPromise();
  }

  public static async sendGeneralSendgrid(payload: any) {
    const auth = new SendgridAuthService();
    auth.initByRequest();

    const res = auth.httpClient.post<any>('/mail/send',payload).toPromise();
    console.log(res)
    return res;
  }
}