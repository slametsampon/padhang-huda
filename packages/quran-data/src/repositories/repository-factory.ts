// packages/quran-data/src/repositories/repository-factory.ts

import { isMockMode, isOnlineMode } from '../services/mode';

import { UserRepository } from './interfaces/UserRepository';
import { MockUserRepository } from './mock/MockUserRepository';
import { ApiUserRepository } from './api/ApiUserRepository';

import { AyatRepository } from './interfaces/AyatRepository';
import { MockAyatRepository } from './mock/MockAyatRepository';
import { ApiAyatRepository } from './api/ApiAyatRepository';

import { TafsirRepository } from './interfaces/TafsirRepository';
import { MockTafsirRepository } from './mock/MockTafsirRepository';
import { ApiTafsirRepository } from './api/ApiTafsirRepository';

import { SuratRepository } from './interfaces/SuratRepository';
import { MockSuratRepository } from './mock/MockSuratRepository';
import { ApiSuratRepository } from './api/ApiSuratRepository';

export function getUserRepository(): UserRepository {
  return isMockMode() ? new MockUserRepository() : new ApiUserRepository();
}

export function getAyatRepository(): AyatRepository {
  if (isMockMode()) return new MockAyatRepository();
  if (isOnlineMode()) return new ApiAyatRepository();
  return new MockAyatRepository(); // fallback
}

export function getTafsirRepository(): TafsirRepository {
  if (isMockMode()) return new MockTafsirRepository();
  if (isOnlineMode()) return new ApiTafsirRepository();
  return new MockTafsirRepository(); // fallback
}

export function getSuratRepository(): SuratRepository {
  return isMockMode() ? new MockSuratRepository() : new ApiSuratRepository();
}
