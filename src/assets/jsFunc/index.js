export const calculateElapsedTime = (timeCreated) => {
    const created = new Date(timeCreated).getTime();
    let periods = {
        năm: 365 * 30 * 24 * 60 * 60 * 1000,
        tháng: 30 * 24 * 60 * 60 * 1000,
        tuần: 7 * 24 * 60 * 60 * 1000,
        ngày: 24 * 60 * 60 * 1000,
        giờ: 60 * 60 * 1000,
        phút: 60 * 1000,
    };
    let diff = Date.now() - created;

    for (const key in periods) {
        if (diff >= periods[key]) {
            let result = Math.floor(diff / periods[key]);
            return diff >= periods['tháng']
                ? `${new Date(timeCreated).getDate()} - ${new Date(timeCreated).getMonth() + 1} - ${new Date(
                      timeCreated,
                  ).getFullYear()}`
                : `${result} ${result === 1 ? key : key}`;
        }
    }

    return 'Vừa xong';
};

export const convertNumToThreeDigits = (num) => {
    if(num !== undefined){
        const numStr = num.toString().split('');
        for(let i = numStr.length - 3; i >= 0 ; i -= 3 ){
            numStr[i-1] && numStr.splice(i, 0 , ',');
        }
        return numStr.join('');
    }
}