import { TimestampServerType } from '../constants';
/**
 * Создает отсоединенную подпись хеша по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param messageHash - хеш подписываемого сообщения, сгенерированный по ГОСТ Р 34.11-2012 256 бит
 * @param [timestampOptions] - конфиг для сервера штампа времени
 * @returns подпись в формате PKCS#7
 */
export declare const createDetachedSignature: (thumbprint: string, messageHash: string, timestampOptions?: TimestampServerType) => Promise<string>;
