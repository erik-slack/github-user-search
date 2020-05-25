module.exports = {
  name: 'gh-user-search',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/gh-user-search',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
