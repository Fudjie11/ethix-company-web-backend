export class From {
  email: string;
}

export class To {
  email: string;
}

export class DynamicTemplateData {
  userName: string;
  urlActivated: string;
}

export class Personalization {
  to: To[];
  dynamic_template_data: DynamicTemplateData;
}

export class SengridPayload {
  from: From;
  personalizations: Personalization[];
  template_id: string;
}
