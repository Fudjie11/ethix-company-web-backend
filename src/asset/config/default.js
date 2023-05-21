module.exports = {
    type: "default",
    cloudStorage: {
        aws: {
        cloudAccessKeyId: 'AKIAIITQMZCZBRO3SSMA',
        cloudSecretAccessKey: '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',
        cloudRegion: 'ap-southeast-1',
        cloudBucket: 'ethix-admin-app-dev'
        }
    },
    jwtPrivateKey: 'jwtPrivateKey',
    midtrans: {
        isProduction: true,
        serverKey: 'Mid-server-aEbKnPIVO65fsqRig79hvYSr',
        clientKey: 'Mid-client-Ib0MBhuJXfuskaHm'
    },
    sendgrid: {
      apiKey: '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',
      templateEmailSuccessDonation: 'd-b6bec6d3533e4fbab909d9e625f60fe0',
      templateEmailForgotPassword: 'd-b6bec6d3533e4fbab909d9e625f60fe0',
      fromEmail: 'noreply@ethix.org',
      baseUrl: 'https://api.sendgrid.com/v3',
      redirectUrl: 'https://ethix.org',
    },
    GOOGLE_CLIENT_ID : "368467132357-f7g1qa9sh17mjp8t40smnkeaddmp3rel.apps.googleusercontent.com",
    GOOGLE_SECRET : "MiXldyZCuzivJ_Ippdg6VT8H",
    GOOGLE_CALLBACK : "/strategy/google/redirect",
    FACEBOOK_ID : "408529556902270",
    FACEBOOK_SECRET : "c0a64da24d2b5b24588f663d556e2a01",
    FACEBOOK_CALLBACK : "https://staging-rib.herokuapp.com/facebook/redirect",
    duitku: {
        isProduction: false,
        merchantCode: 'D5523',
        apiKey: '03b7ff0100deb448e54b586bc9d7b328',
        baseUrl: 'https://passport.duitku.com',
    },
    APP_URL : ""
};
