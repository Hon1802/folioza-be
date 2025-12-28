import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetService } from '../src/external/services/google-sheet.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import globalConfig from '../src/common/configs/app.config';
import { Event4LonToGoogleSheet } from 'src/external/interfaces/user-sent-to-ggsheet.interface';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

describe('Test Google Sheet', () => {
  let module: TestingModule;
  let googleSheetService: GoogleSheetService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [globalConfig],
          cache: true,
        }),
      ],
      providers: [GoogleSheetService, ConfigService],
    }).compile();

    googleSheetService = module.get<GoogleSheetService>(GoogleSheetService);
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  test('googleSheetService should be defined', () => {
    expect(googleSheetService).toBeDefined();
  });

  test('VitaDairy send user data to google sheet', async () => {
    const spreadSheetId = '1nfi7vPoMSb9-1bcZSpicLZjWQei0Bl05CRT4F2QUR6E';

    const userInfo: Event4LonToGoogleSheet = {
      code: `VITA${faker.string.fromCharacters(
        'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890',
        { min: 8, max: 8 },
      )}`,
      createdDate: dayjs(new Date()).format('DD-MM-YYYY'),
      hospital: faker.company.name(),
      usedDate: '90',
      expiredDate: dayjs(
        new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000),
      ).format('DD-MM-YYYY'),
      space: '',
      fullName: faker.person.firstName(),
      phoneNumber: `0${faker.number.int({ min: 111111111, max: 999999999 })}`,
    };

    await googleSheetService.writeData(userInfo, spreadSheetId);
  });
});
