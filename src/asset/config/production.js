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
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY
};
