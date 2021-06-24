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
    const getEmptyData = (): LicenseData => ({
      validTo: '',
      serialNumber: '',
      firstInstall: '',
      licType: '',
      companyName: '',
    });
    const info: LicenseInfo = {
      csp: getEmptyData(),
      ocsp: getEmptyData(),
      tsp: getEmptyData(),
    };

    return eval(
      _generateCadesFn(function getLicenseInfo(): LicenseInfo {
        try {
          const cLic = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPLicense');
          info.csp = {
            validTo: __cadesAsyncToken__ + cLic.ValidTo(licType.csp),
            serialNumber: __cadesAsyncToken__ + cLic.SerialNumber(licType.csp),
            firstInstall: __cadesAsyncToken__ + cLic.FirstInstallDate(licType.csp),
            licType: __cadesAsyncToken__ + cLic.Type(licType.csp),
            companyName: __cadesAsyncToken__ + cLic.CompanyName(licType.csp),
          };

          info.ocsp = {
            validTo: __cadesAsyncToken__ + cLic.ValidTo(licType.ocsp),
            serialNumber: __cadesAsyncToken__ + cLic.SerialNumber(licType.ocsp),
            firstInstall: __cadesAsyncToken__ + cLic.FirstInstallDate(licType.ocsp),
            licType: __cadesAsyncToken__ + cLic.Type(licType.ocsp),
            companyName: __cadesAsyncToken__ + cLic.CompanyName(licType.ocsp),
          };

          info.tsp = {
            validTo: __cadesAsyncToken__ + cLic.ValidTo(licType.tsp),
            serialNumber: __cadesAsyncToken__ + cLic.SerialNumber(licType.tsp),
            firstInstall: __cadesAsyncToken__ + cLic.FirstInstallDate(licType.tsp),
            licType: __cadesAsyncToken__ + cLic.Type(licType.tsp),
            companyName: __cadesAsyncToken__ + cLic.CompanyName(licType.tsp),
          };
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о лицензиях');
        }

        return info;
      }),
    );
  },
);
