import { useGlobalState } from './GlobalStateContext';
import { useNavigate } from 'react-router-dom';

export const useFetch = () => {

    const navigate = useNavigate();
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

                    // 401 에러의 경우 토큰이 올바르지 못하다고 판단하여 비움
                    // TODO : 여기 말고 로그인, 회원가입 페이지 접속 시 비우는게 나을지 고민
                    if(response.status === 401) {
                        console.log('401 에러의 경우 토큰이 올바르지 못하다고 판단하여 비움');
                        setAuthorization('');
                    }

                    try{
                        return response.json().then(error => {
                            throw {
                                ...error
                                , status:response.status
                            };
                        });
                    }catch(error){
                        console.log('리턴된 에러 포맷이 json 타입이 아닐 때');
                        console.log(error);

                        throw response.status;
                    }
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

                const showErrorMsg = () => {

                    alert(`${error.message ?? '서버에서 에러가 정의되지 않았습니다'} (${error.code ?? 'ERROR_CODE_NOT_DEFINED'})`);
                };

                if(error.status === 401) {
                    showErrorMsg();
                    console.log('개발 중 signin 페이지로 이동하는 것 잠시 주석 처리');
                    // navigate('/signin');
                }else if(onError) {
                    onError(error);
                }else {
                    showErrorMsg();
                }

                // throw error;
                /**
                 * 기본적으로 onError를 통해 에러를 제어할 수 있기 때문에
                 * 여기서 에러를 던지면 commonFetch에 항상 catch로 에러를
                 * 핸들링 해야하는 불필요한 로직이 추가된다.
                 * 해당 로직은 불필요하다고 판단했다.
                 */
            });
    };

    return commonFetch;
  };