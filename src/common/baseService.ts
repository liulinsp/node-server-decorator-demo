/**
 * Service 基类
 */
import { Connection } from 'mysql';

export default abstract class BaseService {
  static connection: Connection;
}