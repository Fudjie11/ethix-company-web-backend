module.exports = {
  type: "production",
    cloudStorage: {
        aws: {
        cloudAccessKeyId: 'AKIAIITQMZCZBRO3SSMA',
        cloudSecretAccessKey: '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',
        cloudRegion: 'ap-southeast-1',
        cloudBucket: 'ethix-admin-app-dev'
        }
    },
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    GOOGLE_CLIENT_ID : "368467132357-f7g1qa9sh17mjp8t40smnkeaddmp3rel.apps.googleusercontent.com",
    GOOGLE_SECRET : "MiXldyZCuzivJ_Ippdg6VT8H",
    GOOGLE_CALLBACK : "/strategy/google/redirect"
};
