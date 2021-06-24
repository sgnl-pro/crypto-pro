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
export declare const getLicenseInfo: () => Promise<LicenseInfo>;
