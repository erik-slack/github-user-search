module.exports = {
  name: 'shared-state-users-state',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/state/users-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
