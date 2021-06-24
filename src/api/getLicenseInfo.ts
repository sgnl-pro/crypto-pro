import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

enum licType {
  csp = 0,
  ocsp = 1,
  tsp = 2,
}

export interface LicenseData {
  validTo: string;
  serialNumber: string;
  firstInstall: string;
  licType: string;
  companyName: string;
}
export interface LicenseInfo {
  csp: LicenseData;
  ocsp: LicenseData;
  tsp: LicenseData;
}

/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о лицензиях установленного ПО
 */
export const getLicenseInfo = _afterPluginsLoaded(
  (): LicenseInfo => {
    const licInfo = {} as LicenseInfo;

    return eval(
      _generateCadesFn(function getLicenseInfo(): LicenseInfo {
        let cadesLicense;

        try {
          cadesLicense = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPLicense');

          licInfo.csp = {
            validTo: __cadesAsyncToken__ + cadesLicense.ValidTo(licType.csp),
            serialNumber: __cadesAsyncToken__ + cadesLicense.SerialNumber(licType.csp),
            firstInstall: __cadesAsyncToken__ + cadesLicense.FirstInstallDate(licType.csp),
            licType: __cadesAsyncToken__ + cadesLicense.Type(licType.csp),
            companyName: __cadesAsyncToken__ + cadesLicense.CompanyName(licType.csp),
          };

          const bindLicType = (type: licType): LicenseData => {
            return {
              validTo: __cadesAsyncToken__ + cadesLicense.ValidTo(type),
              serialNumber: __cadesAsyncToken__ + cadesLicense.SerialNumber(type),
              firstInstall: __cadesAsyncToken__ + cadesLicense.FirstInstallDate(type),
              licType: __cadesAsyncToken__ + cadesLicense.Type(type),
              companyName: __cadesAsyncToken__ + cadesLicense.CompanyName(type),
            };
          };
          licInfo.csp = bindLicType(licType.csp);
          licInfo.ocsp = bindLicType(licType.ocsp);
          licInfo.tsp = bindLicType(licType.tsp);

          // sysInfo.cadesVersion = __cadesAsyncToken__ + cadesLicense.PluginVersion;
          // sysInfo.cspVersion = __cadesAsyncToken__ + cadesLicense.CSPVersion();

          // if (!sysInfo.cadesVersion) {
          //   sysInfo.cadesVersion = __cadesAsyncToken__ + cadesLicense.Version;
          // }

          // sysInfo.cadesVersion = __cadesAsyncToken__ + sysInfo.cadesVersion.toString();
          // sysInfo.cspVersion = __cadesAsyncToken__ + sysInfo.cspVersion.toString();
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
        }

        return licInfo;
      }),
    );
  },
);
