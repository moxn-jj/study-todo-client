import { useGlobalState } from './GlobalStateContext';

export const useFetch = () => {

    const { getAuthorization, setAuthorization } = useGlobalState();
    
    const commonFetch = (url, options = {}, onSuccess, onError) => {

        console.log('▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ commonFetch 실행 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼');

        // 공통 옵션 설정
        options.headers = {
            ...(options.headers || {}),
            'Content-Type':'application/json',
            authorization: getAuthorization()
        };
        console.log(options);

        // fetch로 서버에 요청하고 해당 promise를 반환
        return fetch(url, options)
            .then((response) => {
                if(response.ok) {

                    // accessToken이 갱신되었을 경우
                    const newAccessToken = response.headers.get('Authorization');
                    if(newAccessToken) {
                        console.log('새 accessToken이 발급 되었습니다.');
                        setAuthorization(newAccessToken);
                    }

                    return response.json();
                }else {
                    return response.json().then(error => {
                        throw error;
                    });
                }
            })
            .then((data) => {
                console.log('1. commonFetch 정의부 : success');

                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch((error) => {
                console.log('1. commonFetch 정의부 : error');
                console.log(error);

                if(onError) {
                    onError(error);
                }else {
                    alert(`${error.errorMessage ?? '서버에서 에러가 정의되지 않았습니다'} (${error.errorCode ?? 'ERROR_CODE_NOT_DEFINED'})`);
                }

                throw error;
            });
    };

    return commonFetch;
  };