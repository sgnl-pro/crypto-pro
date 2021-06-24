import { TimestampServerType } from '../constants';
/**
 * Создает присоединенную подпись сообщения по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param message - подписываемое сообщение
 * @param [timestampOptions] - конфиг для сервера штампа времени
 * @returns подпись в формате PKCS#7
 */
export declare const createAttachedSignature: (thumbprint: string, unencryptedMessage: string | ArrayBuffer, timestampOptions?: TimestampServerType) => Promise<string>;
