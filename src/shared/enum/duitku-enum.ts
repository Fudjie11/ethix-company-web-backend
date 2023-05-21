export enum DuitkuResponseEnum {
    success = '00',
    failed = '01',
}

export enum DuitkuWebhookResponseEnum {
    success = '00',
    pending = '01',
    cancel = '02', // or failed
}
