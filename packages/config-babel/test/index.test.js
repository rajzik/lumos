import { create } from 'babel-test';
import { toMatchFile } from 'jest-file-snapshot';
import path from 'path';

expect.extend({ toMatchFile });

const { fixtures } = create({ configFile: true });

fixtures('babel-config', path.join(__dirname, 'fixtures'));
