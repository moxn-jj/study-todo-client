// 한시간 전 시간을 가져온다.
export const getOneHourAgo = () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    return oneHourAgo;
};