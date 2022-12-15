import { AxiosError } from 'axios';
import { capital } from 'case';

type ErrorData = null | AxiosError | Error | string;

export const getErrorMessage = (
	errorData: ErrorData,
	actionType?: string,
	meta?: string
) => {
	if (actionType && errorMessageDictionary.hasOwnProperty(actionType))
		return errorMessageDictionary[actionType];
	if (typeof errorData === 'string') return errorData;
	if (errorData)
		return (errorData as AxiosError).isAxiosError
			? (errorData as AxiosError).response?.data
			: (errorData as Error).message;
	return errorData;
};

export const getMetaInfo = (meta?: Record<string, string>) => {
	if (!meta) return;
	const metaInfo = Object.keys(meta)
		.map((el) => `${capital(el)}: ${meta[el]}`)
		.join(', ');
	return ` - ${metaInfo}`;
};

const errorMessageDictionary: Record<string, string> = {
    // TODO: add something,
};